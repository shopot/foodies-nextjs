import { type JSX } from 'react';

const NotFound = (): JSX.Element => {
  return (
    <div className='not-found'>
      <h1>Not found</h1>
      <p>Unfortunately, we could not find the requested page or resource.</p>
    </div>
  );
};

export default NotFound;
