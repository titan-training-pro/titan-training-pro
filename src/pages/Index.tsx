import { useState, useEffect } from 'react';
import { UserProfile, AppScreen } from '@/lib/types';
import { getProfile } from '@/lib/store';
import { getWorkoutById } from '@/lib/workouts';
import Onboarding from '@/components/Onboarding';
import BottomNav from '@/components/BottomNav';
import SplashScreen from '@/components/SplashScreen';
import HomeScreen from '@/components/screens/HomeScreen';
import WorkoutsScreen from '@/components/screens/WorkoutsScreen';
import WorkoutSession from '@/components/screens/WorkoutSession';
import NutritionScreen from '@/components/screens/NutritionScreen';
import ProgressScreen from '@/components/screens/ProgressScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';

export default function Index() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<AppScreen>('home');
  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const saved = getProfile();
    if (saved) setProfile(saved);
    setLoaded(true);
  }, []);

  if (!loaded) return null;
  if (!splashDone) return <SplashScreen onComplete={() => setSplashDone(true)} />;
  if (!profile) return <Onboarding onComplete={p => setProfile(p)} />;

  const activeWorkout = activeWorkoutId ? getWorkoutById(activeWorkoutId) : null;
  if (activeWorkout) {
    return <WorkoutSession workout={activeWorkout} onClose={() => { setActiveWorkoutId(null); setScreen('home'); }} />;
  }

  const handleStartWorkout = (id: string) => setActiveWorkoutId(id);
  const handleReset = () => {
    localStorage.clear();
    setProfile(null);
    setScreen('home');
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      {screen === 'home' && <HomeScreen profile={profile} onStartWorkout={handleStartWorkout} />}
      {screen === 'workouts' && <WorkoutsScreen onStartWorkout={handleStartWorkout} />}
      {screen === 'nutrition' && <NutritionScreen profile={profile} />}
      {screen === 'progress' && <ProgressScreen profile={profile} />}
      {screen === 'profile' && <ProfileScreen profile={profile} onReset={handleReset} />}
      {screen === 'settings' && <SettingsScreen onReset={handleReset} />}
      <BottomNav active={screen} onChange={setScreen} />
    </div>
  );
}
