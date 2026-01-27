import React from 'react';
import styles from './MainMenu.module.scss';
import { Button } from 'primereact/button';

export interface MainMenuProps {
  onMenuClick: (index: number) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onMenuClick }) => {
  return (
    <div className={styles['mainMenu']}>
      <Button
        rounded
        label="Introduction"
        style={{ backgroundColor: 'var(--color-teal)', marginRight: '8px' }}
        onClick={() => onMenuClick(0)}
      />
      <Button
        rounded
        label="About"
        style={{ backgroundColor: 'var(--color-slate)', marginRight: '8px' }}
        onClick={() => onMenuClick(1)}
      />
      <Button
        rounded
        label="Credits"
        style={{ backgroundColor: 'var(--color-navy)', marginRight: '8px' }}
        onClick={() => onMenuClick(2)}
      />
      <Button
        rounded
        label="Legal"
        style={{ backgroundColor: 'var(--color-gold)' }}
        onClick={() => onMenuClick(3)}
      />
  </div>
  );
}

export default MainMenu;
