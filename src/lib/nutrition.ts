import { MealPlan, UserProfile } from './types';

export function generateMealPlan(profile: UserProfile): MealPlan {
  const bmr = profile.gender === 'male'
    ? 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5
    : 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;

  const activityMultiplier = profile.level === 'beginner' ? 1.4 : profile.level === 'intermediate' ? 1.6 : 1.8;
  let tdee = Math.round(bmr * activityMultiplier);

  if (profile.goal === 'fat_loss') tdee -= 500;
  else if (profile.goal === 'hypertrophy') tdee += 300;
  else if (profile.goal === 'strength') tdee += 400;

  let proteinRatio = 0.3, carbRatio = 0.4, fatRatio = 0.3;
  if (profile.bodyType === 'ectomorph') { carbRatio = 0.5; fatRatio = 0.2; }
  else if (profile.bodyType === 'endomorph') { carbRatio = 0.3; fatRatio = 0.35; proteinRatio = 0.35; }

  const protein = Math.round((tdee * proteinRatio) / 4);
  const carbs = Math.round((tdee * carbRatio) / 4);
  const fats = Math.round((tdee * fatRatio) / 9);

  const meals = [
    {
      nameKey: 'meal.breakfast',
      time: '7:00',
      calories: Math.round(tdee * 0.25),
      protein: Math.round(protein * 0.25),
      carbs: Math.round(carbs * 0.3),
      fats: Math.round(fats * 0.25),
      foodKeys: ['food.oatsBanana', 'food.scrambledEggs', 'food.orangeJuice'],
    },
    {
      nameKey: 'meal.morningSnack',
      time: '10:00',
      calories: Math.round(tdee * 0.1),
      protein: Math.round(protein * 0.1),
      carbs: Math.round(carbs * 0.1),
      fats: Math.round(fats * 0.1),
      foodKeys: ['food.greekYogurt', 'food.mixedNuts', 'food.apple'],
    },
    {
      nameKey: 'meal.lunch',
      time: '13:00',
      calories: Math.round(tdee * 0.3),
      protein: Math.round(protein * 0.3),
      carbs: Math.round(carbs * 0.3),
      fats: Math.round(fats * 0.3),
      foodKeys: ['food.grilledChicken', 'food.brownRice', 'food.mixedVegetables', 'food.oliveOil'],
    },
    {
      nameKey: 'meal.preWorkout',
      time: '16:00',
      calories: Math.round(tdee * 0.1),
      protein: Math.round(protein * 0.1),
      carbs: Math.round(carbs * 0.15),
      fats: Math.round(fats * 0.05),
      foodKeys: ['food.banana', 'food.wheyShake', 'food.riceCake'],
    },
    {
      nameKey: 'meal.dinner',
      time: '19:00',
      calories: Math.round(tdee * 0.25),
      protein: Math.round(protein * 0.25),
      carbs: Math.round(carbs * 0.15),
      fats: Math.round(fats * 0.3),
      foodKeys: ['food.salmon', 'food.sweetPotato', 'food.broccoli', 'food.avocado'],
    },
  ];

  return { calories: tdee, protein, carbs, fats, meals };
}
