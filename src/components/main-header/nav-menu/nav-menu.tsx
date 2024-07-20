import { type JSX } from 'react';

import styles from './nav-menu.module.css';
import { NavLink } from './nav-link';

type NavMenuProps = {
  menu: { text: string; href: string }[];
};

export const NavMenu = ({ menu }: NavMenuProps): JSX.Element => {
  const mainMenuList = menu.map(({ href, text }) => (
    <NavLink key={text} href={href}>
      {text}
    </NavLink>
  ));

  return (
    <nav className={styles.nav}>
      <ul>{mainMenuList}</ul>
    </nav>
  );
};
