import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, StretchHorizontal, Play, Clock, Flame } from 'lucide-react';
import { gymWorkouts, calisthenicsWorkouts } from '@/lib/workouts';

interface WorkoutsScreenProps {
  onStartWorkout: (workoutId: string) => void;
}

export default function WorkoutsScreen({ onStartWorkout }: WorkoutsScreenProps) {
  const [tab, setTab] = useState<'gym' | 'calisthenics'>('gym');
  const workouts = tab === 'gym' ? gymWorkouts : calisthenicsWorkouts;

  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-4xl font-display mb-6">WORKOUTS</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'gym' as const, label: 'GYM', icon: Dumbbell },
          { key: 'calisthenics' as const, label: 'CALISTHENICS', icon: StretchHorizontal },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-3 rounded-lg font-display text-sm flex items-center justify-center gap-2 transition-all ${
              tab === t.key ? 'gradient-fire glow-red' : 'bg-card border border-border text-muted-foreground'
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {/* Workout List */}
      <div className="space-y-4">
        {workouts.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-lg border border-border overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-xl">{w.name.toUpperCase()}</h3>
                <span className="text-xs px-2 py-1 bg-secondary rounded-full text-accent">{w.difficulty}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {w.muscleGroups.map(mg => (
                  <span key={mg} className="text-[10px] px-2 py-0.5 bg-secondary/50 rounded text-muted-foreground">{mg}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Dumbbell size={14} /> {w.exercises.length} exercises</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {w.duration} min</span>
                <span className="flex items-center gap-1"><Flame size={14} /> {w.caloriesBurned} cal</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onStartWorkout(w.id)}
                className="w-full py-2.5 gradient-fire rounded-lg font-display tracking-wider flex items-center justify-center gap-2 text-sm"
              >
                <Play size={16} fill="currentColor" /> START
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
