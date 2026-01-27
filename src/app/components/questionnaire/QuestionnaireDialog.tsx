import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { ProgressBar } from 'primereact/progressbar';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { AssessmentResult, getAssessmentSummary, printAssessmentReport } from './assessmentPrint';
import { useAssessmentContext } from '../../context/AssessmentContext';

const SECTIONS = [
  'Governance & Accountability',
  'Ethics & Responsible AI', 
  'Data Integrity & Security',
  'Model Quality & Technical Rigor',
  'Operationalization & Lifecycle Management',
  'Stakeholder & Societal Impact',
];

// Question structure with point values
interface Question {
  id: string;
  text: string;
  category: 'basic' | 'intermediate' | 'advanced' | 'expert';
  points: number;
  options: {
    text: string;
    score: number;
  }[];
}

interface QuestionSet {
  [key: string]: Question[];
}

// Comprehensive question sets for each facet
const QUESTION_SETS: QuestionSet = {
  'Governance & Accountability': [
    // Basic Level (1-2 points each)
    {
      id: 'gov_001',
      text: 'Does your organization have documented AI governance policies?',
      category: 'basic',
      points: 2,
      options: [
        { text: 'No formal policies exist', score: 0 },
        { text: 'Basic policies in development', score: 0.5 },
        { text: 'Documented policies exist', score: 1 },
        { text: 'Comprehensive, regularly updated policies', score: 2 }
      ]
    },
    {
      id: 'gov_002',
      text: 'Is there clear executive-level accountability for AI decisions?',
      category: 'basic',
      points: 2,
      options: [
        { text: 'No clear accountability structure', score: 0 },
        { text: 'Informal accountability', score: 0.5 },
        { text: 'Designated AI oversight roles', score: 1 },
        { text: 'C-level AI accountability with clear mandate', score: 2 }
      ]
    },
    // Intermediate Level (2-3 points each)
    {
      id: 'gov_003',
      text: 'How mature is your AI risk management framework?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No formal risk management', score: 0 },
        { text: 'Basic risk identification', score: 1 },
        { text: 'Structured risk assessment processes', score: 2 },
        { text: 'Integrated enterprise risk management with AI-specific protocols', score: 3 }
      ]
    },
    {
      id: 'gov_004',
      text: 'Do you have an AI ethics committee or review board?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No ethics oversight', score: 0 },
        { text: 'Informal ethics discussions', score: 1 },
        { text: 'Formal ethics committee established', score: 2 },
        { text: 'Active ethics board with decision-making authority', score: 3 }
      ]
    },
    // Advanced Level (3-4 points each)
    {
      id: 'gov_005',
      text: 'How comprehensive is your AI audit and compliance program?',
      category: 'advanced',
      points: 4,
      options: [
        { text: 'No formal auditing', score: 0 },
        { text: 'Basic compliance checks', score: 1 },
        { text: 'Regular internal audits', score: 2.5 },
        { text: 'Third-party audits with continuous monitoring', score: 4 }
      ]
    },
    // Expert Level (4-5 points each)
    {
      id: 'gov_006',
      text: 'Do you have automated governance controls integrated into your AI pipeline?',
      category: 'expert',
      points: 5,
      options: [
        { text: 'No automated controls', score: 0 },
        { text: 'Basic automated checks', score: 1.5 },
        { text: 'Integrated governance workflows', score: 3 },
        { text: 'Fully automated governance with real-time enforcement', score: 5 }
      ]
    }
  ],
  'Ethics & Responsible AI': [
    {
      id: 'eth_001',
      text: 'Do you actively test for bias in your AI models?',
      category: 'basic',
      points: 2,
      options: [
        { text: 'No bias testing performed', score: 0 },
        { text: 'Occasional manual checks', score: 0.5 },
        { text: 'Regular bias testing protocols', score: 1.5 },
        { text: 'Comprehensive automated bias detection', score: 2 }
      ]
    },
    {
      id: 'eth_002',
      text: 'How do you ensure fairness across different demographic groups?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No specific fairness measures', score: 0 },
        { text: 'Basic demographic analysis', score: 1 },
        { text: 'Multi-dimensional fairness metrics', score: 2 },
        { text: 'Intersectional fairness with continuous monitoring', score: 3 }
      ]
    },
    {
      id: 'eth_003',
      text: 'What level of explainability do your AI systems provide?',
      category: 'advanced',
      points: 4,
      options: [
        { text: 'Black box models with no explanation', score: 0 },
        { text: 'Basic model interpretability', score: 1 },
        { text: 'Feature importance and local explanations', score: 2.5 },
        { text: 'Full explainable AI with stakeholder-appropriate explanations', score: 4 }
      ]
    },
    {
      id: 'eth_004',
      text: 'How do you handle AI system transparency with users?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'Users unaware of AI involvement', score: 0 },
        { text: 'Basic AI disclosure', score: 1 },
        { text: 'Clear AI transparency with user controls', score: 2 },
        { text: 'Comprehensive transparency with user agency', score: 3 }
      ]
    },
    {
      id: 'eth_005',
      text: 'Do you have processes for algorithmic impact assessment?',
      category: 'expert',
      points: 5,
      options: [
        { text: 'No impact assessment', score: 0 },
        { text: 'Basic impact consideration', score: 1.5 },
        { text: 'Structured impact assessment framework', score: 3 },
        { text: 'Comprehensive algorithmic impact assessment with stakeholder input', score: 5 }
      ]
    }
  ],
  'Data Integrity & Security': [
    {
      id: 'data_001',
      text: 'How do you ensure data quality for AI training?',
      category: 'basic',
      points: 2,
      options: [
        { text: 'No formal data quality processes', score: 0 },
        { text: 'Basic data cleaning', score: 0.5 },
        { text: 'Structured data validation pipelines', score: 1.5 },
        { text: 'Comprehensive data quality management system', score: 2 }
      ]
    },
    {
      id: 'data_002',
      text: 'What data privacy protections are in place?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No specific privacy protections', score: 0 },
        { text: 'Basic data anonymization', score: 1 },
        { text: 'Privacy-preserving techniques (differential privacy, etc.)', score: 2 },
        { text: 'Comprehensive privacy-by-design with advanced techniques', score: 3 }
      ]
    },
    {
      id: 'data_003',
      text: 'How do you manage data lineage and provenance?',
      category: 'advanced',
      points: 4,
      options: [
        { text: 'No data lineage tracking', score: 0 },
        { text: 'Basic source documentation', score: 1 },
        { text: 'Automated lineage tracking', score: 2.5 },
        { text: 'Complete data provenance with full audit trails', score: 4 }
      ]
    },
    {
      id: 'data_004',
      text: 'What security measures protect your AI training data?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'Standard database security', score: 0 },
        { text: 'Enhanced access controls', score: 1 },
        { text: 'Encryption and secure environments', score: 2 },
        { text: 'Zero-trust security with advanced threat protection', score: 3 }
      ]
    },
    {
      id: 'data_005',
      text: 'Do you implement federated learning or other distributed privacy techniques?',
      category: 'expert',
      points: 5,
      options: [
        { text: 'No distributed privacy techniques', score: 0 },
        { text: 'Basic distributed processing', score: 1.5 },
        { text: 'Implemented federated learning', score: 3.5 },
        { text: 'Advanced privacy-preserving distributed ML with formal guarantees', score: 5 }
      ]
    }
  ],
  'Model Quality & Technical Rigor': [
    {
      id: 'model_001',
      text: 'How comprehensive is your model validation process?',
      category: 'basic',
      points: 2,
      options: [
        { text: 'Basic accuracy testing only', score: 0 },
        { text: 'Multi-metric validation', score: 1 },
        { text: 'Cross-validation with statistical testing', score: 1.5 },
        { text: 'Comprehensive validation including robustness testing', score: 2 }
      ]
    },
    {
      id: 'model_002',
      text: 'Do you perform adversarial testing on your models?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No adversarial testing', score: 0 },
        { text: 'Basic edge case testing', score: 1 },
        { text: 'Structured adversarial examples', score: 2 },
        { text: 'Comprehensive adversarial robustness evaluation', score: 3 }
      ]
    },
    {
      id: 'model_003',
      text: 'How do you handle model versioning and reproducibility?',
      category: 'advanced',
      points: 4,
      options: [
        { text: 'No version control for models', score: 0 },
        { text: 'Basic model tracking', score: 1 },
        { text: 'Comprehensive MLOps with versioning', score: 3 },
        { text: 'Full reproducibility with deterministic pipelines', score: 4 }
      ]
    },
    {
      id: 'model_004',
      text: 'What level of uncertainty quantification do your models provide?',
      category: 'expert',
      points: 5,
      options: [
        { text: 'No uncertainty quantification', score: 0 },
        { text: 'Basic confidence scores', score: 1.5 },
        { text: 'Calibrated uncertainty estimates', score: 3 },
        { text: 'Full Bayesian uncertainty with epistemic/aleatoric decomposition', score: 5 }
      ]
    },
    {
      id: 'model_005',
      text: 'Do you implement continuous model monitoring and drift detection?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No monitoring in production', score: 0 },
        { text: 'Basic performance tracking', score: 1 },
        { text: 'Statistical drift detection', score: 2 },
        { text: 'Real-time drift detection with automated retraining', score: 3 }
      ]
    }
  ],
  'Operationalization & Lifecycle Management': [
    {
      id: 'ops_001',
      text: 'How mature is your model deployment process?',
      category: 'basic',
      points: 2,
      options: [
        { text: 'Manual, ad-hoc deployment', score: 0 },
        { text: 'Semi-automated deployment', score: 1 },
        { text: 'CI/CD pipelines for ML', score: 1.5 },
        { text: 'Fully automated MLOps with canary deployments', score: 2 }
      ]
    },
    {
      id: 'ops_002',
      text: 'What incident response procedures do you have for AI failures?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No specific AI incident procedures', score: 0 },
        { text: 'Basic error handling', score: 1 },
        { text: 'Structured incident response plan', score: 2 },
        { text: 'Automated incident detection with rapid response procedures', score: 3 }
      ]
    },
    {
      id: 'ops_003',
      text: 'How do you manage model lifecycle from development to retirement?',
      category: 'advanced',
      points: 4,
      options: [
        { text: 'No formal lifecycle management', score: 0 },
        { text: 'Basic stage gates', score: 1 },
        { text: 'Comprehensive lifecycle governance', score: 3 },
        { text: 'Automated lifecycle management with governance controls', score: 4 }
      ]
    },
    {
      id: 'ops_004',
      text: 'What level of scalability and performance optimization do you implement?',
      category: 'expert',
      points: 5,
      options: [
        { text: 'Basic deployment without optimization', score: 0 },
        { text: 'Manual performance tuning', score: 1.5 },
        { text: 'Automated scaling and optimization', score: 3.5 },
        { text: 'Advanced distributed systems with auto-scaling and performance SLAs', score: 5 }
      ]
    },
    {
      id: 'ops_005',
      text: 'How do you handle rollback and model A/B testing?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No rollback capabilities', score: 0 },
        { text: 'Manual rollback procedures', score: 1 },
        { text: 'Automated rollback with basic A/B testing', score: 2 },
        { text: 'Advanced experimentation platform with statistical significance testing', score: 3 }
      ]
    }
  ],
  'Stakeholder & Societal Impact': [
    {
      id: 'stake_001',
      text: 'How do you assess the societal impact of your AI systems?',
      category: 'basic',
      points: 2,
      options: [
        { text: 'No societal impact assessment', score: 0 },
        { text: 'Basic impact consideration', score: 0.5 },
        { text: 'Structured impact evaluation', score: 1.5 },
        { text: 'Comprehensive societal impact assessment with stakeholder input', score: 2 }
      ]
    },
    {
      id: 'stake_002',
      text: 'What level of stakeholder engagement do you maintain?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No formal stakeholder engagement', score: 0 },
        { text: 'Occasional feedback collection', score: 1 },
        { text: 'Regular stakeholder consultation', score: 2 },
        { text: 'Continuous stakeholder involvement in AI governance', score: 3 }
      ]
    },
    {
      id: 'stake_003',
      text: 'How do you ensure accessibility and inclusion in your AI systems?',
      category: 'advanced',
      points: 4,
      options: [
        { text: 'No specific accessibility measures', score: 0 },
        { text: 'Basic accessibility compliance', score: 1 },
        { text: 'Comprehensive accessibility design', score: 3 },
        { text: 'Universal design principles with continuous accessibility testing', score: 4 }
      ]
    },
    {
      id: 'stake_004',
      text: 'What processes do you have for handling user feedback and complaints?',
      category: 'intermediate',
      points: 3,
      options: [
        { text: 'No formal feedback mechanism', score: 0 },
        { text: 'Basic complaint handling', score: 1 },
        { text: 'Structured feedback processing', score: 2 },
        { text: 'Comprehensive feedback loop with system improvements', score: 3 }
      ]
    },
    {
      id: 'stake_005',
      text: 'Do you conduct community impact assessments for AI deployment?',
      category: 'expert',
      points: 5,
      options: [
        { text: 'No community impact assessment', score: 0 },
        { text: 'Basic community consultation', score: 1.5 },
        { text: 'Structured community impact evaluation', score: 3 },
        { text: 'Comprehensive community partnership with ongoing impact monitoring', score: 5 }
      ]
    }
  ]
};

export interface QuestionnaireDialogProps {
  open: boolean;
  onClose: () => void;
  onScoreUpdate?: (sectionIndex: number, score: number) => void;
}

const QuestionnaireDialog: React.FC<QuestionnaireDialogProps> = ({ open, onClose, onScoreUpdate }) => {
  const [tab, setTab] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [selectedAnswerTexts, setSelectedAnswerTexts] = useState<{[key: string]: string}>({});
  const [sectionScores, setSectionScores] = useState<number[]>(Array(6).fill(0));
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);
  const { setAssessmentResults: setGlobalAssessmentResults, isAssessmentComplete, setAssessmentComplete } = useAssessmentContext();

  const currentQuestions = QUESTION_SETS[SECTIONS[tab]] || [];
  const maxPossibleScore = currentQuestions.reduce((sum, q) => sum + q.points, 0);
  const currentScore = currentQuestions.reduce((sum, q) => {
    const answer = answers[q.id];
    return sum + (answer !== undefined ? answer : 0);
  }, 0);

  const answeredCount = currentQuestions.filter(q => answers[q.id] !== undefined).length;
  const completionPercent = currentQuestions.length
    ? Math.round((answeredCount / currentQuestions.length) * 100)
    : 0;

  const handleAnswerChange = (questionId: string, score: number, answerText: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    setSelectedAnswerTexts(prev => ({ ...prev, [questionId]: answerText }));
  };

  const calculateSectionScore = () => {
    if (maxPossibleScore === 0) return 0;
    // Scale to 0-25 range to match existing slider system
    return (currentScore / maxPossibleScore) * 25;
  };

  const handleCalculateScore = () => {
    const scaledScore = calculateSectionScore();
    const newScores = [...sectionScores];
    newScores[tab] = scaledScore;
    setSectionScores(newScores);
    
    // Create detailed assessment result for this section
    const sectionResult: AssessmentResult = {
      sectionName: SECTIONS[tab],
      score: scaledScore,
      maxScore: 25,
      answers: currentQuestions.map(q => ({
        questionId: q.id,
        questionText: q.text,
        selectedAnswer: selectedAnswerTexts[q.id] || 'Not answered',
        pointsEarned: answers[q.id] || 0,
        maxPoints: q.points
      })),
      completedAt: new Date()
    };
    
    // Update assessment results
    const updatedResults = [...assessmentResults];
    updatedResults[tab] = sectionResult;
    setAssessmentResults(updatedResults);
    setGlobalAssessmentResults(updatedResults);
    
    // Update the parent component's score
    if (onScoreUpdate) {
      onScoreUpdate(tab, scaledScore);
    }
    
    // Check if this is the last section
    if (tab === SECTIONS.length - 1) {
      setAssessmentComplete(true);
    } else {
      // Move to next tab
      setTab(tab + 1);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basic': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🟠';
      case 'expert': return '🔴';
      default: return '⚪';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return '#22c55e';
      case 'intermediate': return '#eab308';
      case 'advanced': return '#f97316';
      case 'expert': return '#ef4444';
      default: return '#6b7280';
    }
  };
  const generateReport = () => {
    const { totalScore, maxTotalScore, overallPercentage, maturityLevel } = getAssessmentSummary(assessmentResults);

    const reportContent = `
# PolydraIQ™ AI Governance Assessment Report

Generated: ${new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})}

## Executive Summary

**Overall Score:** ${totalScore.toFixed(1)} / ${maxTotalScore} (${overallPercentage.toFixed(1)}%)
**Maturity Level:** ${maturityLevel}

## Section Breakdown

${assessmentResults
  .map(
    (result) => `
### ${result.sectionName}
**Score:** ${result.score.toFixed(1)} / 25 (${((result.score / 25) * 100).toFixed(1)}%)

${result.answers
  .map(
    (answer) => `
**Q:** ${answer.questionText}
**A:** ${answer.selectedAnswer} (${answer.pointsEarned}/${answer.maxPoints} pts)
`,
  )
  .join('')}
`,
  )
  .join('')}

## Recommendations

Based on your assessment results, focus on areas with lower scores to improve your overall AI governance maturity. Consider engaging with AI governance experts for comprehensive improvement strategies.

---
*This report was generated using PolydraIQ™ Assessment Platform*
*For professional AI governance consulting: https://www.inference-stack.com/*
    `;

    return reportContent;
  };

  const downloadReport = () => {
    const reportContent = generateReport();
    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polydraiq-assessment-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintReport = () => {
    if (!assessmentResults.length) {
      window.alert('Please complete the guided assessment before printing a report.');
      return;
    }

    printAssessmentReport(assessmentResults);
  };

  return (
    <Dialog
      header="PolydraIQ™ Guided Assessment"
      visible={open}
      style={{ width: '90vw', maxWidth: '1200px' }}
      onHide={onClose}
      blockScroll
      maximizable
    >
      <div className="guided-assessment-body" style={{ display: 'flex', height: '100%' }}>
        {/* Tab Navigation */}
        <div
          style={{
            width: '280px',
            borderRight: '1px solid #e5e7eb',
            padding: '20px 16px',
            overflowY: 'auto',
            backgroundColor: '#f7f5f1',
          }}
        >
          <h4 style={{ marginTop: 0 }}>Assessment Facets</h4>
          {SECTIONS.map((section, idx) => (
            <div
              key={section}
              style={{
                padding: '10px 12px',
                margin: '4px 0',
                background: tab === idx ? '#e5efff' : 'transparent',
                border: tab === idx ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}
              onClick={() => setTab(idx)}
            >
              <div
                style={{
                  fontWeight: tab === idx ? 700 : 500,
                  fontSize: '14px',
                  color: '#111827',
                  flex: 1,
                  minWidth: 0,
                  wordBreak: 'break-word',
                }}
              >
                {section}
              </div>
              {sectionScores[idx] > 0 && (
                <Badge
                  value={sectionScores[idx].toFixed(1)}
                  severity="success"
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '0 24px 0 24px', overflowY: 'auto', paddingRight: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>{SECTIONS[tab]}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
              <ProgressBar
                value={completionPercent}
                style={{ flex: 1 }}
                color="#3b82f6"
              />
              <span style={{ fontWeight: 600, color: '#374151' }}>
                {answeredCount} / {currentQuestions.length || 0} answered
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
              Section progress reflects how many questions you&apos;ve answered. Your answers currently sum to
              {' '}
              {currentScore.toFixed(1)} / {maxPossibleScore} points.
            </div>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
              Answer questions to assess this facet's maturity. Higher complexity questions contribute more points.
            </p>
          </div>

          {/* Questions */}
          <div style={{ marginBottom: '24px' }}>
            {currentQuestions.map((question, idx) => (
              <Card
                key={question.id}
                style={{
                  marginBottom: '20px',
                  border: `1px solid ${getCategoryColor(question.category)}20`,
                  borderLeft: `4px solid ${getCategoryColor(question.category)}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#111827' }}>
                    {getCategoryIcon(question.category)} Question {idx + 1}
                  </div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    Weight: {question.points} pts · Level: {question.category}
                  </span>
                </div>

                <div style={{ marginBottom: '8px', color: '#111827' }}>{question.text}</div>

                <div>
                  {question.options.map((option, optionIdx) => (
                    <div
                      key={optionIdx}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}
                    >
                      <RadioButton
                        inputId={`${question.id}_${optionIdx}`}
                        name={question.id}
                        value={option.score}
                        onChange={() => handleAnswerChange(question.id, option.score, option.text)}
                        checked={answers[question.id] === option.score}
                      />
                      <label htmlFor={`${question.id}_${optionIdx}`} style={{ fontSize: '14px', color: '#374151' }}>
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '8px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                label="Download Report (Markdown)"
                icon="pi pi-download"
                size="small"
                outlined
                onClick={downloadReport}
                disabled={!isAssessmentComplete}
              />
              <Button
                label="Print Report"
                icon="pi pi-print"
                size="small"
                onClick={handlePrintReport}
                disabled={!isAssessmentComplete}
                severity={isAssessmentComplete ? 'success' : 'secondary'}
                outlined={!isAssessmentComplete}
              />
            </div>

            <Button
              label={tab === SECTIONS.length - 1 ? 'Finish Section' : 'Save & Next Section'}
              icon="pi pi-arrow-right"
              size="small"
              onClick={handleCalculateScore}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default QuestionnaireDialog;
