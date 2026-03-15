import { MealPlan, UserProfile } from './types';

export function generateMealPlan(profile: UserProfile): MealPlan {
  const bmr = profile.gender === 'male'
    ? 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5
    : 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;

  const activityMultiplier = profile.level === 'beginner' ? 1.4 : profile.level === 'intermediate' ? 1.6 : 1.8;
  let tdee = Math.round(bmr * activityMultiplier);

  // Adjust for goal
  if (profile.goal === 'fat_loss') tdee -= 500;
  else if (profile.goal === 'hypertrophy') tdee += 300;
  else if (profile.goal === 'strength') tdee += 400;

  // Adjust for body type
  let proteinRatio = 0.3, carbRatio = 0.4, fatRatio = 0.3;
  if (profile.bodyType === 'ectomorph') { carbRatio = 0.5; fatRatio = 0.2; }
  else if (profile.bodyType === 'endomorph') { carbRatio = 0.3; fatRatio = 0.35; proteinRatio = 0.35; }

  const protein = Math.round((tdee * proteinRatio) / 4);
  const carbs = Math.round((tdee * carbRatio) / 4);
  const fats = Math.round((tdee * fatRatio) / 9);

  const meals = [
    {
      name: 'Breakfast',
      time: '7:00 AM',
      calories: Math.round(tdee * 0.25),
      protein: Math.round(protein * 0.25),
      carbs: Math.round(carbs * 0.3),
      fats: Math.round(fats * 0.25),
      foods: ['Oats with banana', 'Scrambled eggs (3)', 'Orange juice'],
    },
    {
      name: 'Mid-Morning Snack',
      time: '10:00 AM',
      calories: Math.round(tdee * 0.1),
      protein: Math.round(protein * 0.1),
      carbs: Math.round(carbs * 0.1),
      fats: Math.round(fats * 0.1),
      foods: ['Greek yogurt', 'Mixed nuts (30g)', 'Apple'],
    },
    {
      name: 'Lunch',
      time: '1:00 PM',
      calories: Math.round(tdee * 0.3),
      protein: Math.round(protein * 0.3),
      carbs: Math.round(carbs * 0.3),
      fats: Math.round(fats * 0.3),
      foods: ['Grilled chicken breast (200g)', 'Brown rice (150g)', 'Mixed vegetables', 'Olive oil drizzle'],
    },
    {
      name: 'Pre-Workout',
      time: '4:00 PM',
      calories: Math.round(tdee * 0.1),
      protein: Math.round(protein * 0.1),
      carbs: Math.round(carbs * 0.15),
      fats: Math.round(fats * 0.05),
      foods: ['Banana', 'Whey protein shake', 'Rice cake'],
    },
    {
      name: 'Dinner',
      time: '7:00 PM',
      calories: Math.round(tdee * 0.25),
      protein: Math.round(protein * 0.25),
      carbs: Math.round(carbs * 0.15),
      fats: Math.round(fats * 0.3),
      foods: ['Salmon fillet (200g)', 'Sweet potato (150g)', 'Steamed broccoli', 'Avocado (half)'],
    },
  ];

  return { calories: tdee, protein, carbs, fats, meals };
}
