import { type JSX } from 'react';

const NotFound = (): JSX.Element => {
  return (
    <div className='not-found'>
      <h1>Meal not found</h1>
      <p>Unfortunately, we could not find the requested page or meal data.</p>
    </div>
  );
};

export default NotFound;
