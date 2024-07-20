import { type JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logoImage from '@/assets/logo.png';

import { MainHeaderBackground } from './main-header-background';
import styles from './main-header.module.css';
import { NavMenu } from './nav-menu';

const headerMenu = [
  { text: 'Browse Meals', href: '/meals' },
  { text: 'Foodies Community', href: '/community' },
];

export const MainHeader = (): JSX.Element => {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link href='/' className={styles.logo}>
          <Image src={logoImage} alt='A plate with food on it' />
          NextLevel Food
        </Link>
        <NavMenu menu={headerMenu} />
      </header>
    </>
  );
};
