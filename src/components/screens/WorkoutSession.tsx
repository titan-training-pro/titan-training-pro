import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Timer, SkipForward, ChevronDown, ChevronUp, Play, X } from 'lucide-react';
import { WorkoutDay, Exercise } from '@/lib/types';
import { markWorkoutComplete } from '@/lib/store';
import { useI18n } from '@/lib/i18n';

interface WorkoutSessionProps {
  workout: WorkoutDay;
  onClose: () => void;
}

export default function WorkoutSession({ workout, onClose }: WorkoutSessionProps) {
  const { t } = useI18n();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [resting, setResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const exercise = workout.exercises[currentIdx];
  const isLast = currentIdx === workout.exercises.length - 1;

  useEffect(() => {
    if (!resting || restTime <= 0) return;
    const timer = setInterval(() => setRestTime(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resting, restTime]);

  useEffect(() => {
    if (resting && restTime === 0) setResting(false);
  }, [restTime, resting]);

  const completeSet = useCallback(() => {
    if (currentSet < exercise.sets) {
      setCurrentSet(currentSet + 1);
      setResting(true);
      setRestTime(exercise.restSeconds);
    } else if (!isLast) {
      setCurrentIdx(currentIdx + 1);
      setCurrentSet(1);
      setExpanded(false);
      setShowVideo(false);
    } else {
      markWorkoutComplete(workout.id);
      setCompleted(true);
    }
  }, [currentSet, exercise, currentIdx, isLast, workout.id]);

  const skipRest = () => { setResting(false); setRestTime(0); };

  if (completed) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="text-center">
          <div className="text-8xl mb-4">🏆</div>
          <h1 className="text-5xl font-display gradient-fire-text mb-2">{t('session.complete')}</h1>
          <p className="text-muted-foreground mb-2">{workout.name} {t('common.finished')}</p>
          <p className="text-muted-foreground mb-8">{workout.exercises.length} {t('home.exercises')} • ~{workout.caloriesBurned} {t('common.caloriesBurned')}</p>
          <motion.button whileTap={{ scale: 0.95 }} onClick={onClose} className="py-4 px-8 gradient-fire rounded-lg font-display text-lg glow-red">
            {t('session.backHome')}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={onClose} className="text-muted-foreground"><ArrowLeft size={24} /></button>
        <div className="flex-1">
          <div className="text-xs text-muted-foreground uppercase">{workout.name}</div>
          <div className="text-sm font-display">{t('session.exercise')} {currentIdx + 1}/{workout.exercises.length}</div>
        </div>
        <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
          <div className="h-full gradient-fire transition-all" style={{ width: `${((currentIdx) / workout.exercises.length) * 100}%` }} />
        </div>
      </div>

      {/* Rest Timer Overlay */}
      <AnimatePresence>
        {resting && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center"
          >
            <Timer className="text-accent mb-4" size={48} />
            <h2 className="text-2xl font-display text-muted-foreground mb-2">{t('session.rest')}</h2>
            <div className="text-8xl font-display gradient-fire-text mb-8">{restTime}s</div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={skipRest} className="flex items-center gap-2 text-primary font-display text-lg">
              <SkipForward size={20} /> {t('session.skipRest')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Exercise Content */}
      <div className="px-4 pt-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div key={exercise.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h2 className="text-3xl font-display mb-1">{exercise.name.toUpperCase()}</h2>
            <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>

            {/* Sets indicator */}
            <div className="flex gap-2 mb-4">
              {Array.from({ length: exercise.sets }).map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${i < currentSet - 1 ? 'gradient-fire' : i === currentSet - 1 ? 'bg-primary animate-pulse-glow' : 'bg-secondary'}`} />
              ))}
            </div>

            <div className="bg-card rounded-lg border border-border p-4 mb-4">
              <div className="grid grid-cols-3 text-center">
                <div><div className="text-2xl font-display">{currentSet}/{exercise.sets}</div><div className="text-[10px] text-muted-foreground uppercase">{t('session.set')}</div></div>
                <div><div className="text-2xl font-display">{exercise.reps}</div><div className="text-[10px] text-muted-foreground uppercase">{t('session.reps')}</div></div>
                <div><div className="text-2xl font-display">{exercise.restSeconds}s</div><div className="text-[10px] text-muted-foreground uppercase">{t('session.rest')}</div></div>
              </div>
            </div>

            {/* Expandable details */}
            <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between py-2 text-muted-foreground text-sm">
              <span>{t('session.details')}</span>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="bg-card rounded-lg border border-border p-4 mb-2">
                    <h4 className="font-display text-sm mb-2 text-accent">{t('session.instructions')}</h4>
                    <ol className="space-y-1">{exercise.instructions.map((inst, i) => (
                      <li key={i} className="text-sm text-muted-foreground">{i + 1}. {inst}</li>
                    ))}</ol>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 mb-2">
                    <h4 className="font-display text-sm mb-2 text-primary">{t('session.mistakes')}</h4>
                    <ul className="space-y-1">{exercise.commonMistakes.map((m, i) => (
                      <li key={i} className="text-sm text-muted-foreground">⚠️ {m}</li>
                    ))}</ul>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 mb-4">
                    <h4 className="font-display text-sm mb-2 text-warning">{t('session.muscles')}</h4>
                    <div className="flex flex-wrap gap-2">{exercise.musclesWorked.map((m, i) => (
                      <span key={m} className={`text-xs px-2 py-1 rounded-full ${i === 0 ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                        {i === 0 ? '● ' : '○ '}{m}
                      </span>
                    ))}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Complete Set Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={completeSet}
          className="w-full py-4 gradient-fire rounded-lg font-display text-lg tracking-wider flex items-center justify-center gap-2 glow-red"
        >
          <Check size={20} />
          {currentSet < exercise.sets ? `${t('session.completeSet')} ${currentSet}` : isLast ? t('session.finishWorkout') : t('session.nextExercise')}
        </motion.button>
      </div>
    </div>
  );
}
