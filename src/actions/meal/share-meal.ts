'use server';

import fs from 'node:fs';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { MealModel } from '@/model';
import { createSlug, filterXSS } from '@/utils';
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from '@/config';

const FormDataSchema = z.object({
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  instructions: z.string().trim().min(1),
  image: z
    .instanceof(File)
    .refine((file) => {
      return file !== null;
    }, 'File must not be empty')
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'File must be a PNG, JPEG or WEBP'),
  creator: z.string().trim().min(1),
  creator_email: z.string().trim().email(),
});

const uploadImage = async (slug: string, image: File | null) => {
  if (!image) {
    throw new Error('No image selected!');
  }

  const extension = image.name.split('.').pop();

  const filename = `${slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);

  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error('Failed to save image!');
    }
  });

  stream.end();

  return filename;
};

export const shareMeal = async (_: unknown, formatData: FormData) => {
  const data = {
    title: formatData.get('title'),
    summary: formatData.get('summary'),
    instructions: formatData.get('instructions'),
    image: formatData.get('image'),
    creator: formatData.get('name'),
    creator_email: formatData.get('email'),
  };

  try {
    const meal = FormDataSchema.parse(data);

    const slug = createSlug(meal.title);

    const instructions = filterXSS(meal.instructions);

    const filename = await uploadImage(slug, meal.image as File);

    const newMeal = {
      ...meal,
      slug,
      instructions,
      image: `/images/${filename}`,
    };

    await MealModel.saveMeal(newMeal);

    redirect('/meals');
  } catch (err) {
    return {
      message: (err as Error).message || 'Invalid input!',
    };
  }
};
