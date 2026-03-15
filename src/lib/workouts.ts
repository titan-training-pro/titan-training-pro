import { WorkoutDay } from './types';
import { exercises } from './exercises';

const getExercises = (ids: string[]) => ids.map(id => exercises.find(e => e.id === id)!).filter(Boolean);

export const gymWorkouts: WorkoutDay[] = [
  {
    id: 'push-day',
    name: 'Push Day',
    muscleGroups: ['Chest', 'Shoulders', 'Arms'],
    exercises: getExercises(['bench-press', 'incline-db-press', 'cable-fly', 'overhead-press', 'lateral-raise', 'skull-crusher']),
    duration: 60,
    difficulty: 'Intermediate',
    caloriesBurned: 450,
  },
  {
    id: 'pull-day',
    name: 'Pull Day',
    muscleGroups: ['Back', 'Arms'],
    exercises: getExercises(['deadlift', 'barbell-row', 'lat-pulldown', 'face-pull', 'barbell-curl', 'hammer-curl']),
    duration: 65,
    difficulty: 'Intermediate',
    caloriesBurned: 500,
  },
  {
    id: 'leg-day',
    name: 'Leg Day',
    muscleGroups: ['Legs', 'Glutes'],
    exercises: getExercises(['barbell-squat', 'leg-press', 'romanian-deadlift', 'leg-curl', 'hip-thrust', 'calf-raise']),
    duration: 70,
    difficulty: 'Intermediate',
    caloriesBurned: 550,
  },
  {
    id: 'upper-body',
    name: 'Upper Body',
    muscleGroups: ['Chest', 'Back', 'Shoulders'],
    exercises: getExercises(['bench-press', 'barbell-row', 'overhead-press', 'lat-pulldown', 'cable-fly', 'face-pull']),
    duration: 60,
    difficulty: 'Intermediate',
    caloriesBurned: 480,
  },
  {
    id: 'core-blast',
    name: 'Core Blast',
    muscleGroups: ['Abs'],
    exercises: getExercises(['cable-crunch', 'hanging-leg-raise']),
    duration: 30,
    difficulty: 'Intermediate',
    caloriesBurned: 250,
  },
];

export const calisthenicsWorkouts: WorkoutDay[] = [
  {
    id: 'cali-upper',
    name: 'Upper Body Calisthenics',
    muscleGroups: ['Chest', 'Back', 'Shoulders'],
    exercises: getExercises(['push-up', 'pull-up', 'dips-calisthenics', 'australian-pull-up', 'planche-lean']),
    duration: 45,
    difficulty: 'Intermediate',
    caloriesBurned: 350,
  },
  {
    id: 'cali-advanced',
    name: 'Advanced Skills',
    muscleGroups: ['Full Body'],
    exercises: getExercises(['muscle-up', 'handstand-push-up', 'l-sit', 'dragon-flag', 'pistol-squat']),
    duration: 50,
    difficulty: 'Advanced',
    caloriesBurned: 400,
  },
  {
    id: 'cali-core',
    name: 'Calisthenics Core',
    muscleGroups: ['Abs', 'Core'],
    exercises: getExercises(['l-sit', 'dragon-flag', 'hanging-leg-raise']),
    duration: 25,
    difficulty: 'Advanced',
    caloriesBurned: 200,
  },
];

export const allWorkouts = [...gymWorkouts, ...calisthenicsWorkouts];
export const getWorkoutById = (id: string) => allWorkouts.find(w => w.id === id);
