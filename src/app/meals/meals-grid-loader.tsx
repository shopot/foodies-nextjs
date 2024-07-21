import { type JSX } from 'react';

import { MealsGrid } from '@/components/meals';
import { mealService } from '@/services';

export const MealsGridLoader = async (): Promise<JSX.Element> => {
  const meals = await mealService.getMealList();

  return <MealsGrid meals={meals} />;
};
