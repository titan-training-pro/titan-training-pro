import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Trophy, Flame, Target, Plus } from 'lucide-react';
import { UserProfile, ProgressEntry } from '@/lib/types';
import { getProgressHistory, saveProgress, getStreak, getTotalWorkouts } from '@/lib/store';
import { useI18n } from '@/lib/i18n';

interface ProgressScreenProps {
  profile: UserProfile;
}

export default function ProgressScreen({ profile }: ProgressScreenProps) {
  const { t } = useI18n();
  const [history, setHistory] = useState(getProgressHistory());
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState(profile.weight);
  const [bodyFat, setBodyFat] = useState(15);

  const addEntry = () => {
    const entry: ProgressEntry = {
      date: new Date().toISOString(), weight, bodyFat,
      workoutsCompleted: getTotalWorkouts(),
    };
    saveProgress(entry);
    setHistory([...history, entry]);
    setShowForm(false);
  };

  const streak = getStreak();
  const totalWorkouts = getTotalWorkouts();

  return (
    <div className="pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-display">{t('progress.title')}</h1>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(!showForm)} className="p-2 gradient-fire rounded-lg">
          <Plus size={20} />
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: Flame, label: t('progress.currentStreak'), value: `${streak} ${t('progress.days')}`, color: 'text-accent' },
          { icon: Trophy, label: t('progress.totalWorkouts'), value: totalWorkouts, color: 'text-warning' },
          { icon: Target, label: t('progress.currentWeight'), value: `${history.length > 0 ? history[history.length - 1].weight : profile.weight} kg`, color: 'text-primary' },
          { icon: TrendingUp, label: t('progress.goal'), value: t(`goal.${profile.goal}`).toUpperCase(), color: 'text-foreground' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }} className="bg-card rounded-lg border border-border p-4">
            <stat.icon className={stat.color} size={20} />
            <div className="text-xl font-display mt-2">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-card rounded-lg border border-border p-4 mb-6">
          <h3 className="font-display text-lg mb-3">{t('progress.logProgress')}</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground uppercase">{t('progress.weight')}</label>
              <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))}
                className="w-full p-3 bg-secondary rounded-lg text-foreground mt-1 focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase">{t('progress.bodyFat')}</label>
              <input type="number" value={bodyFat} onChange={e => setBodyFat(Number(e.target.value))}
                className="w-full p-3 bg-secondary rounded-lg text-foreground mt-1 focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={addEntry}
              className="w-full py-3 gradient-fire rounded-lg font-display tracking-wider">{t('progress.save')}</motion.button>
          </div>
        </motion.div>
      )}

      <h3 className="text-xl font-display mb-3 text-muted-foreground">{t('progress.weightHistory')}</h3>
      {history.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
          <TrendingUp className="mx-auto mb-2" size={32} />
          <p className="text-sm">{t('progress.noEntries')}</p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-end gap-1 h-32">
            {history.slice(-14).map((entry, i) => {
              const min = Math.min(...history.map(e => e.weight));
              const max = Math.max(...history.map(e => e.weight));
              const range = max - min || 1;
              const height = ((entry.weight - min) / range) * 80 + 20;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[8px] text-muted-foreground">{entry.weight}</span>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${height}%` }} className="w-full gradient-fire rounded-t" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
