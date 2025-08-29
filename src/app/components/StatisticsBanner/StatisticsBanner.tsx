import React, { useState } from 'react';
import styles from './StatisticsBanner.module.scss';
import { Button } from 'primereact/button';

/* eslint-disable-next-line */
export interface StatisticsBannerProps {
  facts: string[];
}

const StatisticsBanner: React.FC<StatisticsBannerProps> = ({ facts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousFact = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? facts.length - 1 : prevIndex - 1));
  };

  const nextFact = () => {
    setCurrentIndex((prevIndex) => (prevIndex === facts.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles['statistics']}>
      <div className={styles['statistics-banner']}>
        <Button rounded text icon="pi pi-angle-left" className={`${styles["left-button"]} p-button-rounded p-button-text`} onClick={previousFact} />
        <div className={styles['statistics-banner-content']}>
          <h4>Did you know?</h4>
          <div className={styles['statistics-text']}>
            <p>{facts[currentIndex]}</p>
          </div>
        </div>
        <Button rounded text icon="pi pi-angle-right" className={`${styles["right-button"]} p-button-rounded p-button-text`} onClick={nextFact} />
      </div>
    </div>
  );
}

export default StatisticsBanner;
