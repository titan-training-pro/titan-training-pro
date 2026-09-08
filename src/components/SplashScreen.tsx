import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import titanMark from '@/assets/titan-mark.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen surface-dark flex items-center justify-center px-8">
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <motion.img
          src={titanMark}
          alt="Titan Training"
          width={1024}
          height={1024}
          className="w-24 h-24 mx-auto mb-8 object-contain"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.15 }}
        />
        <motion.h1
          className="font-display text-5xl leading-none text-[hsl(var(--background))]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
        >
          TITAN
          <span className="block text-bronze">TRAINING</span>
        </motion.h1>
        <div className="rule-athletic w-24 mx-auto my-5" />
        <motion.p
          className="font-body text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--ivory))]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        >
          {t('splash.tagline')}
        </motion.p>
        <motion.div className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }} onAnimationComplete={() => setTimeout(onComplete, 700)}>
          <div className="h-1 w-28 mx-auto rounded-full bg-primary/30 overflow-hidden">
            <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.1 }} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
