import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Moon, Sun, Bell, CreditCard, Trash2, LogOut } from 'lucide-react';
import { useI18n, Language } from '@/lib/i18n';
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SettingsScreenProps {
  onReset: () => void;
}

const langLabels: Record<Language, string> = { pt: 'Português', en: 'English', es: 'Español' };

export default function SettingsScreen({ onReset }: SettingsScreenProps) {
  const { lang, setLang, t } = useI18n();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [plan, setPlan] = useState<'free' | 'premium'>(() => {
    return (localStorage.getItem('titan_plan') as 'free' | 'premium') || 'free';
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);

  const handleThemeToggle = (checked: boolean) => {
    setDarkMode(checked);
    document.documentElement.classList.toggle('light', !checked);
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    setDeleteOpen(false);
    onReset();
  };

  const handleChangePlan = (newPlan: 'free' | 'premium') => {
    setPlan(newPlan);
    localStorage.setItem('titan_plan', newPlan);
    setPlanOpen(false);
  };

  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-4xl font-display mb-6">{t('settings.title')}</h1>

      {/* General */}
      <h3 className="text-sm font-display text-muted-foreground mb-3">{t('settings.general')}</h3>
      <div className="bg-card rounded-lg border border-border divide-y divide-border mb-6">
        {/* Language */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-accent" />
              <span className="text-sm">{t('settings.language')}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            {(['pt', 'en', 'es'] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`flex-1 py-2 rounded-lg text-xs font-display transition-all ${
                  lang === l ? 'gradient-fire glow-red' : 'bg-secondary text-muted-foreground'
                }`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={18} className="text-warning" /> : <Sun size={18} className="text-warning" />}
            <div>
              <span className="text-sm">{t('settings.theme')}</span>
              <p className="text-xs text-muted-foreground">{darkMode ? t('settings.darkMode') : t('settings.lightMode')}</p>
            </div>
          </div>
          <Switch checked={darkMode} onCheckedChange={handleThemeToggle} />
        </div>

        {/* Notifications */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-primary" />
            <div>
              <span className="text-sm">{t('settings.notifications')}</span>
              <p className="text-xs text-muted-foreground">{t('settings.notificationsDesc')}</p>
            </div>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>
      </div>

      {/* Account */}
      <h3 className="text-sm font-display text-muted-foreground mb-3">{t('settings.account')}</h3>
      <div className="bg-card rounded-lg border border-border divide-y divide-border mb-6">
        {/* Change Plan */}
        <button onClick={() => setPlanOpen(true)} className="w-full p-4 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <CreditCard size={18} className="text-accent" />
            <div>
              <span className="text-sm">{t('settings.changePlan')}</span>
              <p className="text-xs text-muted-foreground">
                {t('settings.currentPlan')}: <span className="text-accent font-display">{plan === 'premium' ? t('settings.premium') : t('settings.free')}</span>
              </p>
            </div>
          </div>
        </button>

        {/* Delete Account */}
        <button onClick={() => setDeleteOpen(true)} className="w-full p-4 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <Trash2 size={18} className="text-destructive" />
            <div>
              <span className="text-sm text-destructive">{t('settings.deleteAccount')}</span>
              <p className="text-xs text-muted-foreground">{t('settings.deleteDesc')}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Reset Profile */}
      <button onClick={onReset} className="w-full py-3 border border-border rounded-lg text-muted-foreground font-display text-sm flex items-center justify-center gap-2">
        <LogOut size={16} /> {t('settings.resetProfile')}
      </button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-destructive">{t('settings.deleteAccount')}</DialogTitle>
            <DialogDescription>{t('settings.deleteConfirm')}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>{t('settings.cancel')}</Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>{t('settings.confirm')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Plan Dialog */}
      <Dialog open={planOpen} onOpenChange={setPlanOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t('settings.changePlan')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleChangePlan('free')}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                plan === 'free' ? 'border-primary glow-red bg-primary/10' : 'border-border bg-card'
              }`}
            >
              <div className="font-display text-lg">{t('settings.free')}</div>
              <p className="text-xs text-muted-foreground">Basic workouts & nutrition</p>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleChangePlan('premium')}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                plan === 'premium' ? 'border-accent glow-orange bg-accent/10' : 'border-border bg-card'
              }`}
            >
              <div className="font-display text-lg gradient-fire-text">{t('settings.premium')}</div>
              <p className="text-xs text-muted-foreground">R$19.90/mês • Full access</p>
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
