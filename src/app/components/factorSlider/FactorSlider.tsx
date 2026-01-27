import React, { useState } from 'react';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';

export type Factor = {
  name: string;
  score: number;
  weight: number;
  description?: string;
};

export const initialFactors: Factor[] = [
  { name: 'Governance & Accountability', score: 0, weight: 1, description: '' },
  { name: 'Ethics & Responsible AI', score: 0, weight: 1, description: '' },
  { name: 'Data Integrity & Security', score: 0, weight: 1, description: '' },
  { name: 'Model Quality & Technical Rigor', score: 0, weight: 1, description: '' },
  { name: 'Operationalization & Lifecycle Management', score: 0, weight: 1, description: '' },
  { name: 'Stakeholder & Societal Impact', score: 0, weight: 1, description: '' },
];

export interface FactorSliderProps {
  factor: Factor;
  onChange: (value: number) => void;
  compact?: boolean;
}

const sampleDescriptions: Record<string, { title: string; content: string, why: string}> = {
  'Governance & Accountability': {
    title: 'Governance & Accountability',
    content: 'This facet examines how your organization directs, supervises, and takes responsibility for its AI systems. Strong governance ensures AI initiatives align with business goals and regulatory requirements, while clear accountability reduces risks and builds trust. Here, we focus on leadership engagement, policy frameworks, oversight structures, and mechanisms for enforcing standards and learning from incidents.',
    why: 'Effective governance protects your organization from compliance failures and reputational damage. It creates transparency, defines roles, and ensures there’s a clear chain of responsibility—empowering ethical, auditable AI at scale.'
  },
  'Ethics & Responsible AI': {
    title: 'Ethics & Responsible AI',
    content: 'This section assesses your commitment to developing and deploying AI responsibly and ethically. It covers practices to identify and mitigate bias, ensure fairness, promote transparency, and respect diverse user groups. Responsible AI safeguards the rights and well-being of users and society, ensuring that technology works for everyone.',
    why: 'Ethical AI is foundational to trust. By proactively addressing risks like bias, exclusion, or unintended harm, your organization can foster innovation while avoiding negative societal impact or regulatory scrutiny.'
  },
  'Data Integrity & Security': {
    title: 'Data Integrity & Security',
    content: 'This facet evaluates the entire data pipeline—from sourcing and quality to protection and compliance. High-integrity data ensures that your AI models are accurate, reliable, and safe. Robust security practices keep sensitive information secure, minimize breach risks, and support regulatory compliance across all jurisdictions where you operate.',
    why: 'Strong data integrity and security protect not only your organization but also your users, partners, and stakeholders. Lapses in data management can undermine AI performance, erode trust, and result in costly regulatory actions.'
  },
  'Model Quality & Technical Rigor': {
    title: 'Model Quality & Technical Rigor',
    content: 'This area covers the full lifecycle of AI model development and maintenance. It examines the rigor applied to design, documentation, testing, validation, monitoring, and continuous improvement. Technical excellence here translates directly into model reliability, predictability, and resilience.',
    why: 'Robust model development reduces technical debt and helps future-proof your AI investment. Continuous monitoring and rigorous validation are essential for identifying model drift, minimizing errors, and ensuring AI outputs remain relevant and accurate as conditions evolve.'
  },
  'Operationalization & Lifecycle Management': {
    title: 'Operationalization & Lifecycle Management',
    content: 'This section measures how seamlessly AI is embedded into real-world operations. It covers deployment strategies, monitoring, change management, incident response, and continuous improvement of AI in production. Operational maturity ensures AI systems are resilient, scalable, and deliver sustained value to the business.',
    why: 'Even the best models are only as good as their performance in production. Mature operationalization processes minimize downtime, support rapid iteration, and enable your team to detect and resolve issues before they escalate.'
  },
  'Stakeholder & Societal Impact': {
    title: 'Stakeholder & Societal Impact',
    content: 'This facet addresses how your AI initiatives affect both internal and external stakeholders—including employees, customers, partners, and society at large. It examines communication, education, accessibility, user experience, and the broader societal or market impact of your AI systems.',
    why: 'AI doesn’t exist in a vacuum—its success depends on stakeholder understanding, trust, and buy-in. Proactive engagement, clear communication, and a focus on positive impact help ensure adoption, minimize resistance, and position your organization as a responsible leader in AI.'
  },
};

const FactorSlider: React.FC<FactorSliderProps> = ({ factor, onChange, compact }) => {
  const [showModal, setShowModal] = useState(false);
  const desc = sampleDescriptions[factor.name] || { title: factor.name, content: 'No description available.' };

  return (
    <div className="factor-slider" style={compact ? {
      background: 'var(--color-surface)',
      borderRadius: 12,
      boxShadow: '0 8px 18px rgba(15, 23, 42, 0.08)',
      minWidth: 140,
      maxWidth: 160,
      flex: 1,
      padding: '10px 8px 16px 8px',
      margin: '0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 120,
      justifyContent: 'flex-start',
    } : {}}>
      <h5 style={compact ? {
        fontSize: 12,
        margin: '0 0 6px 0',
        fontWeight: 600,
        textAlign: 'center',
        whiteSpace: 'normal',
        lineHeight: 1.2,
        minHeight: 32,
        wordBreak: 'break-word',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      } : { display: 'flex', alignItems: 'center' }}>
        {factor.name}
        <i
          className="pi pi-info-circle factor-slider-info"
          style={{ marginLeft: 4, fontSize: '1em', cursor: 'pointer', verticalAlign: 'middle' }}
          onClick={() => setShowModal(true)}
        ></i>
      </h5>
      <Slider
        value={factor.score}
        onChange={(e) => onChange(e.value as number)}
        min={0}
        max={25}
        step={1}
        style={compact ? { width: '100%', marginBottom: 4, height: 8 } : { width: '300px', marginBottom: '8px' }}
      />
      <InputNumber
        value={factor.score}
        min={0}
        max={25}
        onValueChange={(e) => onChange(e.value as number)}
        inputStyle={compact ? { width: 36, fontSize: 13, padding: 2, textAlign: 'center' } : {}}
        style={compact ? { width: 40, margin: '0 auto', display: 'block' } : {}}
        showButtons={false}
      />
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              borderRadius: 12,
              padding: 32,
              maxWidth: 640,
              width: '90vw',
              boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
              position: 'relative',
            }}
          >
            <h2 style={{ marginTop: 0 }}>{desc.title}</h2>
            <div style={{ margin: '18px 0', whiteSpace: 'pre-line', color: 'var(--color-text-muted)' }}>
              <strong>Overview:</strong>
              <br />
              {desc.content}
            </div>
            <div style={{ margin: '18px 0', whiteSpace: 'pre-line', color: 'var(--color-text-muted)' }}>
              <strong>Why it matters:</strong>
              <br />
              {desc.content}
            </div>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'transparent',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 22,
                color: '#888',
                transition: 'background 0.2s',
              }}
              aria-label="Close"
            >
              <span className="pi pi-times" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactorSlider;
