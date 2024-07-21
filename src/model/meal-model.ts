import { RunResult } from 'better-sqlite3';

import { db } from '@/database';

export type Meal = {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export type CreateMealDto = Omit<Meal, 'id'>;

export class MealModel {
  constructor() {
    throw new Error('Cannot create an instance of MealModel');
  }

  static async getMealList(): Promise<Meal[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // throw new Error('Loading meals failed.');

    return db.prepare<Meal[], Meal>('SELECT * FROM meals').all();
  }

  static async getMeal(slug: string): Promise<Meal | undefined> {
    return db.prepare<string, Meal>('SELECT * FROM meals WHERE slug = ?').get(slug);
  }

  static async saveMeal(createMealDto: CreateMealDto): Promise<RunResult> {
    return db
      .prepare<CreateMealDto[], CreateMealDto>(
        `INSERT INTO meals VALUES (
          @slug,
          @title,
          @image,
          @summary,
          @instructions,
          @creator,
          @creator_email
        )`,
      )
      .run(createMealDto);
  }
}
