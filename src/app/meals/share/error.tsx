'use client';

import { type JSX } from 'react';

const ErrorShareMealsPage = (): JSX.Element => {
  return (
    <main className='error'>
      <h1>An error occurred!</h1>
      <p>Failed to create meal.</p>
    </main>
  );
};

export default ErrorShareMealsPage;
