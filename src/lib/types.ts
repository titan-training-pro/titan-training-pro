export interface UserProfile {
  gender: 'male' | 'female';
  age: number;
  height: number;
  weight: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  goal: 'fat_loss' | 'hypertrophy' | 'strength' | 'conditioning' | 'transformation';
  bodyType: 'ectomorph' | 'mesomorph' | 'endomorph';
  name: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'gym' | 'calisthenics';
  description: string;
  instructions: string[];
  commonMistakes: string[];
  musclesWorked: string[];
  videoPrompt: string;
  videoUrl?: string;
  sets: number;
  reps: string;
  restSeconds: number;
}

export interface WorkoutDay {
  id: string;
  name: string;
  nameKey: string;
  muscleGroups: string[];
  exercises: Exercise[];
  duration: number;
  difficulty: string;
  caloriesBurned: number;
}

export interface MealPlan {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
}

export interface Meal {
  nameKey: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foodKeys: string[];
}

export interface ProgressEntry {
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  workoutsCompleted: number;
}

export type AppScreen = 'onboarding' | 'home' | 'workouts' | 'nutrition' | 'progress' | 'profile' | 'settings';
