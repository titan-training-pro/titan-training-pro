import { motion } from 'framer-motion';
import { Play, Flame, Trophy, Zap, Calendar } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { getStreak, getTotalWorkouts, getTodayCalories } from '@/lib/store';
import { gymWorkouts } from '@/lib/workouts';

interface HomeScreenProps {
  profile: UserProfile;
  onStartWorkout: (workoutId: string) => void;
}

export default function HomeScreen({ profile, onStartWorkout }: HomeScreenProps) {
  const streak = getStreak();
  const totalWorkouts = getTotalWorkouts();
  const todayCalories = getTodayCalories();
  const todayWorkout = gymWorkouts[new Date().getDay() % gymWorkouts.length];

  return (
    <div className="pb-24 px-4 pt-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-muted-foreground text-sm font-body">Welcome back,</p>
        <h1 className="text-4xl font-display gradient-fire-text">{profile.name.toUpperCase()}</h1>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: Flame, value: streak, label: 'Day Streak', color: 'text-accent' },
          { icon: Trophy, value: totalWorkouts, label: 'Workouts', color: 'text-warning' },
          { icon: Zap, value: todayCalories, label: 'Cal Burned', color: 'text-primary' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-lg p-3 border border-border text-center"
          >
            <stat.icon className={`mx-auto mb-1 ${stat.color}`} size={20} />
            <div className="text-2xl font-display">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Today's Workout Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-lg border border-border overflow-hidden mb-6 border-neon"
      >
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground uppercase font-body">Today's Workout</span>
          </div>
          <h2 className="text-3xl font-display mb-1">{todayWorkout.name.toUpperCase()}</h2>
          <div className="flex gap-4 text-sm text-muted-foreground mb-4">
            <span>{todayWorkout.exercises.length} exercises</span>
            <span>{todayWorkout.duration} min</span>
            <span>{todayWorkout.caloriesBurned} cal</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {todayWorkout.muscleGroups.map(mg => (
              <span key={mg} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">{mg}</span>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartWorkout(todayWorkout.id)}
            className="w-full py-3 gradient-fire rounded-lg font-display text-lg tracking-wider flex items-center justify-center gap-2 glow-red"
          >
            <Play size={20} fill="currentColor" /> START WORKOUT
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Access */}
      <h3 className="text-xl font-display mb-3 text-muted-foreground">QUICK ACCESS</h3>
      <div className="space-y-3">
        {gymWorkouts.slice(0, 3).map((w, i) => (
          <motion.button
            key={w.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            onClick={() => onStartWorkout(w.id)}
            className="w-full bg-card rounded-lg border border-border p-4 flex items-center justify-between text-left hover:border-primary/50 transition-colors"
          >
            <div>
              <div className="font-display text-lg">{w.name.toUpperCase()}</div>
              <div className="text-xs text-muted-foreground">{w.exercises.length} exercises • {w.duration} min</div>
            </div>
            <Play size={18} className="text-primary" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
