'use client';

import { type JSX, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './nav-link.module.css';

type NavLinkProps = {
  href: string;
} & PropsWithChildren<JSX.IntrinsicElements['a']>;

export const NavLink = ({ href, children, ...rest }: NavLinkProps): JSX.Element => {
  const path = usePathname();

  return (
    <li>
      <Link href={href} className={path.startsWith(href) ? styles.active : undefined} {...rest}>
        {children}
      </Link>
    </li>
  );
};
