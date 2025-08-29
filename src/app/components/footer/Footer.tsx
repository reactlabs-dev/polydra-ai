import React from 'react';
import styles from './Footer.module.scss';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <div className={styles['footer']}>
      Copyright &copy; 2025, AIDAQInsights™. All rights reserved.
    </div>
  );
}

export default Footer;
