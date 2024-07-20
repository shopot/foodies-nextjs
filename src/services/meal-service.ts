import { db } from '@/database';

export const mealService = {
  getMeals: async <T>(): Promise<T[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // throw new Error('Loading meals failed.');

    return db.prepare<T[], T>('SELECT * FROM meals').all();
  },

  getMeal: async <T>(slug: string): Promise<T | undefined> => {
    return db.prepare<string, T>('SELECT * FROM meals WHERE slug = ?').get(slug);
  },
};
