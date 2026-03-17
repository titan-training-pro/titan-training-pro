import { motion } from 'framer-motion';
import { User, Target, Ruler, Weight, Calendar, Dumbbell, Zap, LogOut } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { getTotalWorkouts, getStreak } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import titanLogo from '@/assets/titan-logo.png';

interface ProfileScreenProps {
  profile: UserProfile;
  onReset: () => void;
}

export default function ProfileScreen({ profile, onReset }: ProfileScreenProps) {
  const { t } = useI18n();

  const infoItems = [
    { icon: User, label: t('profile.gender'), value: t(`gender.${profile.gender}`) },
    { icon: Calendar, label: t('profile.age'), value: `${profile.age} ${t('profile.years')}` },
    { icon: Ruler, label: t('profile.height'), value: `${profile.height} cm` },
    { icon: Weight, label: t('profile.weight'), value: `${profile.weight} kg` },
    { icon: Dumbbell, label: t('profile.level'), value: t(`level.${profile.level}`) },
    { icon: Target, label: t('profile.goal'), value: t(`goal.${profile.goal}`) },
    { icon: Zap, label: t('profile.bodyType'), value: t(`bodyType.${profile.bodyType}`) },
  ];

  return (
    <div className="pb-24 px-4 pt-6">
      <div className="text-center mb-6">
        <img src={titanLogo} alt="Titan Training" className="w-20 h-20 mx-auto mb-3" />
        <h1 className="text-4xl font-display gradient-fire-text">{profile.name.toUpperCase()}</h1>
        <p className="text-muted-foreground text-sm">{t(`level.${profile.level}`)} • {t(`goal.${profile.goal}`)}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-3xl font-display text-accent">{getTotalWorkouts()}</div>
          <div className="text-[10px] text-muted-foreground uppercase">{t('profile.workouts')}</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-3xl font-display text-warning">{getStreak()}</div>
          <div className="text-[10px] text-muted-foreground uppercase">{t('profile.dayStreak')}</div>
        </div>
      </div>

      <h3 className="text-xl font-display mb-3 text-muted-foreground">{t('profile.personalInfo')}</h3>
      <div className="bg-card rounded-lg border border-border divide-y divide-border">
        {infoItems.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            <span className="font-display text-sm">{item.value}</span>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }} className="mt-6 gradient-fire rounded-lg p-5 text-center glow-red">
        <h3 className="font-display text-2xl mb-1">{t('profile.goPremium')}</h3>
        <p className="text-sm opacity-80 mb-3">{t('profile.premiumDesc')}</p>
        <div className="font-display text-3xl mb-1">R$19.90<span className="text-sm font-body">{t('profile.month')}</span></div>
        <p className="text-xs opacity-60 mb-3">{t('profile.yearSave')}</p>
        <button className="bg-foreground text-background px-6 py-2.5 rounded-lg font-display text-sm">
          {t('profile.upgradeNow')}
        </button>
      </motion.div>

      <button onClick={onReset} className="w-full mt-6 py-3 border border-border rounded-lg text-muted-foreground font-display text-sm flex items-center justify-center gap-2">
        <LogOut size={16} /> {t('profile.resetProfile')}
      </button>
    </div>
  );
}
