import { type JSX } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/actions/meal/get-meal';

import styles from './page.module.css';

type MealDetailsPageProps = {
  params: {
    mealSlug: string;
  };
};

export const generateMetadata = async ({
  params: { mealSlug },
}: MealDetailsPageProps): Promise<{
  title: string;
  description: string;
}> => {
  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title || 'Meal not found',
    description: meal.summary || '',
  };
};

const MealDetailsPage = async ({ params: { mealSlug } }: MealDetailsPageProps): Promise<JSX.Element> => {
  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  const { image, title, summary, instructions, creator, creator_email } = meal;

  const fixedInstructions = instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={styles.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: fixedInstructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailsPage;
