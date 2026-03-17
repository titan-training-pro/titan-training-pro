import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import titanLogo from '@/assets/titan-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <motion.img src={titanLogo} alt="Titan Training" className="w-32 h-32 mx-auto mb-6"
          initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }} />
        <motion.h1 className="text-6xl font-display gradient-fire-text mb-2"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
          TITAN TRAINING
        </motion.h1>
        <motion.p className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          {t('splash.tagline')}
        </motion.p>
        <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }} onAnimationComplete={() => setTimeout(onComplete, 800)}>
          <div className="w-12 h-1 gradient-fire rounded-full mx-auto animate-pulse-glow" />
        </motion.div>
      </motion.div>
    </div>
  );
}
