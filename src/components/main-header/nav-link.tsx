'use client';

import { type JSX } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import styles from './nav-link.module.css';

const mainMenu = [
  { text: 'Browse Meals', href: '/meals' },
  { text: 'Foodies Community', href: '/community' },
];

export const NavLink = (): JSX.Element => {
  const path = usePathname();

  const mainMenuList = mainMenu.map((item) => (
    <li key={item.text}>
      <Link href={item.href} className={path.startsWith(item.href) ? styles.active : undefined}>
        {item.text}
      </Link>
    </li>
  ));

  return (
    <nav className={styles.nav}>
      <ul>{mainMenuList}</ul>
    </nav>
  );
};
