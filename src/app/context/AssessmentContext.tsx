import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AssessmentResult, printAssessmentReport } from '../components/questionnaire/assessmentPrint';

interface AssessmentContextValue {
  assessmentResults: AssessmentResult[];
  /** Replace the entire result set (e.g., after completing or recomputing the assessment). */
  setAssessmentResults: (results: AssessmentResult[]) => void;
  /** Whether the guided assessment has been fully completed. */
  isAssessmentComplete: boolean;
  /** Mark the assessment as complete or incomplete. */
  setAssessmentComplete: (complete: boolean) => void;
  /** Clear results and completion state (for a fresh run). */
  resetAssessment: () => void;
  /** Invoke the shared print helper for the current results. */
  printReport: () => void;
}

const AssessmentContext = createContext<AssessmentContextValue | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assessmentResults, setAssessmentResultsState] = useState<AssessmentResult[]>([]);
  const [isAssessmentComplete, setAssessmentComplete] = useState(false);

  const setAssessmentResults = (results: AssessmentResult[]) => {
    setAssessmentResultsState(results);
  };

  const resetAssessment = () => {
    setAssessmentResultsState([]);
    setAssessmentComplete(false);
  };

  const printReport = () => {
    if (!assessmentResults.length) {
      window.alert('To generate a full report, please complete the Guided Assessment first.');
      return;
    }
    printAssessmentReport(assessmentResults);
  };

  return (
    <AssessmentContext.Provider
      value={{
        assessmentResults,
        setAssessmentResults,
        isAssessmentComplete,
        setAssessmentComplete,
        resetAssessment,
        printReport,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessmentContext = (): AssessmentContextValue => {
  const ctx = useContext(AssessmentContext);
  if (!ctx) {
    throw new Error('useAssessmentContext must be used within an AssessmentProvider');
  }
  return ctx;
};
