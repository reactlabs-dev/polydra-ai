import React, { useState } from 'react';
import { Button } from 'primereact/button';
import styles from './CompositeScoreDisplay.module.scss';
import QuestionnaireDialog from '../questionnaire/QuestionnaireDialog';

interface AssessmentResult {
  sectionName: string;
  score: number;
  maxScore: number;
  answers: { questionId: string; questionText: string; selectedAnswer: string; pointsEarned: number; maxPoints: number }[];
  completedAt: Date;
}

/* eslint-disable-next-line */
export interface CompositeScoreDisplayProps {
  score: number;
  onQuestionnaireScoreUpdate?: (sectionIndex: number, score: number) => void;
}

const CompositeScoreDisplay: React.FC<CompositeScoreDisplayProps> = ({ score, onQuestionnaireScoreUpdate }) => {
  const [open, setOpen] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);

  const handleAssessmentComplete = (results: AssessmentResult[]) => {
    setAssessmentResults(results);
    setIsAssessmentComplete(true);
  };

  const generateQuickReport = () => {
    if (!isAssessmentComplete) return;
    
    const totalScore = assessmentResults.reduce((sum, result) => sum + result.score, 0);
    const maxTotalScore = assessmentResults.length * 25;
    const overallPercentage = (totalScore / maxTotalScore) * 100;
    
    let maturityLevel = 'Developing';
    if (overallPercentage >= 80) maturityLevel = 'Expert';
    else if (overallPercentage >= 65) maturityLevel = 'Advanced';
    else if (overallPercentage >= 45) maturityLevel = 'Intermediate';
    else if (overallPercentage >= 25) maturityLevel = 'Basic';

    const quickReport = `# PolydraIQ™ Assessment Summary

**Overall Score:** ${totalScore.toFixed(1)} / ${maxTotalScore} (${overallPercentage.toFixed(1)}%)
**Maturity Level:** ${maturityLevel}
**Completed:** ${new Date().toLocaleDateString()}

${assessmentResults.map(result => `
**${result.sectionName}:** ${result.score.toFixed(1)}/25 (${((result.score / 25) * 100).toFixed(1)}%)`).join('')}

*Complete assessment details available in the Guided Assessment dialog.*`;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>PolydraIQ Assessment Summary</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 40px auto; padding: 20px; }
              h1 { color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px; }
              strong { color: #1f2937; }
              @media print { body { margin: 0; padding: 15px; } }
            </style>
          </head>
          <body>
            <pre style="white-space: pre-wrap; font-family: inherit;">${quickReport.replace(/\\*/g, '').replace(/#/g, '')}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="composite-score">
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
          label="Quick Report"
          outlined={!isAssessmentComplete}
          severity={isAssessmentComplete ? "success" : "secondary"}
          disabled={!isAssessmentComplete}
          onClick={generateQuickReport}
          tooltip={isAssessmentComplete ? "Generate printable summary" : "Complete the Guided Assessment first"}
          style={{ 
            opacity: isAssessmentComplete ? 1 : 0.7,
            borderWidth: isAssessmentComplete ? '2px' : '1px'
          }}
        />
      </div>
      <h2>Composite Quality Score: {score.toFixed(2)}</h2>
      {isAssessmentComplete && (
        <div style={{ color: '#059669', fontSize: '14px', fontWeight: '500' }}>
          ✅ Assessment Completed - Detailed report available in Guided Assessment
        </div>
      )}
      <QuestionnaireDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        onScoreUpdate={onQuestionnaireScoreUpdate}
        onAssessmentComplete={handleAssessmentComplete}
      />
    </div>
  );
}

export default CompositeScoreDisplay;
