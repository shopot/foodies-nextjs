import { type JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import logoImage from '@/assets/logo.png';

import styles from './main-header.module.css';
import { MainHeaderBackground } from './main-header-background';

export const MainHeader = (): JSX.Element => {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link href='/' className={styles.logo}>
          <Image src={logoImage} alt='A plate with food on it' />
          NextLevel Food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href='/meals'>Browse Meals</Link>
            </li>
            <li>
              <Link href='/community'>Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
