import React from 'react';
import styles from './MainMenu.module.scss';
import { Button } from 'primereact/button';

/* eslint-disable-next-line */
export interface MainMenuProps {
  onMenuClick: (index: number) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onMenuClick }) => {
  return (
    <div className={styles['mainMenu']}>
      <Button rounded label="About" style={{ backgroundColor: '#344D38', marginRight: '8px' }} onClick={() => onMenuClick(0)} />
      <Button rounded label="Credits" style={{ backgroundColor: '#4C628D', marginRight: '8px' }} onClick={() => onMenuClick(1)} />
      <Button rounded label="Legal" style={{ backgroundColor: '#6EA8D9' }} onClick={() => onMenuClick(2)} />
  </div>
  );
}

export default MainMenu;
