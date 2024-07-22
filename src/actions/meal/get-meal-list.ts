'use server';

import { Meal, MealModel } from '@/model';

export const getMealList = (): Promise<Meal[]> => {
  return MealModel.getMealList();
};
