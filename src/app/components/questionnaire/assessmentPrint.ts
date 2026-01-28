export interface AssessmentAnswerDetail {
  questionId: string;
  questionText: string;
  selectedAnswer: string;
  pointsEarned: number;
  maxPoints: number;
}

export interface AssessmentResult {
  sectionName: string;
  score: number;
  maxScore: number;
  answers: AssessmentAnswerDetail[];
  completedAt: Date;
}

export interface AssessmentSummary {
  totalScore: number;
  maxTotalScore: number;
  overallPercentage: number;
  maturityLevel: string;
}

export const getAssessmentSummary = (assessmentResults: AssessmentResult[]): AssessmentSummary => {
  if (!assessmentResults.length) {
    return {
      totalScore: 0,
      maxTotalScore: 0,
      overallPercentage: 0,
      maturityLevel: 'Developing',
    };
  }

  const totalScore = assessmentResults.reduce((sum, result) => sum + result.score, 0);
  const maxTotalScore = assessmentResults.reduce((sum, result) => sum + result.maxScore, 0);
  const overallPercentage = maxTotalScore > 0 ? (totalScore / maxTotalScore) * 100 : 0;

  let maturityLevel = 'Developing';
  if (overallPercentage >= 80) maturityLevel = 'Expert';
  else if (overallPercentage >= 65) maturityLevel = 'Advanced';
  else if (overallPercentage >= 45) maturityLevel = 'Intermediate';
  else if (overallPercentage >= 25) maturityLevel = 'Basic';

  return { totalScore, maxTotalScore, overallPercentage, maturityLevel };
};

export const printAssessmentReport = (assessmentResults: AssessmentResult[]): void => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const { totalScore, maxTotalScore, overallPercentage, maturityLevel } = getAssessmentSummary(assessmentResults);

  const maturityColorMap: Record<string, string> = {
    Expert: '#ef4444',
    Advanced: '#f97316',
    Intermediate: '#eab308',
    Basic: '#22c55e',
    Developing: '#6b7280',
  };

  const maturityColor = maturityColorMap[maturityLevel] ?? '#3b82f6';

  const sectionsHtml = assessmentResults
    .map((result) => {
      const sectionPercentage = result.maxScore > 0 ? (result.score / result.maxScore) * 100 : 0;
      return `
          <section class="section-block">
            <h2>${result.sectionName}</h2>
            <div class="section-score">
              <span class="score-main">Score: ${result.score.toFixed(1)} / 25</span>
              <span class="score-badge">${sectionPercentage.toFixed(1)}%</span>
            </div>
            <div class="qa-list">
              ${result.answers
                .map(
                  (answer) => `
                <div class="qa-item">
                  <div class="question">Q: ${answer.questionText}</div>
                  <div class="answer">A: ${answer.selectedAnswer}</div>
                  <div class="points">${answer.pointsEarned.toFixed(1)} / ${answer.maxPoints.toFixed(1)} pts</div>
                </div>
              `,
                )
                .join('')}
            </div>
          </section>
        `;
    })
    .join('');

  printWindow.document.write(`
        <html>
          <head>
            <title>PolydraIQ Assessment Report</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #111827;
                max-width: 900px;
                margin: 0 auto;
                padding: 32px 32px 40px 32px;
                background-color: #f9fafb;
              }
              header {
                border-bottom: 4px solid #3b82f6;
                padding-bottom: 12px;
                margin-bottom: 24px;
              }
              .title {
                font-size: 24px;
                font-weight: 700;
                color: #111827;
                margin: 0;
              }
              .subtitle {
                font-size: 13px;
                color: #6b7280;
                margin-top: 4px;
              }
              .summary-card {
                background-color: #f9fafb;
                color: #111827;
                padding: 16px 20px;
                border-radius: 10px;
                margin-bottom: 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .summary-main {
                font-size: 16px;
                font-weight: 600;
                color: #111827;
              }
              .summary-secondary {
                font-size: 13px;
                color: #4b5563;
              }
              .maturity-badge {
                padding: 6px 12px;
                border-radius: 999px;
                font-size: 12px;
                font-weight: 600;
                color: #f9fafb;
              }
              .section-block {
                background-color: #ffffff;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                padding: 16px 18px 18px 18px;
                margin-bottom: 16px;
                page-break-inside: avoid;
              }
              .section-block h2 {
                font-size: 16px;
                margin: 0 0 8px 0;
                color: #111827;
              }
              .section-score {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 13px;
                margin-bottom: 8px;
              }
              .score-main {
                font-weight: 600;
                color: #111827;
              }
              .score-badge {
                padding: 4px 10px;
                border-radius: 999px;
                background-color: #e0f2fe;
                color: #0369a1;
                font-weight: 600;
                font-size: 12px;
              }
              .qa-list {
                margin-top: 4px;
              }
              .qa-item {
                border-top: 1px solid #e5e7eb;
                padding-top: 8px;
                margin-top: 8px;
                font-size: 12px;
              }
              .qa-item:first-of-type {
                border-top: none;
                padding-top: 0;
                margin-top: 0;
              }
              .question {
                font-weight: 600;
                color: #111827;
              }
              .answer {
                margin-top: 2px;
                color: #374151;
              }
              .points {
                margin-top: 2px;
                color: #6b7280;
              }
              .meta {
                font-size: 12px;
                color: #6b7280;
                margin-bottom: 16px;
              }
              .disclaimer {
                margin-top: 24px;
                padding-top: 12px;
                border-top: 1px solid #e5e7eb;
                font-size: 11px;
                color: #6b7280;
                line-height: 1.5;
              }
              @media print {
                body {
                  margin: 0;
                  padding: 16px 24px;
                  font-size: 11px;
                  background-color: #ffffff;
                }
                header {
                  margin-bottom: 16px;
                }
              }
            </style>
          </head>
          <body>
            <header>
              <h1 class="title">PolydraIQ AI Governance Assessment Report</h1>
              <div class="subtitle">Generated: ${new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</div>
            </header>

            <div class="summary-card" style="border-left: 4px solid ${maturityColor};">
              <div>
                <div class="summary-main">Overall Score: ${totalScore.toFixed(1)} / ${maxTotalScore}</div>
                <div class="summary-secondary">Overall Maturity: ${overallPercentage.toFixed(1)}%</div>
              </div>
              <div class="maturity-badge" style="background-color: ${maturityColor};">Maturity Level: ${maturityLevel}</div>
            </div>

            <div class="meta">
              Section scores are normalized to a maximum of 25 points each. Detailed responses are listed below for audit and follow-up planning.
            </div>

            ${sectionsHtml}

            <div class="disclaimer">
              USE DISCLAIMER: This assessment report is generated from a self-assessed questionnaire and is provided "AS IS" for informational and preliminary evaluation purposes only. It does not constitute legal, regulatory, risk, or audit advice, and does not create any form of certification or accreditation. Organizations remain solely responsible for their own governance, risk, and compliance decisions and should seek qualified professional guidance for any production or regulatory use.
            </div>
          </body>
        </html>
      `);

  printWindow.document.close();
  printWindow.print();
}
