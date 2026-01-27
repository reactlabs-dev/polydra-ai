import React, { useState } from 'react';
import { Button } from 'primereact/button';
import styles from './CompositeScoreDisplay.module.scss';
import QuestionnaireDialog from '../questionnaire/QuestionnaireDialog';
import { useAssessmentContext } from '../../context/AssessmentContext';

export interface CompositeScoreDisplayProps {
  score: number;
  onQuestionnaireScoreUpdate?: (sectionIndex: number, score: number) => void;
  onAssessmentReset?: () => void;
  'data-testid'?: string;
}

const CompositeScoreDisplay: React.FC<CompositeScoreDisplayProps> = ({
  score,
  onQuestionnaireScoreUpdate,
  onAssessmentReset,
  'data-testid': testId,
}) => {
  const [open, setOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);
  const { isAssessmentComplete, printReport, resetAssessment } = useAssessmentContext();

  const handleResetAssessment = () => {
    resetAssessment();
    setDialogKey((k) => k + 1);
    setOpen(false);
    if (onAssessmentReset) {
      onAssessmentReset();
    }
  };

  return (
    <div className="composite-score" data-testid={testId}>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Button 
          icon="pi pi-compass" 
          size="small" 
          rounded 
          label="Guided Assessment" 
          className={styles['questionnaire']} 
          onClick={() => setOpen(true)} 
        />
        <Button
          icon="pi pi-file-pdf"
          size="small"
          rounded
          label="Print Report"
          outlined={!isAssessmentComplete}
          severity={isAssessmentComplete ? "success" : "secondary"}
          disabled={!isAssessmentComplete}
          onClick={printReport}
          tooltip={isAssessmentComplete ? "Print assessment report" : "Complete the Guided Assessment first"}
          style={{ 
            opacity: isAssessmentComplete ? 1 : 0.7,
            borderWidth: isAssessmentComplete ? '2px' : '1px'
          }}
        />
      </div>
      <h2>Composite Quality Score: {score.toFixed(2)}</h2>
      {isAssessmentComplete && (
        <div style={{ marginTop: '4px' }}>
          <div style={{ color: '#059669', fontSize: '14px', fontWeight: 500 }}>
            ✅ Assessment Completed - Detailed report available in Guided Assessment
          </div>
          <button
            type="button"
            onClick={handleResetAssessment}
            style={{
              marginTop: '4px',
              padding: 0,
              border: 'none',
              background: 'none',
              color: '#2563eb',
              fontSize: '12px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Start a new assessment
          </button>
        </div>
      )}
      <QuestionnaireDialog 
        key={dialogKey}
        open={open} 
        onClose={() => setOpen(false)} 
        onScoreUpdate={onQuestionnaireScoreUpdate}
      />
    </div>
  );
}

export default CompositeScoreDisplay;
