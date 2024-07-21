import { type JSX } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { mealService } from '@/services';

import styles from './page.module.css';

type MealDetailsPageProps = {
  params: {
    mealSlug: string;
  };
};

const MealDetailsPage = async ({ params: { mealSlug } }: MealDetailsPageProps): Promise<JSX.Element> => {
  const meal = await mealService.getMeal(mealSlug);

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
