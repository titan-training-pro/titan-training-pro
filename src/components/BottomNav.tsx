import { Home, Dumbbell, Apple, TrendingUp, User, Settings } from 'lucide-react';
import { AppScreen } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

interface BottomNavProps {
  active: AppScreen;
  onChange: (screen: AppScreen) => void;
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  const { t } = useI18n();
  
  const tabs: { key: AppScreen; label: string; icon: React.ElementType }[] = [
    { key: 'home', label: t('nav.home'), icon: Home },
    { key: 'workouts', label: t('nav.workouts'), icon: Dumbbell },
    { key: 'nutrition', label: t('nav.nutrition'), icon: Apple },
    { key: 'progress', label: t('nav.progress'), icon: TrendingUp },
    { key: 'profile', label: t('nav.profile'), icon: User },
    { key: 'settings', label: t('nav.settings'), icon: Settings },
  ];

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
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[9px] font-body font-medium">{label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-6 h-0.5 gradient-fire rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
