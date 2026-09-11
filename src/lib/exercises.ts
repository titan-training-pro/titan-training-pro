import { Exercise } from './types';
import { videoExercises } from './videoExercises';

/** Only exercises that have a demonstration video are available in the app. */
export const exercises: Exercise[] = [...videoExercises];

export const getExercisesByCategory = (category: 'gym' | 'bodyweight' | 'stretching') =>
  exercises.filter(e => e.category === category);
export const exercisesWithVideo = () => exercises.filter(e => !!e.videoUrl);
export const getExercisesByMuscleGroup = (group: string) => exercises.filter(e => e.muscleGroup === group);
export const getExercisesByType = (type: 'gym' | 'calisthenics') => exercises.filter(e => e.type === type);
export const getExerciseById = (id: string) => exercises.find(e => e.id === id);
