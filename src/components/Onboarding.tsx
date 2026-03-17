import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '@/lib/types';
import { saveProfile } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import titanLogo from '@/assets/titan-logo.png';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

type Step = 'welcome' | 'gender' | 'age' | 'height' | 'weight' | 'level' | 'goal' | 'bodyType' | 'name';
const steps: Step[] = ['welcome', 'gender', 'age', 'height', 'weight', 'level', 'goal', 'bodyType', 'name'];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: 'male', age: 25, height: 175, weight: 75, level: 'intermediate',
    goal: 'hypertrophy', bodyType: 'mesomorph', name: '',
  });

  const currentStep = steps[step];
  const progress = ((step) / (steps.length - 1)) * 100;

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      const full = profile as UserProfile;
      saveProfile(full);
      onComplete(full);
    }
  };

  const back = () => { if (step > 0) setStep(step - 1); };
  const update = (key: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = currentStep === 'name' ? (profile.name?.trim().length ?? 0) > 0 : true;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {step > 0 && (
        <div className="px-4 pt-4">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div className="h-full gradient-fire" animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
          </div>
          <div className="flex justify-between mt-2">
            <button onClick={back} className="text-muted-foreground flex items-center gap-1 text-sm">
              <ChevronLeft size={16} /> {t('onboarding.back')}
            </button>
            <span className="text-muted-foreground text-sm">{step}/{steps.length - 1}</span>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-md"
          >
            {currentStep === 'welcome' && (
              <div className="text-center">
                <motion.img src={titanLogo} alt="Titan Training" className="w-40 h-40 mx-auto mb-6"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} />
                <h1 className="text-5xl font-display gradient-fire-text mb-3">TITAN TRAINING</h1>
                <p className="text-muted-foreground mb-8">{t('onboarding.subtitle')}</p>
              </div>
            )}

            {currentStep === 'gender' && (
              <div>
                <h2 className="text-3xl font-display text-center mb-8">{t('onboarding.gender')}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {(['male', 'female'] as const).map(g => (
                    <button key={g} onClick={() => update('gender', g)}
                      className={`p-6 rounded-lg border-2 transition-all text-center font-display text-2xl ${
                        profile.gender === g ? 'border-primary glow-red bg-primary/10' : 'border-border bg-card hover:border-muted-foreground'
                      }`}>
                      <div className="text-4xl mb-2">{g === 'male' ? '♂' : '♀'}</div>
                      {g === 'male' ? t('onboarding.male') : t('onboarding.female')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'age' && (
              <div className="text-center">
                <h2 className="text-3xl font-display mb-8">{t('onboarding.age')}</h2>
                <div className="text-7xl font-display gradient-fire-text mb-6">{profile.age}</div>
                <input type="range" min={14} max={65} value={profile.age}
                  onChange={e => update('age', Number(e.target.value))} className="w-full accent-primary" />
                <div className="flex justify-between text-muted-foreground text-sm mt-2"><span>14</span><span>65</span></div>
              </div>
            )}

            {currentStep === 'height' && (
              <div className="text-center">
                <h2 className="text-3xl font-display mb-8">{t('onboarding.heightQ')}</h2>
                <div className="text-7xl font-display gradient-fire-text mb-6">{profile.height}</div>
                <input type="range" min={140} max={220} value={profile.height}
                  onChange={e => update('height', Number(e.target.value))} className="w-full accent-primary" />
                <div className="flex justify-between text-muted-foreground text-sm mt-2"><span>140cm</span><span>220cm</span></div>
              </div>
            )}

            {currentStep === 'weight' && (
              <div className="text-center">
                <h2 className="text-3xl font-display mb-8">{t('onboarding.weightQ')}</h2>
                <div className="text-7xl font-display gradient-fire-text mb-6">{profile.weight}</div>
                <input type="range" min={40} max={160} value={profile.weight}
                  onChange={e => update('weight', Number(e.target.value))} className="w-full accent-primary" />
                <div className="flex justify-between text-muted-foreground text-sm mt-2"><span>40kg</span><span>160kg</span></div>
              </div>
            )}

            {currentStep === 'level' && (
              <div>
                <h2 className="text-3xl font-display text-center mb-8">{t('onboarding.levelQ')}</h2>
                <div className="space-y-3">
                  {([
                    { value: 'beginner', labelKey: 'onboarding.beginner', descKey: 'onboarding.beginnerDesc' },
                    { value: 'intermediate', labelKey: 'onboarding.intermediate', descKey: 'onboarding.intermediateDesc' },
                    { value: 'advanced', labelKey: 'onboarding.advanced', descKey: 'onboarding.advancedDesc' },
                  ] as const).map(l => (
                    <button key={l.value} onClick={() => update('level', l.value)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        profile.level === l.value ? 'border-primary glow-red bg-primary/10' : 'border-border bg-card hover:border-muted-foreground'
                      }`}>
                      <div className="font-display text-xl">{t(l.labelKey)}</div>
                      <div className="text-sm text-muted-foreground">{t(l.descKey)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'goal' && (
              <div>
                <h2 className="text-3xl font-display text-center mb-6">{t('onboarding.goalQ')}</h2>
                <div className="space-y-3">
                  {([
                    { value: 'fat_loss', labelKey: 'onboarding.fatLoss', descKey: 'onboarding.fatLossDesc' },
                    { value: 'hypertrophy', labelKey: 'onboarding.hypertrophy', descKey: 'onboarding.hypertrophyDesc' },
                    { value: 'strength', labelKey: 'onboarding.strength', descKey: 'onboarding.strengthDesc' },
                    { value: 'conditioning', labelKey: 'onboarding.conditioning', descKey: 'onboarding.conditioningDesc' },
                    { value: 'transformation', labelKey: 'onboarding.transformation', descKey: 'onboarding.transformationDesc' },
                  ] as const).map(g => (
                    <button key={g.value} onClick={() => update('goal', g.value)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        profile.goal === g.value ? 'border-primary glow-red bg-primary/10' : 'border-border bg-card hover:border-muted-foreground'
                      }`}>
                      <div className="font-display text-lg">{t(g.labelKey)}</div>
                      <div className="text-sm text-muted-foreground">{t(g.descKey)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'bodyType' && (
              <div>
                <h2 className="text-3xl font-display text-center mb-6">{t('onboarding.bodyTypeQ')}</h2>
                <div className="space-y-3">
                  {([
                    { value: 'ectomorph', labelKey: 'onboarding.ectomorph', descKey: 'onboarding.ectomorphDesc' },
                    { value: 'mesomorph', labelKey: 'onboarding.mesomorph', descKey: 'onboarding.mesomorphDesc' },
                    { value: 'endomorph', labelKey: 'onboarding.endomorph', descKey: 'onboarding.endomorphDesc' },
                  ] as const).map(b => (
                    <button key={b.value} onClick={() => update('bodyType', b.value)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        profile.bodyType === b.value ? 'border-primary glow-red bg-primary/10' : 'border-border bg-card hover:border-muted-foreground'
                      }`}>
                      <div className="font-display text-xl">{t(b.labelKey)}</div>
                      <div className="text-sm text-muted-foreground">{t(b.descKey)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'name' && (
              <div className="text-center">
                <h2 className="text-3xl font-display mb-4">{t('onboarding.nameQ')}</h2>
                <p className="text-muted-foreground mb-8">{t('onboarding.nameSubtitle')}</p>
                <input type="text" value={profile.name} onChange={e => update('name', e.target.value)}
                  placeholder={t('onboarding.namePlaceholder')} autoFocus
                  className="w-full p-4 bg-card border-2 border-border rounded-lg text-center text-xl font-display text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-8">
        <motion.button onClick={next} disabled={!canProceed} whileTap={{ scale: 0.97 }}
          className="w-full py-4 gradient-fire rounded-lg font-display text-xl text-foreground tracking-wider disabled:opacity-40 flex items-center justify-center gap-2 glow-red">
          {currentStep === 'welcome' ? t('onboarding.getStarted') : step === steps.length - 1 ? t('onboarding.startTraining') : t('onboarding.continue')}
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
