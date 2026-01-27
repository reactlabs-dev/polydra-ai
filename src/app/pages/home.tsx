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
  heading: 'Introduction',
  paragraphs: [
    "PolydraIQ™ is an interactive AI governance assessment platform designed to help organizations evaluate their AI maturity across six critical dimensions. Built with modern web technologies including React, TypeScript, and Three.js, it provides real-time visualization and scoring of AI governance practices through an intuitive interface.",
    "The platform features 30 carefully crafted assessment questions covering governance, ethics, data integrity, model quality, operations, and stakeholder impact. Each question is categorized by complexity level (Basic, Intermediate, Advanced, Expert) and contributes weighted points to your overall maturity score.",
    "With PolydraIQ™, you can explore different assessment scenarios, track your progress across dimensions, and generate detailed reports of your AI governance readiness. The interactive demo below demonstrates our assessment framework, allowing you to see how different factors contribute to overall AI maturity."
  ],
},
{
  heading: 'About',
  paragraphs: [
    "Inference-Stack.com addresses the growing need for structured AI governance assessment in organizations deploying AI systems. As companies seek to understand and improve their AI practices, there's a critical gap in accessible, comprehensive evaluation tools that can provide both immediate insights and actionable guidance.",
    "Most existing AI governance approaches rely on static checklists or generic frameworks that don't capture the nuanced, interconnected nature of AI implementation challenges. These approaches often treat AI readiness as a simple checklist rather than the multidimensional capability assessment it requires.",
    "PolydraIQ™ demonstrates a modern approach to AI assessment by providing an interactive platform that evaluates AI maturity across six essential dimensions: Governance & Accountability, Ethics & Responsible AI, Data Integrity & Security, Model Quality & Technical Rigor, Operationalization & Lifecycle Management, and Stakeholder & Societal Impact. The platform features 30 expert-designed questions that provide comprehensive coverage of key AI governance areas.",
    "The platform delivers immediate assessment results with detailed scoring, progress tracking, and comprehensive reporting capabilities. Organizations can explore their AI readiness through interactive sliders, complete guided assessments, and generate detailed reports for stakeholder communication and improvement planning.",
    "Our mission: Make AI governance assessment accessible and actionable for organizations beginning their AI journey. PolydraIQ™ transforms complex AI governance concepts into clear, measurable evaluation criteria that help organizations understand their current state and plan their AI governance roadmap."
  ],
  link: { url: 'https://www.inference-stack.com/', text: 'Visit Inference-Stack.com' }
},
{
  heading: 'Credits',
  paragraphs: [
    "PolydraIQ represents the application of modern web development practices to AI governance assessment. The system architecture leverages React 18's component-based design with Three.js WebGL rendering for real-time visualization of multidimensional assessment data in an interactive 3D interface.",
    "The assessment engine implements a weighted scoring methodology with validation and error handling, ensuring reliable evaluation across the six governance dimensions. The platform uses TypeScript for type safety, comprehensive Jest testing for reliability, and modular SCSS styling for maintainable design.",
    "Development followed enterprise-grade software practices including path aliasing for clean imports, comprehensive error boundaries, accessibility features with ARIA support, and responsive design principles. The codebase demonstrates modern React patterns: functional components with hooks, memoized calculations, and efficient state management.",
    "The visualization system processes assessment data through Three.js transformations, mapping discrete survey responses onto an interactive 3D cube representation. This enables both detailed component-level analysis and holistic system visualization—providing an engaging interface for exploring AI governance maturity across multiple dimensions.",
    "Architected and developed by Matt Vegas, Principal Consultant at Inference Stack, this platform demonstrates how thoughtful software design can make complex assessment frameworks accessible and engaging. The result showcases professional development practices applied to create an intuitive, reliable tool for AI governance evaluation."
  ],
  link: { url: 'https://www.inference-stack.com/', text: 'Inference Stack Consulting' },
  link2: { url: 'https://github.com/reactlabs-dev', text: 'Technical Portfolio' }
},
{
  heading: 'Legal',
  paragraphs: [
    "<strong>USE DISCLAIMER:</strong> PolydraIQ™ and the assessment platform by Inference-Stack.com are provided <u>'AS IS'</u> for <u>informational and preliminary evaluation purposes only</u>. This tool generates automated assessments based on user input and should <strong><u>NOT be considered as professional advice, formal audit results, or certification</u></strong>. <u>Users assume all risks</u> associated with decisions made based on assessment outputs.",
    "<strong>LIABILITY LIMITATIONS:</strong> Inference Stack, Matt Vegas, and associated parties <u>disclaim all warranties</u>, express or implied, including merchantability, fitness for purpose, and accuracy of results. We <strong><u>shall not be liable for any direct, indirect, consequential, or incidental damages</u></strong> arising from use of this platform, including but not limited to business losses, data corruption, security breaches, or regulatory non-compliance.",
    "<strong>INTELLECTUAL PROPERTY RIGHTS:</strong> All proprietary algorithms, assessment methodologies, visualization engines, and the <u>PolydraIQ™ assessment platform technology remain the exclusive intellectual property</u> of Matt Vegas and Inference Stack. Users are granted <u>limited, non-transferable rights to USE the platform for legitimate business evaluation purposes only</u>. <strong><u>Reverse engineering, copying, reproducing, modifying, distributing, reselling, or creating derivative works is strictly prohibited</u></strong>.",
    "<strong>PROFESSIONAL SERVICES DISTINCTION:</strong> This automated assessment tool provides <u>high-level insights only</u>. For production deployments, regulatory compliance, or mission-critical AI systems, users should <u>engage qualified professionals for comprehensive code-level audits</u>, security penetration testing, and formal compliance validation. <strong>Inference Stack offers such professional services through direct consultation engagements.</strong>",
    "<strong>DATA HANDLING:</strong> User inputs and assessment results are processed locally where possible. Any data transmission is encrypted, but <u>users remain responsible for ensuring their use complies with applicable privacy regulations</u> (GDPR, CCPA, etc.). We <strong>recommend against inputting sensitive proprietary information</strong> into preliminary assessment forms.",
    "<strong>JURISDICTION & COMPLIANCE:</strong> This platform operates under <u>United States law</u>. Users outside the US must ensure compliance with local regulations. By using this tool, you agree to <u>binding arbitration for disputes</u> and acknowledge that any professional engagement requires <u>separate contractual agreements with appropriate liability coverage</u>.",
    "<strong>For comprehensive AI audits, code-level security analysis, and enterprise consulting services:</strong><br/>Contact: <strong>https://www.inference-stack.com/#contact</strong>"
  ]
},
];

export function Home() {

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
      <div className={styles['logo']}><h1>PolydraIQ.com</h1></div>
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
          <h2>Interactive AI Governance Assessment</h2>
          <p className={styles['desc']}>
            Experience the power of multidimensional AI assessment with our interactive demo. Adjust the six key governance factors below to see how they contribute to your organization's AI maturity score. Each dimension—from Ethics & Responsible AI to Data Integrity & Security—plays a crucial role in building trustworthy AI systems.
          </p>
        </div>
      </div>
      <Calculator />
      <Footer />
    </div>
  );
}

export default Home;