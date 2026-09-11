import chest from '@/assets/muscles/chest.jpg';
import back from '@/assets/muscles/back.jpg';
import abs from '@/assets/muscles/abs.jpg';
import shoulders from '@/assets/muscles/shoulders.jpg';
import legs from '@/assets/muscles/legs.jpg';
import fullbody from '@/assets/muscles/fullbody.jpg';

const map: Record<string, string> = {
  Chest: chest,
  Back: back,
  Abs: abs,
  Core: abs,
  Shoulders: shoulders,
  Arms: shoulders,
  Legs: legs,
  Glutes: legs,
  'Full Body': fullbody,
};

/** Anatomy image highlighting the muscles a given muscle group works. */
export const getMuscleImage = (muscleGroup: string) => map[muscleGroup] ?? fullbody;
