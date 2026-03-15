import { motion } from 'framer-motion';
import { Apple, Droplets, Wheat, Flame as FlameIcon } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { generateMealPlan } from '@/lib/nutrition';

interface NutritionScreenProps {
  profile: UserProfile;
}

export default function NutritionScreen({ profile }: NutritionScreenProps) {
  const plan = generateMealPlan(profile);

  const macroItems = [
    { label: 'Calories', value: plan.calories, unit: 'kcal', icon: FlameIcon, color: 'text-primary' },
    { label: 'Protein', value: plan.protein, unit: 'g', icon: Droplets, color: 'text-accent' },
    { label: 'Carbs', value: plan.carbs, unit: 'g', icon: Wheat, color: 'text-warning' },
    { label: 'Fats', value: plan.fats, unit: 'g', icon: Apple, color: 'text-muted-foreground' },
  ];

  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-4xl font-display mb-2">NUTRITION</h1>
      <p className="text-sm text-muted-foreground mb-6">Personalized for your {profile.goal.replace('_', ' ')} goal</p>

      {/* Macros Overview */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {macroItems.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-lg border border-border p-3 text-center"
          >
            <m.icon className={`mx-auto mb-1 ${m.color}`} size={18} />
            <div className="text-lg font-display">{m.value}</div>
            <div className="text-[9px] text-muted-foreground uppercase">{m.unit}</div>
            <div className="text-[9px] text-muted-foreground">{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Meal Plan */}
      <h3 className="text-xl font-display mb-3 text-muted-foreground">DAILY MEAL PLAN</h3>
      <div className="space-y-3">
        {plan.meals.map((meal, i) => (
          <motion.div
            key={meal.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="bg-card rounded-lg border border-border p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-display text-lg">{meal.name.toUpperCase()}</h4>
                <span className="text-xs text-muted-foreground">{meal.time}</span>
              </div>
              <span className="text-sm font-display text-accent">{meal.calories} cal</span>
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground mb-3">
              <span>P: {meal.protein}g</span>
              <span>C: {meal.carbs}g</span>
              <span>F: {meal.fats}g</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {meal.foods.map(food => (
                <span key={food} className="text-xs px-2 py-0.5 bg-secondary rounded text-foreground">{food}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
