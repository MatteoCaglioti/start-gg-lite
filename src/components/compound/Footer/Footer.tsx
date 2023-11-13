import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.Footer}>
    <p className={styles.text}>Copyright &copy; 2023 Matteo Caglioti.</p>
  </footer>
);

Footer.displayName = 'Footer';

export default Footer;
