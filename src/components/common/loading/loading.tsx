import { type JSX } from 'react';

import styles from './loading.module.css';

type LoadingProps = {
  text: string;
};

export const Loading = ({ text }: LoadingProps): JSX.Element => {
  return <p className={styles.loading}>{text}</p>;
};
