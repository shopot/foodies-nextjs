'use server';

import fs from 'node:fs';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { MealModel } from '@/model';
import { createSlug, filterXSS } from '@/utils';
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from '@/config';

// import Ajv, { JSONSchemaType } from 'ajv';

// type MealFormData = {
//   title: string;
//   summary: string;
//   instructions: string;
//   creator: string;
//   creator_email: string;
// };

// const isImageValid = (image: File | null): boolean => {
//   if (!image) {
//     return false;
//   }

//   return image.type.startsWith('image') && image.size > 0;
// };

const FormDataSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  instructions: z.string().min(1),
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
  creator: z.string().min(1),
  creator_email: z.string().email(),
});

// const validate = (data: Record<string, FormDataEntryValue | null>): data is MealFormData => {
//   const schema: JSONSchemaType<MealFormData> = {
//     type: 'object',
//     properties: {
//       title: { type: 'string', allOf: [{ not: { type: 'string', maxLength: 0 } }] },
//       summary: { type: 'string', allOf: [{ not: { type: 'string', maxLength: 0 } }] },
//       instructions: { type: 'string', allOf: [{ not: { type: 'string', maxLength: 0 } }] },
//       creator: { type: 'string', allOf: [{ not: { type: 'string', maxLength: 0 } }] },
//       creator_email: { type: 'string', format: 'email' },
//     },
//     required: ['title', 'summary', 'instructions', 'creator', 'creator_email'],
//   };

//   const ajv = new Ajv();

//   const validate = ajv.compile(schema);

//   return validate(data);
// };

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

export const shareMeal = async (formatData: FormData) => {
  const data = {
    title: formatData.get('title'),
    summary: formatData.get('summary'),
    instructions: formatData.get('instructions'),
    image: formatData.get('image'),
    creator: formatData.get('name'),
    creator_email: formatData.get('email'),
  };

  const meal = FormDataSchema.parse(data);

  // if (validate(meal) === false || isImageValid(meal.image as File) === false) {
  //   throw new Error('Invalid input!');
  // }

  const slug = createSlug(meal.title);

  const instructions = filterXSS(meal.instructions);

  const filename = await uploadImage(slug, meal.image as File);

  const newMeal = {
    ...meal,
    slug,
    instructions,
    image: `images/${filename}`,
  };

  await MealModel.saveMeal(newMeal);

  redirect('/meals');
};
