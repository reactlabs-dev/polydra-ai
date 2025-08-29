import React, { useState } from 'react';
import Calculator from '../components/calculator/Calculator';
import Footer from '../components/footer/Footer';
import MainMenu from '../components/MainMenu/MainMenu';
import styles from './home.module.scss';
import { Dialog } from 'primereact/dialog';

type DialogContent = {
  heading: string;
  paragraphs: string[];
  link?: { url: string; text: string };
  link2?: { url: string; text: string };
};

const dialogContents: DialogContent[] = [
{
  heading: 'About',
  paragraphs: [
    "AIDAQInsights™ addresses the critical gap in enterprise AI trust through independent, multidimensional accreditation. As organizations rapidly deploy AI systems, regulators, customers, and partners increasingly demand comprehensive visibility, accountability, and assurance across every aspect of AI operations. Traditional assessment frameworks are static, linear, or self-reported—leaving dangerous blind spots in risk management.",
    "Most existing AI governance tools rely on basic checklists or generic maturity models that fail to capture the complex, context-dependent nature of real-world AI implementations. These approaches treat AI trust as a binary pass/fail rather than the nuanced, multi-layered construct it actually represents.",
    "Polydra™, our proprietary meta-cube analytics engine, revolutionizes AI assessment by capturing the complete spectrum of AI maturity across six critical dimensions: Governance & Accountability, Ethics & Responsible AI, Data Integrity & Security, Model Quality & Technical Rigor, Operationalization & Lifecycle Management, and Stakeholder & Societal Impact. Each dimension contains 25 measurable components, ensuring comprehensive evaluation without gaps.",
    "The platform delivers transparent, third-party accreditation that goes beyond traditional compliance badges. Organizations receive a dynamic, interactive assessment that reveals actionable insights, benchmarks against industry standards, and adapts to evolving regulatory requirements. This enables confident AI deployment with full stakeholder transparency.",
    "Our mission: Make enterprise-grade AI governance accessible, measurable, and actionable for organizations of every size. Polydra™ transforms complex AI governance challenges into clear, manageable roadmaps for building trustworthy AI systems."
  ],
},
  {
    heading: 'Credits',
    paragraphs: [
      "Polydra.ai represents the convergence of advanced statistical modeling, enterprise software architecture, and production-grade data science methodologies. The system architecture leverages React 18's concurrent rendering capabilities with Three.js WebGL optimization for real-time visualization of multidimensional assessment data.",
      "The underlying assessment engine implements sophisticated psychometric principles including Item Response Theory (IRT) and multifactor analysis, ensuring statistically robust evaluation across heterogeneous AI system architectures. Scoring algorithms employ weighted composite methodologies with dynamic normalization—techniques commonly found in advanced analytics environments at institutions like MIT's Computer Science and Artificial Intelligence Laboratory (CSAIL).",
      "Development integrated OpenAI's GPT-4 Turbo for intelligent question generation and validation, while maintaining enterprise-grade type safety through TypeScript's advanced generic system and comprehensive testing frameworks. The codebase exemplifies modern software engineering: functional programming paradigms, immutable state management, modular component architecture, and automated CI/CD pipelines using Nx monorepo tooling.",
      "The visualization engine processes assessment data through proprietary meta-cube transformations, mapping discrete survey responses onto continuous quality surfaces. This enables both granular component-level analysis and holistic system evaluation—a novel application of multidimensional scaling (MDS) and principal component analysis (PCA) to AI governance assessment.",
      "Architected and developed by Matt Vegas, Principal Consultant at Inference Stack, this platform synthesizes over two decades of enterprise software development, advanced analytics, and process optimization expertise. The result demonstrates how sophisticated data science techniques can be elegantly packaged into intuitive, business-ready solutions that scale from startup to Fortune 500 environments."
    ],
    link: { url: 'https://www.inference-stack.com/', text: 'Inference Stack Consulting' },
    link2: { url: 'https://github.com/reactlabs-dev', text: 'Technical Portfolio' }
  },
  {
    heading: 'Legal',
    paragraphs: [
      "<strong>USE DISCLAIMER:</strong> Polydra.ai and the AIDAQInsights™ assessment platform are provided <u>'AS IS'</u> for <u>informational and preliminary evaluation purposes only</u>. This tool generates automated assessments based on user input and should <strong><u>NOT be considered as professional advice, formal audit results, or certification</u></strong>. <u>Users assume all risks</u> associated with decisions made based on assessment outputs.",
      "<strong>LIABILITY LIMITATIONS:</strong> Inference Stack, Matt Vegas, and associated parties <u>disclaim all warranties</u>, express or implied, including merchantability, fitness for purpose, and accuracy of results. We <strong><u>shall not be liable for any direct, indirect, consequential, or incidental damages</u></strong> arising from use of this platform, including but not limited to business losses, data corruption, security breaches, or regulatory non-compliance.",
      "<strong>INTELLECTUAL PROPERTY RIGHTS:</strong> All proprietary algorithms, assessment methodologies, visualization engines, and the <u>Polydra™ meta-cube analytics technology remain the exclusive intellectual property</u> of Matt Vegas and Inference Stack. Users are granted <u>limited, non-transferable rights to USE the platform for legitimate business evaluation purposes only</u>. <strong><u>Reverse engineering, copying, reproducing, modifying, distributing, reselling, or creating derivative works is strictly prohibited</u></strong>.",
      "<strong>PROFESSIONAL SERVICES DISTINCTION:</strong> This automated assessment tool provides <u>high-level insights only</u>. For production deployments, regulatory compliance, or mission-critical AI systems, users should <u>engage qualified professionals for comprehensive code-level audits</u>, security penetration testing, and formal compliance validation. <strong>Inference Stack offers such professional services through direct consultation engagements.</strong>",
      "<strong>DATA HANDLING:</strong> User inputs and assessment results are processed locally where possible. Any data transmission is encrypted, but <u>users remain responsible for ensuring their use complies with applicable privacy regulations</u> (GDPR, CCPA, etc.). We <strong>recommend against inputting sensitive proprietary information</strong> into preliminary assessment forms.",
      "<strong>JURISDICTION & COMPLIANCE:</strong> This platform operates under <u>United States law</u>. Users outside the US must ensure compliance with local regulations. By using this tool, you agree to <u>binding arbitration for disputes</u> and acknowledge that any professional engagement requires <u>separate contractual agreements with appropriate liability coverage</u>.",
      "<strong>For comprehensive AI audits, code-level security analysis, and enterprise consulting services:</strong><br/>Contact: <strong>https://www.inference-stack.com/#contact</strong>"
    ]
  },
];

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {

  const [visible, setVisible] = useState<boolean>(false);
  const [currentDialog, setCurrentDialog] = useState<DialogContent | null>(null);

  const showDialog = (index: number) => {
    setCurrentDialog(dialogContents[index]);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setCurrentDialog(null);
  };


  return (
    <div className={styles['container']}>
      <div className={styles['logo']}><h1>Polydra.ai</h1></div>
      <MainMenu onMenuClick={showDialog} />
      <Dialog header={currentDialog?.heading} visible={visible} style={{ width: '50vw' }} onHide={hideDialog} blockScroll>
        {currentDialog && (
          <div>
            {currentDialog.paragraphs.map((para, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: para }}></p>
            ))}
            
            {/* Only show old links for non-Credits sections */}
            {currentDialog.heading !== 'Credits' && (
              <>
                {currentDialog.link && (
                  <a href={currentDialog.link.url} target="_blank" rel="noopener noreferrer">
                    {currentDialog.link.text}
                  </a>
                )}
                {currentDialog.link2 && (
                  <a href={currentDialog.link2.url} target="_blank" rel="noopener noreferrer" className="ml-4">
                    {currentDialog.link2.text}
                  </a>
                )}
              </>
            )}
            
            {/* Compact signature for Credits section */}
            {currentDialog.heading === 'Credits' && (
              <div style={{ 
                marginTop: '20px', 
                paddingTop: '16px', 
                borderTop: '1px solid #e5e7eb',
                textAlign: 'center' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
                  <img 
                    src="/inference_stack_logo2.png" 
                    alt="Inference Stack" 
                    style={{ height: '28px', width: 'auto', objectFit: 'contain' }} 
                  />
                  <a 
                    href="https://www.inference-stack.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#0ea5e9',
                      textDecoration: 'none',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}
                  >
                    www.inference-stack.com
                  </a>
                </div>
                
                <div style={{ color: '#6b7280', fontSize: '13px' }}>
                  <span style={{ fontWeight: '600' }}>Matt Vegas</span>
                  <span style={{ margin: '0 8px' }}>•</span>
                  <a 
                    href="mailto:matt.vegas@inference-stack.com"
                    style={{ color: '#6b7280', textDecoration: 'none' }}
                  >
                    matt.vegas@inference-stack.com
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </Dialog>
      <div className={styles['jumbotron']}>
        <div className={styles['container']}>
          <h2>Polydra™: The Multidimensional Framework Powering AIDAQInsights™ Accreditation</h2>
          <p className={styles['desc']}>
            Polydra™ is the proprietary meta-cube analytics engine at the core of AIDAQInsights™. Built to capture every axis of AI maturity, governance, and operational depth, Polydra™ translates complex technical, organizational, and ethical signals into a dynamic, interactive 3D map. Each facet—ranging from Responsible AI to Data Integrity, Compliance, Model Depth, and more—is evaluated through a blend of automated analysis, technical review, and expert validation.
            Unlike linear checklists or self-reported dashboards, Polydra™ provides a multidimensional, auditable assessment that adapts to industry context and regulatory change. The result: a transparent, third-party accreditation that brings clarity, trust, and comparability to enterprise AI. With Polydra™, you see every dimension of your AI readiness—so you can lead with confidence in a rapidly evolving market.
          </p>
        </div>
      </div>
      <Calculator />
      <Footer />
    </div>
  );
}

export default Home;
