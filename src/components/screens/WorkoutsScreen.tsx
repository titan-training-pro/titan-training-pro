import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, StretchHorizontal, Play, Clock, Flame, Shield, PersonStanding, Activity } from 'lucide-react';
import { gymWorkouts, calisthenicsWorkouts, bodyweightWorkouts, stretchingWorkouts } from '@/lib/workouts';
import { useI18n } from '@/lib/i18n';

interface WorkoutsScreenProps {
  onStartWorkout: (workoutId: string) => void;
}

type Niche = 'gym' | 'calisthenics' | 'bodyweight' | 'stretching';

export default function WorkoutsScreen({ onStartWorkout }: WorkoutsScreenProps) {
  const { t } = useI18n();
  const [tab, setTab] = useState<Niche>('gym');
  const byNiche: Record<Niche, typeof gymWorkouts> = {
    gym: gymWorkouts,
    calisthenics: calisthenicsWorkouts,
    bodyweight: bodyweightWorkouts,
    stretching: stretchingWorkouts,
  };
  const workouts = byNiche[tab];

  return (
    <div className="pb-28 px-5 pt-8">
      <p className="eyebrow">Titan Training</p>
      <h1 className="font-display text-[40px] leading-[0.95] mb-5">{t('workouts.title')}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 rounded-2xl bg-secondary mb-6">
        {[
          { key: 'gym' as const, labelKey: 'workouts.gym', icon: Dumbbell },
          { key: 'calisthenics' as const, labelKey: 'workouts.calisthenics', icon: PersonStanding },
          { key: 'bodyweight' as const, labelKey: 'workouts.bodyweight', icon: Activity },
          { key: 'stretching' as const, labelKey: 'workouts.stretching', icon: StretchHorizontal },
        ].map(item => (
          <button key={item.key} onClick={() => setTab(item.key)}
            className={`py-2.5 px-2 rounded-xl font-display text-[11px] sm:text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all ${
              tab === item.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}>
            <item.icon size={14} /> {t(item.labelKey)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {workouts.map((w, i) => (
          <motion.div key={w.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }} className="surface-card overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-display text-xl leading-tight">{t(w.nameKey)}</h3>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full bg-bronze/12 text-bronze border border-bronze/30 flex items-center gap-1">
                  <Shield size={11} /> {t(`difficulty.${w.difficulty}`)}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {w.muscleGroups.map(mg => (
                  <span key={mg} className="text-[10px] uppercase tracking-[0.1em] font-semibold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                    {t(`muscle.${mg}`)}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5"><Dumbbell size={13} /> {w.exercises.length} {t('workouts.exercises')}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {w.duration} {t('common.min')}</span>
                <span className="flex items-center gap-1.5"><Flame size={13} /> {w.caloriesBurned} {t('common.cal')}</span>
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => onStartWorkout(w.id)}
                className="w-full py-3 rounded-full bg-primary text-primary-foreground font-display tracking-wide flex items-center justify-center gap-2 text-sm">
                <Play size={15} fill="currentColor" /> {t('workouts.start')}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
