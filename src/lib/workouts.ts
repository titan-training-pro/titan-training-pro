import { WorkoutDay } from './types';
import { exercises } from './exercises';

const getExercises = (ids: string[]) => ids.flatMap(id => {
  const exercise = exercises.find(item => item.id === id);
  return exercise ? [exercise] : [];
});

export const gymWorkouts: WorkoutDay[] = [];

export const calisthenicsWorkouts: WorkoutDay[] = [];

export const bodyweightWorkouts: WorkoutDay[] = [
  {
    id: 'home-core-video',
    name: 'Home Core',
    nameKey: 'workout.homeCore',
    muscleGroups: ['Abs', 'Core'],
    exercises: getExercises(['arms-overhead-full-situp', 'lying-hip-knee-raise', 'seated-air-bike-chair', 'sitting-russian-twist-chair']),
    duration: 25,
    difficulty: 'Beginner',
    caloriesBurned: 180,
  },
  {
    id: 'chair-workout',
    name: 'Chair Workout',
    nameKey: 'workout.chairWorkout',
    muscleGroups: ['Abs', 'Legs', 'Shoulders'],
    exercises: getExercises(['seated-air-bike-chair', 'seated-leg-raise-chair', 'seated-knee-extension-chair', 'seated-arm-circle-chair', 'sitting-scapular-adduction']),
    duration: 20,
    difficulty: 'Beginner',
    caloriesBurned: 140,
  },
  {
    id: 'no-equipment-full',
    name: 'No Equipment Full Body',
    nameKey: 'workout.noEquipment',
    muscleGroups: ['Full Body'],
    exercises: getExercises(['double-woodchoppers', 'lying-punches', 'bodyweight-lying-leg-curl', 'lying-alternate-back-raise', 'arms-overhead-full-situp']),
    duration: 30,
    difficulty: 'Intermediate',
    caloriesBurned: 260,
  },
];

export const stretchingWorkouts: WorkoutDay[] = [
  {
    id: 'mobility-flow',
    name: 'Mobility Flow',
    nameKey: 'workout.mobilityFlow',
    muscleGroups: ['Full Body'],
    exercises: getExercises(['stand-to-squat', 'squat-mobility-side-bend', 'deep-squat-head-to-floor', 'kneeling-hip-flexor-stretch']),
    duration: 15,
    difficulty: 'Beginner',
    caloriesBurned: 80,
  },
  {
    id: 'posture-reset',
    name: 'Posture Reset',
    nameKey: 'workout.postureReset',
    muscleGroups: ['Back', 'Shoulders'],
    exercises: getExercises(['sitting-scapular-adduction', 'lying-floor-slide', 'seated-arm-circle-chair']),
    duration: 12,
    difficulty: 'Beginner',
    caloriesBurned: 70,
  },
  {
    id: 'lower-body-stretch',
    name: 'Lower Body Stretch',
    nameKey: 'workout.lowerStretch',
    muscleGroups: ['Legs', 'Glutes'],
    exercises: getExercises(['kneeling-hip-flexor-stretch', 'deep-squat-head-to-floor', 'stand-to-squat']),
    duration: 14,
    difficulty: 'Beginner',
    caloriesBurned: 75,
  },
];

export const allWorkouts = [...gymWorkouts, ...calisthenicsWorkouts, ...bodyweightWorkouts, ...stretchingWorkouts].filter(w => w.exercises.length > 0);
export const getWorkoutById = (id: string) => allWorkouts.find(w => w.id === id);
