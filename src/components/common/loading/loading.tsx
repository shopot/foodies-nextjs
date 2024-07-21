import { type JSX } from 'react';

import styles from './loading.module.css';

type SuspenseFallbackProps = {
  text: string;
};

export const Loading = ({ text }: SuspenseFallbackProps): JSX.Element => {
  return <p className={styles.loading}>{text}</p>;
};
