'use client';

import { type JSX } from 'react';
import { useFormStatus } from 'react-dom';

export const MealsFromSubmit = (): JSX.Element => {
  const { pending } = useFormStatus();

  console.log(pending);

  return (
    <button type='submit' disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
};
