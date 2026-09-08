import { motion } from 'framer-motion';
import { Play, Flame, Trophy, Zap, ListChecks, Shield } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { getStreak, getTotalWorkouts, getTodayCalories } from '@/lib/store';
import { gymWorkouts } from '@/lib/workouts';
import { useI18n } from '@/lib/i18n';
import titanMark from '@/assets/titan-mark.png';

interface HomeScreenProps {
  profile: UserProfile;
  onStartWorkout: (workoutId: string) => void;
}

const RANKS = [
  { key: 'rank.recruit', min: 0 },
  { key: 'rank.warrior', min: 500 },
  { key: 'rank.elite', min: 1500 },
  { key: 'rank.spartan', min: 3500 },
  { key: 'rank.legendary', min: 7000 },
];

export default function HomeScreen({ profile, onStartWorkout }: HomeScreenProps) {
  const { t } = useI18n();
  const streak = getStreak();
  const totalWorkouts = getTotalWorkouts();
  const todayCalories = getTodayCalories();
  const todayWorkout = gymWorkouts[new Date().getDay() % gymWorkouts.length];

  const points = totalWorkouts * 100 + streak * 20;
  const rankIdx = Math.max(0, RANKS.findIndex((r, i) => points < (RANKS[i + 1]?.min ?? Infinity)));
  const rank = RANKS[rankIdx];
  const nextMin = RANKS[rankIdx + 1]?.min;
  const rankPct = nextMin ? Math.min(100, ((points - rank.min) / (nextMin - rank.min)) * 100) : 100;

  const weekTarget = 5;
  const weekDone = Math.min(weekTarget, streak);
  const weekPct = (weekDone / weekTarget) * 100;
  const ring = 2 * Math.PI * 30;

  return (
    <div className="pb-28 px-5 pt-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="eyebrow">
            {t('home.week')} {Math.max(1, Math.ceil(totalWorkouts / 5) || 1)} · {t('home.day')} {Math.max(1, streak || 1)}
          </p>
          <h1 className="font-display text-[42px] leading-[0.92] mt-1">
            {t('home.yourWorkout').split(' ')[0]}
            <span className="block text-primary">{t('home.yourWorkout').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-body">
            {t('home.welcome')} <span className="font-semibold text-foreground">{profile.name}</span>
          </p>
        </div>
        <img src={titanMark} alt="Titan Training" width={1024} height={1024} loading="lazy" className="w-11 h-11 object-contain opacity-90" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: Flame, value: streak, label: t('home.streak') },
          { icon: Trophy, value: totalWorkouts, label: t('home.workouts') },
          { icon: Zap, value: todayCalories, label: t('home.calBurned') },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }} className="surface-card px-3 py-4 text-center">
            <stat.icon className="mx-auto mb-1.5 text-bronze" size={18} />
            <div className="text-2xl font-display leading-none">{stat.value}</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-[0.12em] mt-1.5 font-semibold">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main workout card */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="surface-dark rounded-[28px] p-6 mb-5 overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">{t('home.todayWorkout')}</p>
            <h2 className="font-display text-3xl leading-tight mt-1 text-[hsl(var(--background))]">{t(todayWorkout.nameKey)}</h2>
            <p className="text-sm text-[hsl(var(--ivory))] mt-1">
              {todayWorkout.exercises.length} {t('home.exercises')} · {todayWorkout.duration} {t('common.min')}
            </p>
          </div>
          <svg width="72" height="72" viewBox="0 0 72 72" className="shrink-0">
            <circle cx="36" cy="36" r="30" fill="none" stroke="hsl(var(--ivory) / 0.25)" strokeWidth="6" />
            <motion.circle
              cx="36" cy="36" r="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round"
              transform="rotate(-90 36 36)" strokeDasharray={ring}
              initial={{ strokeDashoffset: ring }}
              animate={{ strokeDashoffset: ring - (ring * weekPct) / 100 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            <text x="36" y="41" textAnchor="middle" className="font-display" fontSize="16" fill="hsl(var(--background))">
              {weekDone}/{weekTarget}
            </text>
          </svg>
        </div>

        <div className="flex flex-wrap gap-2 my-5">
          {todayWorkout.muscleGroups.map(mg => (
            <span key={mg} className="text-[10px] uppercase tracking-[0.12em] font-semibold px-3 py-1.5 rounded-full border border-[hsl(var(--ivory)/0.25)] text-[hsl(var(--ivory))]">
              {t(`muscle.${mg}`)}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => onStartWorkout(todayWorkout.id)}
            className="flex-1 py-3.5 rounded-full bg-primary text-primary-foreground font-display text-base tracking-wide flex items-center justify-center gap-2 glow-red">
            <Play size={17} fill="currentColor" /> {t('home.startWorkout')}
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => onStartWorkout(todayWorkout.id)}
            className="px-4 rounded-full border border-[hsl(var(--ivory)/0.3)] text-[hsl(var(--ivory))] flex items-center justify-center"
            aria-label={t('home.seeExercises')}>
            <ListChecks size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Strength points */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="surface-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-bronze" />
            <span className="eyebrow">{t('gamify.title')}</span>
          </div>
          <span className="font-display text-lg text-bronze">{t(rank.key)}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl leading-none">{points}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">{t('gamify.points')}</span>
        </div>
        <div className="h-2 rounded-full bg-secondary mt-4 overflow-hidden">
          <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }}
            animate={{ width: `${rankPct}%` }} transition={{ duration: 0.9, ease: 'easeOut' }} />
        </div>
        {nextMin && (
          <p className="text-[11px] text-muted-foreground mt-2">
            {nextMin - points} {t('gamify.points')} {t('gamify.nextLevel')}
          </p>
        )}
      </motion.div>

      {/* Quick access */}
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-display text-lg">{t('home.quickAccess')}</h3>
        <div className="rule-athletic flex-1" />
      </div>
      <div className="space-y-3">
        {gymWorkouts.slice(0, 3).map((w, i) => (
          <motion.button key={w.id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.07 }} whileTap={{ scale: 0.985 }} onClick={() => onStartWorkout(w.id)}
            className="w-full surface-card p-4 flex items-center justify-between text-left hover:border-bronze/50 transition-colors">
            <div className="min-w-0">
              <div className="font-display text-lg leading-tight">{t(w.nameKey)}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {w.exercises.length} {t('home.exercises')} · {w.duration} {t('common.min')}
              </div>
            </div>
            <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
              <Play size={15} fill="currentColor" />
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
