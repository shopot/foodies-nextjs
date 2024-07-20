import { type JSX } from 'react';

import { MealItem } from './meal-item';
import styles from './meals-grid.module.css';
import { Meal } from './types';

type MealsGridProps = {
  meals: Meal[];
};

export const MealsGrid = ({ meals }: MealsGridProps): JSX.Element => {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};
