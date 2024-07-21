import { type JSX, Suspense } from 'react';
import Link from 'next/link';

import { Loading } from '@/components/common';

import styles from './page.module.css';
import { MealsGridLoader } from './meals-grid-loader';

const MealsPage = async (): Promise<JSX.Element> => {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created <span className={styles.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
        <p className={styles.cta}>
          <Link href='/meals/share'>Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<Loading text='Fetching meals...' />}>
          <MealsGridLoader />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
