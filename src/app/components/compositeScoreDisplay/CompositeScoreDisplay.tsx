import React, { useState } from 'react';
import { Button } from 'primereact/button';
import styles from './CompositeScoreDisplay.module.scss';
import QuestionnaireDialog from '../questionnaire/QuestionnaireDialog';

/* eslint-disable-next-line */
export interface CompositeScoreDisplayProps {
  score: number;
  onQuestionnaireScoreUpdate?: (sectionIndex: number, score: number) => void;
}

const CompositeScoreDisplay: React.FC<CompositeScoreDisplayProps> = ({ score, onQuestionnaireScoreUpdate }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="composite-score">
      <Button icon="pi pi-compass" size="small" rounded label="Guided Assessment" className={styles['questionnaire']} onClick={() => setOpen(true)} />
      <h2>Composite Quality Score: {score.toFixed(2)}</h2>
      <QuestionnaireDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        onScoreUpdate={onQuestionnaireScoreUpdate}
      />
    </div>
  );
}

export default CompositeScoreDisplay;
