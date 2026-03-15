import { UserProfile, ProgressEntry } from './types';

const PROFILE_KEY = 'titan_profile';
const PROGRESS_KEY = 'titan_progress';
const COMPLETED_KEY = 'titan_completed';
const STREAK_KEY = 'titan_streak';

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getProfile(): UserProfile | null {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveProgress(entry: ProgressEntry) {
  const entries = getProgressHistory();
  entries.push(entry);
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(entries));
}

export function getProgressHistory(): ProgressEntry[] {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : [];
}

export function markWorkoutComplete(workoutId: string) {
  const completed = getCompletedWorkouts();
  completed.push({ id: workoutId, date: new Date().toISOString() });
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
  updateStreak();
}

export function getCompletedWorkouts(): { id: string; date: string }[] {
  const data = localStorage.getItem(COMPLETED_KEY);
  return data ? JSON.parse(data) : [];
}

export function getStreak(): number {
  const data = localStorage.getItem(STREAK_KEY);
  return data ? JSON.parse(data) : 0;
}

function updateStreak() {
  const completed = getCompletedWorkouts();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const todayWorkouts = completed.filter(c => new Date(c.date).toDateString() === today);
  const yesterdayWorkouts = completed.filter(c => new Date(c.date).toDateString() === yesterday);
  
  let streak = getStreak();
  if (todayWorkouts.length === 1) {
    streak = yesterdayWorkouts.length > 0 ? streak + 1 : 1;
  }
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
}

export function getTotalWorkouts(): number {
  return getCompletedWorkouts().length;
}

export function getTodayCalories(): number {
  const completed = getCompletedWorkouts();
  const today = new Date().toDateString();
  return completed.filter(c => new Date(c.date).toDateString() === today).length * 450;
}
