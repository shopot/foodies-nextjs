import { Meal, MealModel } from '@/model';

export const getMeal = (slug: string): Promise<Meal | undefined> => {
  return MealModel.getMeal(slug);
};
