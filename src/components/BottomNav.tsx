import { Home, Dumbbell, Apple, TrendingUp, User } from 'lucide-react';
import { AppScreen } from '@/lib/types';

interface BottomNavProps {
  active: AppScreen;
  onChange: (screen: AppScreen) => void;
}

const tabs: { key: AppScreen; label: string; icon: React.ElementType }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'workouts', label: 'Workouts', icon: Dumbbell },
  { key: 'nutrition', label: 'Nutrition', icon: Apple },
  { key: 'progress', label: 'Progress', icon: TrendingUp },
  { key: 'profile', label: 'Profile', icon: User },
];

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border backdrop-blur-lg bg-opacity-95">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex flex-col items-center gap-0.5 p-2 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-body font-medium">{label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-0.5 gradient-fire rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
