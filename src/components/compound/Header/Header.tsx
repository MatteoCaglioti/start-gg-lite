import cx from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import SiteLogo from '../../../assets/imgs/ssg-lite-header-logo-invert.png';

export interface Props {
  className: string;
}

const headerLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Search',
    path: '/user',
  },
];

const Header: FC<Props> = ({ className }) => (
  <header className={cx(className, styles.header)}>
    <div className={styles.logoWrapper}>
      <img className={styles.logo} src={SiteLogo} alt="Start GG Lite Logo" />
    </div>
    <nav className={styles.navigation}>
      <ul className={styles.navigationWrapper}>
        {
          headerLinks.map((headerLink) => {
            const { name, path } = headerLink;
            return (
              <li key={name}>
                <Link className={styles.navigationLink} to={path}>
                  {name}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </nav>

  </header>
);

Header.displayName = 'Header';

export default Header;
