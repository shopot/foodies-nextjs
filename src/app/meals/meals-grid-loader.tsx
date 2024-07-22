import { type JSX } from 'react';

import { MealsGrid } from '@/components/meals';
import { getMealList } from '@/actions/meal/get-meal-list';

export const MealsGridLoader = async (): Promise<JSX.Element> => {
  const meals = await getMealList();

  return <MealsGrid meals={meals} />;
};
