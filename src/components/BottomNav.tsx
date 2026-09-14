import { Home, Dumbbell, TrendingUp, User, Settings, Library } from 'lucide-react';
import { motion } from 'framer-motion';
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
    { key: 'library', label: t('nav.library'), icon: Library },
    { key: 'progress', label: t('nav.progress'), icon: TrendingUp },
    { key: 'profile', label: t('nav.profile'), icon: User },
    { key: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-stretch h-[68px] max-w-lg mx-auto px-1">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`relative flex-1 min-w-0 flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-x-1 inset-y-2 rounded-2xl bg-primary/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <Icon size={19} strokeWidth={isActive ? 2.4 : 1.7} className="relative" />
              <span className="relative text-[9px] font-body font-semibold uppercase tracking-[0.08em] truncate">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
