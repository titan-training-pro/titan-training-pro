import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type Language = 'pt' | 'en' | 'es';

const translations = {
  // Navigation
  'nav.home': { pt: 'Início', en: 'Home', es: 'Inicio' },
  'nav.workouts': { pt: 'Treinos', en: 'Workouts', es: 'Entrenos' },
  'nav.nutrition': { pt: 'Nutrição', en: 'Nutrition', es: 'Nutrición' },
  'nav.progress': { pt: 'Progresso', en: 'Progress', es: 'Progreso' },
  'nav.profile': { pt: 'Perfil', en: 'Profile', es: 'Perfil' },
  'nav.settings': { pt: 'Config', en: 'Settings', es: 'Ajustes' },

  // Home
  'home.welcome': { pt: 'Bem-vindo de volta,', en: 'Welcome back,', es: 'Bienvenido,' },
  'home.streak': { pt: 'Sequência', en: 'Day Streak', es: 'Racha' },
  'home.workouts': { pt: 'Treinos', en: 'Workouts', es: 'Entrenos' },
  'home.calBurned': { pt: 'Cal Queimadas', en: 'Cal Burned', es: 'Cal Quemadas' },
  'home.todayWorkout': { pt: 'Treino de Hoje', en: "Today's Workout", es: 'Entreno de Hoy' },
  'home.exercises': { pt: 'exercícios', en: 'exercises', es: 'ejercicios' },
  'home.startWorkout': { pt: 'INICIAR TREINO', en: 'START WORKOUT', es: 'INICIAR ENTRENO' },
  'home.quickAccess': { pt: 'ACESSO RÁPIDO', en: 'QUICK ACCESS', es: 'ACCESO RÁPIDO' },

  // Workouts
  'workouts.title': { pt: 'TREINOS', en: 'WORKOUTS', es: 'ENTRENOS' },
  'workouts.gym': { pt: 'ACADEMIA', en: 'GYM', es: 'GIMNASIO' },
  'workouts.calisthenics': { pt: 'CALISTENIA', en: 'CALISTHENICS', es: 'CALISTENIA' },
  'workouts.start': { pt: 'INICIAR', en: 'START', es: 'INICIAR' },

  // Workout Session
  'session.exercise': { pt: 'Exercício', en: 'Exercise', es: 'Ejercicio' },
  'session.rest': { pt: 'DESCANSO', en: 'REST', es: 'DESCANSO' },
  'session.skipRest': { pt: 'PULAR DESCANSO', en: 'SKIP REST', es: 'SALTAR DESCANSO' },
  'session.completeSet': { pt: 'COMPLETAR SÉRIE', en: 'COMPLETE SET', es: 'COMPLETAR SERIE' },
  'session.nextExercise': { pt: 'PRÓXIMO EXERCÍCIO', en: 'NEXT EXERCISE', es: 'SIGUIENTE EJERCICIO' },
  'session.finishWorkout': { pt: 'FINALIZAR TREINO', en: 'FINISH WORKOUT', es: 'FINALIZAR ENTRENO' },
  'session.complete': { pt: 'TREINO COMPLETO!', en: 'WORKOUT COMPLETE!', es: '¡ENTRENO COMPLETO!' },
  'session.backHome': { pt: 'VOLTAR AO INÍCIO', en: 'BACK TO HOME', es: 'VOLVER AL INICIO' },
  'session.details': { pt: 'Detalhes do Exercício', en: 'Exercise Details', es: 'Detalles del Ejercicio' },
  'session.instructions': { pt: 'INSTRUÇÕES', en: 'INSTRUCTIONS', es: 'INSTRUCCIONES' },
  'session.mistakes': { pt: 'ERROS COMUNS', en: 'COMMON MISTAKES', es: 'ERRORES COMUNES' },
  'session.muscles': { pt: 'MÚSCULOS TRABALHADOS', en: 'MUSCLES WORKED', es: 'MÚSCULOS TRABAJADOS' },
  'session.set': { pt: 'Série', en: 'Set', es: 'Serie' },
  'session.reps': { pt: 'Reps', en: 'Reps', es: 'Reps' },
  'session.watchVideo': { pt: 'ASSISTIR VÍDEO', en: 'WATCH VIDEO', es: 'VER VÍDEO' },
  'session.anatomy': { pt: 'ANATOMIA 3D', en: '3D ANATOMY', es: 'ANATOMÍA 3D' },

  // Nutrition
  'nutrition.title': { pt: 'NUTRIÇÃO', en: 'NUTRITION', es: 'NUTRICIÓN' },
  'nutrition.personalized': { pt: 'Personalizado para seu objetivo de', en: 'Personalized for your', es: 'Personalizado para tu objetivo de' },
  'nutrition.dailyPlan': { pt: 'PLANO DIÁRIO', en: 'DAILY MEAL PLAN', es: 'PLAN DIARIO' },
  'nutrition.calories': { pt: 'Calorias', en: 'Calories', es: 'Calorías' },
  'nutrition.protein': { pt: 'Proteína', en: 'Protein', es: 'Proteína' },
  'nutrition.carbs': { pt: 'Carboidratos', en: 'Carbs', es: 'Carbohidratos' },
  'nutrition.fats': { pt: 'Gorduras', en: 'Fats', es: 'Grasas' },

  // Progress
  'progress.title': { pt: 'PROGRESSO', en: 'PROGRESS', es: 'PROGRESO' },
  'progress.currentStreak': { pt: 'Sequência Atual', en: 'Current Streak', es: 'Racha Actual' },
  'progress.totalWorkouts': { pt: 'Total de Treinos', en: 'Total Workouts', es: 'Total Entrenos' },
  'progress.currentWeight': { pt: 'Peso Atual', en: 'Current Weight', es: 'Peso Actual' },
  'progress.goal': { pt: 'Meta', en: 'Goal', es: 'Meta' },
  'progress.logProgress': { pt: 'REGISTRAR PROGRESSO', en: 'LOG PROGRESS', es: 'REGISTRAR PROGRESO' },
  'progress.weight': { pt: 'Peso (kg)', en: 'Weight (kg)', es: 'Peso (kg)' },
  'progress.bodyFat': { pt: 'Gordura Corporal %', en: 'Body Fat %', es: 'Grasa Corporal %' },
  'progress.save': { pt: 'SALVAR', en: 'SAVE ENTRY', es: 'GUARDAR' },
  'progress.weightHistory': { pt: 'HISTÓRICO DE PESO', en: 'WEIGHT HISTORY', es: 'HISTORIAL DE PESO' },
  'progress.noEntries': { pt: 'Sem registros. Comece a acompanhar!', en: 'No entries yet. Start tracking!', es: 'Sin registros. ¡Empieza a seguir!' },
  'progress.days': { pt: 'dias', en: 'days', es: 'días' },

  // Profile
  'profile.personalInfo': { pt: 'INFORMAÇÕES PESSOAIS', en: 'PERSONAL INFO', es: 'INFORMACIÓN PERSONAL' },
  'profile.gender': { pt: 'Gênero', en: 'Gender', es: 'Género' },
  'profile.age': { pt: 'Idade', en: 'Age', es: 'Edad' },
  'profile.height': { pt: 'Altura', en: 'Height', es: 'Altura' },
  'profile.weight': { pt: 'Peso', en: 'Weight', es: 'Peso' },
  'profile.level': { pt: 'Nível', en: 'Level', es: 'Nivel' },
  'profile.goal': { pt: 'Meta', en: 'Goal', es: 'Meta' },
  'profile.bodyType': { pt: 'Biotipo', en: 'Body Type', es: 'Biotipo' },
  'profile.goPremium': { pt: 'ASSINAR PREMIUM', en: 'GO PREMIUM', es: 'HAZTE PREMIUM' },
  'profile.premiumDesc': { pt: 'Desbloqueie todos os treinos, dietas e vídeos HD', en: 'Unlock all workouts, diet plans & HD videos', es: 'Desbloquea todos los entrenos, dietas y vídeos HD' },
  'profile.upgradeNow': { pt: 'ASSINAR AGORA', en: 'UPGRADE NOW', es: 'SUSCRIBIRSE' },
  'profile.resetProfile': { pt: 'RESETAR PERFIL', en: 'RESET PROFILE', es: 'REINICIAR PERFIL' },
  'profile.years': { pt: 'anos', en: 'years', es: 'años' },

  // Settings
  'settings.title': { pt: 'CONFIGURAÇÕES', en: 'SETTINGS', es: 'AJUSTES' },
  'settings.language': { pt: 'Idioma', en: 'Language', es: 'Idioma' },
  'settings.theme': { pt: 'Tema', en: 'Theme', es: 'Tema' },
  'settings.darkMode': { pt: 'Modo Escuro', en: 'Dark Mode', es: 'Modo Oscuro' },
  'settings.lightMode': { pt: 'Modo Claro', en: 'Light Mode', es: 'Modo Claro' },
  'settings.notifications': { pt: 'Notificações', en: 'Notifications', es: 'Notificaciones' },
  'settings.notificationsDesc': { pt: 'Lembretes de treino e motivação', en: 'Workout reminders and motivation', es: 'Recordatorios de entreno y motivación' },
  'settings.account': { pt: 'CONTA', en: 'ACCOUNT', es: 'CUENTA' },
  'settings.changePlan': { pt: 'Alterar Plano', en: 'Change Plan', es: 'Cambiar Plan' },
  'settings.currentPlan': { pt: 'Plano Atual', en: 'Current Plan', es: 'Plan Actual' },
  'settings.free': { pt: 'Gratuito', en: 'Free', es: 'Gratuito' },
  'settings.premium': { pt: 'Premium', en: 'Premium', es: 'Premium' },
  'settings.deleteAccount': { pt: 'Excluir Conta', en: 'Delete Account', es: 'Eliminar Cuenta' },
  'settings.deleteDesc': { pt: 'Remover todos os dados permanentemente', en: 'Permanently remove all data', es: 'Eliminar todos los datos permanentemente' },
  'settings.deleteConfirm': { pt: 'Tem certeza? Esta ação é irreversível.', en: 'Are you sure? This action is irreversible.', es: '¿Estás seguro? Esta acción es irreversible.' },
  'settings.cancel': { pt: 'Cancelar', en: 'Cancel', es: 'Cancelar' },
  'settings.confirm': { pt: 'Confirmar', en: 'Confirm', es: 'Confirmar' },
  'settings.general': { pt: 'GERAL', en: 'GENERAL', es: 'GENERAL' },
  'settings.resetProfile': { pt: 'RESETAR PERFIL', en: 'RESET PROFILE', es: 'REINICIAR PERFIL' },

  // Onboarding
  'onboarding.getStarted': { pt: 'COMEÇAR', en: 'GET STARTED', es: 'COMENZAR' },
  'onboarding.continue': { pt: 'CONTINUAR', en: 'CONTINUE', es: 'CONTINUAR' },
  'onboarding.startTraining': { pt: 'COMEÇAR A TREINAR', en: 'START TRAINING', es: 'EMPEZAR A ENTRENAR' },
  'onboarding.back': { pt: 'Voltar', en: 'Back', es: 'Volver' },
  'onboarding.subtitle': { pt: 'Desperte o titã interior. Construa força, queime gordura, transforme seu corpo.', en: 'Unleash your inner titan. Build strength, burn fat, transform your body.', es: 'Despierta al titán interior. Construye fuerza, quema grasa, transforma tu cuerpo.' },
  'onboarding.gender': { pt: 'QUAL É SEU GÊNERO?', en: "WHAT'S YOUR GENDER?", es: '¿CUÁL ES TU GÉNERO?' },
  'onboarding.male': { pt: 'MASCULINO', en: 'MALE', es: 'MASCULINO' },
  'onboarding.female': { pt: 'FEMININO', en: 'FEMALE', es: 'FEMENINO' },
  'onboarding.age': { pt: 'QUAL É SUA IDADE?', en: 'HOW OLD ARE YOU?', es: '¿CUÁNTOS AÑOS TIENES?' },
  'onboarding.heightQ': { pt: 'SUA ALTURA (CM)', en: 'YOUR HEIGHT (CM)', es: 'TU ALTURA (CM)' },
  'onboarding.weightQ': { pt: 'SEU PESO (KG)', en: 'YOUR WEIGHT (KG)', es: 'TU PESO (KG)' },
  'onboarding.levelQ': { pt: 'NÍVEL DE TREINO', en: 'TRAINING LEVEL', es: 'NIVEL DE ENTRENO' },
  'onboarding.beginner': { pt: 'INICIANTE', en: 'BEGINNER', es: 'PRINCIPIANTE' },
  'onboarding.beginnerDesc': { pt: 'Novo no treino ou menos de 6 meses', en: 'New to training or less than 6 months', es: 'Nuevo en el entreno o menos de 6 meses' },
  'onboarding.intermediate': { pt: 'INTERMEDIÁRIO', en: 'INTERMEDIATE', es: 'INTERMEDIO' },
  'onboarding.intermediateDesc': { pt: '6 meses a 2 anos de treino consistente', en: '6 months to 2 years of consistent training', es: '6 meses a 2 años de entreno constante' },
  'onboarding.advanced': { pt: 'AVANÇADO', en: 'ADVANCED', es: 'AVANZADO' },
  'onboarding.advancedDesc': { pt: '2+ anos de treino sério', en: '2+ years of serious training', es: '2+ años de entreno serio' },
  'onboarding.goalQ': { pt: 'SEU OBJETIVO', en: 'YOUR GOAL', es: 'TU OBJETIVO' },
  'onboarding.fatLoss': { pt: '🔥 PERDA DE GORDURA', en: '🔥 FAT LOSS', es: '🔥 PÉRDIDA DE GRASA' },
  'onboarding.fatLossDesc': { pt: 'Queimar gordura, ficar magro e definido', en: 'Burn fat, get lean and defined', es: 'Quemar grasa, definirse' },
  'onboarding.hypertrophy': { pt: '💪 HIPERTROFIA', en: '💪 HYPERTROPHY', es: '💪 HIPERTROFIA' },
  'onboarding.hypertrophyDesc': { pt: 'Construir o máximo de massa muscular', en: 'Build maximum muscle mass', es: 'Construir masa muscular máxima' },
  'onboarding.strength': { pt: '🏋️ FORÇA', en: '🏋️ STRENGTH', es: '🏋️ FUERZA' },
  'onboarding.strengthDesc': { pt: 'Ficar mais forte, levantar mais peso', en: 'Get stronger, lift heavier', es: 'Ser más fuerte, levantar más' },
  'onboarding.conditioning': { pt: '⚡ CONDICIONAMENTO', en: '⚡ CONDITIONING', es: '⚡ ACONDICIONAMIENTO' },
  'onboarding.conditioningDesc': { pt: 'Melhorar resistência e condição física', en: 'Improve endurance and fitness', es: 'Mejorar resistencia y condición' },
  'onboarding.transformation': { pt: '🔄 TRANSFORMAÇÃO', en: '🔄 TRANSFORMATION', es: '🔄 TRANSFORMACIÓN' },
  'onboarding.transformationDesc': { pt: 'Transformação corporal completa', en: 'Complete body transformation', es: 'Transformación corporal completa' },
  'onboarding.bodyTypeQ': { pt: 'TIPO CORPORAL', en: 'BODY TYPE', es: 'TIPO CORPORAL' },
  'onboarding.ectomorph': { pt: 'ECTOMORFO', en: 'ECTOMORPH', es: 'ECTOMORFO' },
  'onboarding.ectomorphDesc': { pt: 'Magro, membros longos, metabolismo rápido', en: 'Lean, long limbs, fast metabolism', es: 'Delgado, extremidades largas, metabolismo rápido' },
  'onboarding.mesomorph': { pt: 'MESOMORFO', en: 'MESOMORPH', es: 'MESOMORFO' },
  'onboarding.mesomorphDesc': { pt: 'Atlético, ganha músculo facilmente', en: 'Athletic build, gains muscle easily', es: 'Atlético, gana músculo fácilmente' },
  'onboarding.endomorph': { pt: 'ENDOMORFO', en: 'ENDOMORPH', es: 'ENDOMORFO' },
  'onboarding.endomorphDesc': { pt: 'Estrutura larga, ganha peso facilmente', en: 'Wider frame, gains weight easily', es: 'Estructura ancha, gana peso fácilmente' },
  'onboarding.nameQ': { pt: 'QUAL É SEU NOME?', en: "WHAT'S YOUR NAME?", es: '¿CUÁL ES TU NOMBRE?' },
  'onboarding.nameSubtitle': { pt: 'Vamos tornar isso pessoal, Titã.', en: "Let's make this personal, Titan.", es: 'Hagámoslo personal, Titán.' },
  'onboarding.namePlaceholder': { pt: 'Seu nome', en: 'Your name', es: 'Tu nombre' },

  // Goals translated
  'goal.fat_loss': { pt: 'Perda de Gordura', en: 'Fat Loss', es: 'Pérdida de Grasa' },
  'goal.hypertrophy': { pt: 'Hipertrofia', en: 'Hypertrophy', es: 'Hipertrofia' },
  'goal.strength': { pt: 'Força', en: 'Strength', es: 'Fuerza' },
  'goal.conditioning': { pt: 'Condicionamento', en: 'Conditioning', es: 'Acondicionamiento' },
  'goal.transformation': { pt: 'Transformação', en: 'Transformation', es: 'Transformación' },

  // Common
  'common.min': { pt: 'min', en: 'min', es: 'min' },
  'common.cal': { pt: 'cal', en: 'cal', es: 'cal' },
  'common.finished': { pt: 'finalizado', en: 'finished', es: 'finalizado' },
  'common.caloriesBurned': { pt: 'calorias queimadas', en: 'calories burned', es: 'calorías quemadas' },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'pt',
  setLang: () => {},
  t: (key) => key,
});

const LANG_KEY = 'titan_language';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANG_KEY);
    return (saved as Language) || 'pt';
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry['en'] || key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
