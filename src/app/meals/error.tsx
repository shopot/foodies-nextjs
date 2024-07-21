'use client';

import { type JSX } from 'react';

const Error = (): JSX.Element => {
  return (
    <main className='error'>
      <h1>An error occurred!</h1>
      <p>Failed fetch meals data. Please try again later.</p>
    </main>
  );
};

export default Error;
