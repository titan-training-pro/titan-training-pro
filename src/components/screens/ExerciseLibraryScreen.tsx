import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Play, Dumbbell, Timer, Repeat } from 'lucide-react';
import { Exercise } from '@/lib/types';
import { exercises } from '@/lib/exercises';
import { useI18n } from '@/lib/i18n';
import { localizeExercise } from '@/lib/exerciseI18n';
import { getMuscleImage } from '@/lib/muscleImages';

const muscleGroups = ['Abs', 'Back', 'Chest', 'Legs', 'Shoulders', 'Full Body'] as const;
const categories = ['bodyweight', 'stretching'] as const;

export default function ExerciseLibraryScreen() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [muscle, setMuscle] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Exercise | null>(null);

  const localized = useMemo(() => exercises.map(e => localizeExercise(e, lang)), [lang]);

  const filtered = useMemo(() => localized.filter(e => {
    if (muscle && e.muscleGroup !== muscle) return false;
    if (category && e.category !== category) return false;
    if (query) {
      const q = query.toLowerCase();
      return e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
    }
    return true;
  }), [localized, muscle, category, query]);

  return (
    <div className="pb-28 px-5 pt-8">
      <p className="eyebrow">Titan Training</p>
      <h1 className="font-display text-[40px] leading-[0.95] mb-5">{t('library.title')}</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('library.search')}
          className="w-full bg-secondary rounded-full py-3 pl-11 pr-10 text-sm outline-none border border-border focus:border-primary transition-colors"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-none">
        <FilterChip active={category === null} onClick={() => setCategory(null)} label={t('library.all')} />
        {categories.map(c => (
          <FilterChip key={c} active={category === c} onClick={() => setCategory(category === c ? null : c)} label={t(`workouts.${c}`)} />
        ))}
      </div>

      {/* Muscle filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-none">
        {muscleGroups.map(mg => (
          <FilterChip key={mg} active={muscle === mg} onClick={() => setMuscle(muscle === mg ? null : mg)} label={t(`muscle.${mg}`)} />
        ))}
      </div>

      {/* Exercise list */}
      <div className="space-y-3">
        {filtered.map((e, i) => (
          <motion.button
            key={e.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.4) }}
            onClick={() => setSelected(e)}
            className="surface-card w-full text-left p-4 flex items-center gap-4"
          >
            <img
              src={getMuscleImage(e.muscleGroup)}
              alt={e.muscleGroup}
              loading="lazy"
              width={96}
              height={96}
              className="w-16 h-16 rounded-xl object-cover bg-secondary shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg leading-tight truncate">{e.name.toUpperCase()}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-secondary">{t(`muscle.${e.muscleGroup}`)}</span>
                <span className="flex items-center gap-1"><Repeat size={11} /> {e.sets}×{e.reps}</span>
                <span className="flex items-center gap-1"><Timer size={11} /> {e.restSeconds}s</span>
              </div>
            </div>
            <Play size={16} className="text-primary shrink-0" />
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-10">{t('library.empty')}</p>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur overflow-y-auto"
          >
            <div className="max-w-lg mx-auto px-5 pt-6 pb-24">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.14em] font-semibold px-3 py-1.5 rounded-full bg-secondary text-muted-foreground">
                  {t(`muscle.${selected.muscleGroup}`)}
                </span>
                <button onClick={() => setSelected(null)} className="p-2 rounded-full bg-secondary text-muted-foreground">
                  <X size={18} />
                </button>
              </div>

              <h2 className="font-display text-3xl mb-2">{selected.name.toUpperCase()}</h2>
              <p className="text-sm text-muted-foreground mb-4">{selected.description}</p>

              {selected.videoUrl && (
                <div className="mb-4 rounded-xl overflow-hidden border border-border bg-card">
                  <video
                    key={selected.videoUrl}
                    src={selected.videoUrl}
                    autoPlay loop muted playsInline controls
                    className="w-full aspect-video object-cover bg-secondary"
                  />
                </div>
              )}

              <div className="bg-card rounded-xl border border-border p-4 mb-4">
                <div className="grid grid-cols-3 text-center">
                  <div><div className="text-2xl font-display">{selected.sets}</div><div className="text-[10px] text-muted-foreground uppercase">{t('session.set')}</div></div>
                  <div><div className="text-2xl font-display">{selected.reps}</div><div className="text-[10px] text-muted-foreground uppercase">{t('session.reps')}</div></div>
                  <div><div className="text-2xl font-display">{selected.restSeconds}s</div><div className="text-[10px] text-muted-foreground uppercase">{t('session.rest')}</div></div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 mb-3">
                <h4 className="font-display text-sm mb-2 text-accent">{t('session.instructions')}</h4>
                <ol className="space-y-1">{selected.instructions.map((inst, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{i + 1}. {inst}</li>
                ))}</ol>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 mb-3">
                <h4 className="font-display text-sm mb-2 text-primary">{t('session.mistakes')}</h4>
                <ul className="space-y-1">{selected.commonMistakes.map((m, i) => (
                  <li key={i} className="text-sm text-muted-foreground">⚠️ {m}</li>
                ))}</ul>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <h4 className="font-display text-sm mb-2 text-warning">{t('session.muscles')}</h4>
                <img
                  src={getMuscleImage(selected.muscleGroup)}
                  alt={`${selected.name} - ${selected.musclesWorked.join(', ')}`}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="w-full max-w-[220px] mx-auto rounded-lg mb-3 bg-secondary"
                />
                <div className="flex flex-wrap gap-2">{selected.musclesWorked.map((m, i) => (
                  <span key={m} className={`text-xs px-2 py-1 rounded-full ${i === 0 ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                    {i === 0 ? '● ' : '○ '}{m}
                  </span>
                ))}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
        active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
      }`}
    >
      {label}
    </button>
  );
}
