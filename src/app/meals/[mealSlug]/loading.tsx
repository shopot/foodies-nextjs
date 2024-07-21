import { type JSX } from 'react';

import { Loading } from '@/components/common';

const MealDetailsLoadingPage = (): JSX.Element => {
  return <Loading text='Fetching meal...' />;
};

export default MealDetailsLoadingPage;
