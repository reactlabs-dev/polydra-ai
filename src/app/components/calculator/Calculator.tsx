import React, { useState } from 'react';
import styles from './Calculator.module.scss';
import { Factor, initialFactors } from '../factorSlider/FactorSlider';
import CompositeScoreDisplay from '../compositeScoreDisplay/CompositeScoreDisplay';
import Visualization from '../visualization/Visualization';
import FactorSlider from '../factorSlider/FactorSlider';

/* eslint-disable-next-line */
export interface CalculatorProps {
  'data-testid'?: string;
}

function Calculator(props: CalculatorProps) {

  const [factors, setFactors] = useState<Factor[]>(initialFactors || []); // Add fallback

  const handleScoreChange = (index: number, value: number) => {
    const newFactors = [...factors];
    newFactors[index].score = value;
    setFactors(newFactors);
  };

  const handleQuestionnaireScoreUpdate = (sectionIndex: number, score: number) => {
    const newFactors = [...factors];
    if (newFactors[sectionIndex]) {
      newFactors[sectionIndex].score = score;
      setFactors(newFactors);
    }
  };

  const calculateCompositeScore = () => {
    return (factors || []).reduce((acc, factor) => acc + factor.score * factor.weight, 0);
  };

  const getMaturityLevel = (score: number) => {
    if (score >= 100) return { level: "Expert", color: "#ef4444", description: "World-class AI governance and implementation" };
    if (score >= 75) return { level: "Advanced", color: "#f97316", description: "Sophisticated AI practices with comprehensive controls" };
    if (score >= 50) return { level: "Intermediate", color: "#eab308", description: "Solid AI foundation with room for enhancement" };
    if (score >= 25) return { level: "Basic", color: "#22c55e", description: "Initial AI practices in place" };
    return { level: "Developing", color: "#6b7280", description: "AI governance and practices are in early stages" };
  };

  const maturity = getMaturityLevel(calculateCompositeScore());

// const facts = [
//   "Only 21% of enterprises report their AI models are fully governed and traceable (Gartner, 2023).",
//   "AI incidents—such as bias or model failures—have tripled in the last 5 years (Stanford AI Index, 2024).",
//   "Over 50 countries now have draft or enacted AI regulations addressing safety, bias, and transparency (OECD, 2024).",
//   "81% of global executives say AI governance is critical but only 35% have a formal strategy (WEF, 2023).",
//   "ISO/IEC 42001 is the first international management standard for AI—published in December 2023.",
//   "Only 13% of organizations can explain, in detail, how their most important AI models work (McKinsey, 2023).",
//   "Independent audits are rapidly emerging as the gold standard for AI system trustworthiness (NIST, 2024).",
//   "A 2023 IBM survey found 84% of consumers expect companies to be accountable for their AI systems.",
//   "AI-related regulatory fines are projected to exceed $10B by 2030 if compliance lags (Gartner, 2024).",
//   "The EU AI Act is the world’s first comprehensive regulation for enterprise AI (adopted 2024).",
//   "Accreditation frameworks from providers like Inference-Stack.com offer an external trust signal similar to SOC 2 for AI.",
//   "42% of major organizations have paused high-impact AI projects over lack of external validation (S&P Global Market Intelligence, 2025).",
//   "Third-party AI assurance can reduce enterprise procurement cycles by up to 40% (Forrester, 2023).",
//   "Most AI model errors stem from incomplete data governance, not just poor algorithms (MIT, 2023).",
//   "The World Economic Forum ranks model bias and lack of transparency as the top two AI risks (WEF, 2023).",
//   "75% of executives say they would pay a premium for accredited, trustworthy AI solutions (Accenture, 2023).",
//   "Major insurers are piloting AI risk underwriting using third-party assurance reports (SwissRe, 2024).",
//   "Over 60% of data breaches involving AI systems are due to weak model oversight (IBM, 2023).",
//   "Model drift—unmonitored changes in AI behavior—accounts for 30% of real-world AI failures (Stanford, 2024).",
//   "Gartner predicts that by 2026, 50% of large enterprises will require external AI risk certification."
// ];

  

  return (
    <div className={styles['calculator']} data-testid={props['data-testid']}>
      <div className="grid factors" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="col-9 flex flex-column text-center justify-content-center align-content-center" style={{ width: '100%' }}>
          <CompositeScoreDisplay 
            score={calculateCompositeScore()} 
            onQuestionnaireScoreUpdate={handleQuestionnaireScoreUpdate}
          />
          
          {/* Maturity Level Indicator */}
          <div style={{ 
            padding: '16px 24px',
            background: `${maturity.color}20`,
            border: `2px solid ${maturity.color}`,
            borderRadius: '12px',
            maxWidth: '600px',
            margin: '16px auto'
          }}>
            <h3 style={{ margin: '0 0 8px 0', color: maturity.color }}>
              AI Maturity Level: {maturity.level}
            </h3>
            <p style={{ margin: 0, color: '#374151' }}>
              {maturity.description}
            </p>
          </div>

          <Visualization factors={factors} />
        </div>
        
        {/* Manual Controls Section */}
        <div style={{ width: '100%', maxWidth: '1200px', marginTop: '32px' }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '20px',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Manual Score Adjustment</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
              Use the Guided Assessment above for detailed evaluation, or manually adjust scores using the controls below.
            </p>
          </div>
          
          {/* Horizontal panel for sliders/inputs */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            maxWidth: 1100,
            margin: '0 auto',
          }}>
            {factors.slice(0, 6).map((factor, index) => (
              <FactorSlider
                key={index}
                factor={factor}
                onChange={(value) => handleScoreChange(index, value)}
                compact // pass a prop to FactorSlider to use compact styling
              />
            ))}
          </div>
        </div>
      </div>
      {/* <StatisticsBanner facts={facts} /> */}
    </div>
  );
}

export default Calculator;
