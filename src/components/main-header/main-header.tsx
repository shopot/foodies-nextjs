import { type JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import logoImage from '@/assets/logo.png';

import styles from './main-header.module.css';
import { MainHeaderBackground } from './main-header-background';
import { NavLink } from './nav-link';

export const MainHeader = (): JSX.Element => {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link href='/' className={styles.logo}>
          <Image src={logoImage} alt='A plate with food on it' />
          NextLevel Food
        </Link>
        <NavLink />
      </header>
    </>
  );
};
