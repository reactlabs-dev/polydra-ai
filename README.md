# 🎯 PolydraIQ Assessment Platform

<div align="center">

<img src="./public/inferencestack_logo2W.png" alt="Inference-Stack.com" width="260" />

**Enterprise-grade AI governance assessment and visualization platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-95%25-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-Passing-green?style=flat-square)](./coverage)
[![Accessibility](https://img.shields.io/badge/Accessibility-Practices-blue?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)

[🚀 **Live Demo**](https://polydraiq.com) • [📖 **Documentation**](./docs) • [🤝 **Contributing**](./docs/CONTRIBUTING.md)

</div>

<div align="center">

<img src="./public/screenshot_calc.png" alt="PolydraIQ Interactive Calculator" width="900" />

<br/>

<img src="./public/screenshot_assessment.png" alt="PolydraIQ Guided Assessment" width="900" />

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Assessment Framework](#-assessment-framework)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

**PolydraIQ** is a comprehensive AI governance assessment platform that provides organizations with multidimensional evaluation of their AI systems across six critical factors: governance, ethics, data integrity, model quality, operations, and societal impact.

Built with modern web development practices (TypeScript, component-based architecture, automated tests, and error handling), PolydraIQ is intended as a **starting point** for structured AI governance conversations inside organizations.

> **Important scope note**
>
> PolydraIQ is an assessment and visualization tool, not an audit or certification by itself. It helps teams systematically capture and discuss their own claims and practices across the six dimensions above. Determining how *deep* and reliable those claims are still requires experienced engineers, risk, and compliance professionals to review real systems, data flows, and processes in depth. A questionnaire—no matter how detailed—cannot, on its own, fully validate an organization’s AI governance posture.

### 🎯 **Why PolydraIQ?**

- **🏢 Enterprise-Oriented**: Modern TypeScript/React architecture with linting and automated tests
- **📊 Comprehensive Assessment**: Six-dimensional AI maturity questionnaire and calculator
- **🎨 Interactive Visualization**: 3D cube and real-time score visualization
- **♿ Accessibility-Focused**: Uses accessible React components and keyboard-friendly flows, informed by WCAG 2.1 guidance
- **🧪 Tested**: Jest + React Testing Library suite with coverage reporting
- **📱 Responsive Layout**: Built with flexbox and PrimeFlex to work well across common desktop and mobile screen sizes
- **🔒 Frontend-Safe Defaults**: Controlled inputs and React’s escape-by-default rendering help reduce common client-side risks

## ✨ Key Features

### 🎯 **Assessment Capabilities**
- **Interactive Factor Scoring**: Real-time sliders for six AI governance dimensions
- **Guided Questionnaire**: Comprehensive assessment with 240+ expert-crafted questions
- **Maturity Level Calculation**: AI governance maturity from "Developing" to "Expert"
- **Progress Tracking**: Visual progress indicators and goal setting

### 📊 **Visualization & Analytics**
- **3D Cube Visualization**: Interactive WebGL-based assessment representation
- **Real-time Scoring**: Dynamic composite score calculation
- **Progress Indicators**: Visual feedback for maturity level advancement
- **Export Capabilities**: JSON export for integration with other systems

### 🛡️ **Enterprise Features**
- **Error Boundaries**: Graceful error handling throughout the application
- **Data Persistence**: Local storage with graceful degradation
- **Performance Optimization**: Memoized calculations and efficient re-rendering
- **Accessibility**: Uses semantic React components and keyboard-focusable controls; deeper WCAG alignment is an ongoing effort

### 🎨 **User Experience**
- **Modern UI/UX**: Clean, professional interface with PrimeReact components
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: User preference-aware theming
- **Loading States**: Professional feedback for all async operations

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- Modern web browser with ES2020 support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/reactlabs-dev/polydra-ai.git
   cd polydra-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### 🔧 **Available Scripts**

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run test       # Run test suite
npm run test:watch # Run tests in watch mode
npm run coverage   # Generate coverage report
npm run lint       # Lint codebase
npm run lint:fix   # Auto-fix linting issues
npm run type-check # TypeScript type checking
```

## 🏗️ Architecture

### **Technology Stack**

- **Frontend**: React 18.2 + TypeScript 5.2
- **UI Components**: PrimeReact 10.9 + PrimeFlex
- **3D Graphics**: Three.js for interactive visualizations
- **Build Tool**: Vite 5.0 for fast development and optimized builds
- **Testing**: Jest + React Testing Library
- **Styling**: SCSS modules with CSS custom properties

### **Project Structure**

```
src/
├── types/                    # TypeScript type definitions
│   └── index.ts             # Core application types
├── constants/               # Application constants
│   └── index.ts             # Configuration and constants
├── utils/                   # Utility functions
│   └── index.ts             # Helper functions with error handling
├── hooks/                   # Custom React hooks
│   └── index.ts             # State management hooks
├── app/
│   ├── components/          # React components
│   │   ├── common/          # Reusable components
│   │   ├── calculator/      # Main assessment component
│   │   ├── questionnaire/   # Guided assessment
│   │   ├── visualization/   # 3D graphics components
│   │   └── ...
│   ├── pages/              # Page components
│   └── app.tsx             # Root application component
└── main.tsx                # Application entry point
```

### **Key Components**

- **Calculator**: Main assessment interface with factor scoring
- **QuestionnaireDialog**: Comprehensive guided assessment system
- **Visualization**: Interactive 3D cube representation
- **FactorSlider**: Individual assessment factor controls
- **CompositeScoreDisplay**: Real-time score calculation and display

## 📊 Assessment Framework

### **Six Assessment Dimensions**

1. **🏛️ Governance & Accountability**
   - Executive oversight and responsibility
   - Policy frameworks and compliance
   - Audit and risk management processes

2. **⚖️ Ethics & Responsible AI**
   - Bias detection and mitigation
   - Fairness and transparency measures
   - Stakeholder impact assessment

3. **🔒 Data Integrity & Security**
   - Data quality and validation
   - Privacy protection measures
   - Security and compliance protocols

4. **🔬 Model Quality & Technical Rigor**
   - Validation and testing procedures
   - Documentation and reproducibility
   - Performance monitoring systems

5. **⚙️ Operationalization & Lifecycle Management**
   - Deployment and scaling processes
   - Monitoring and maintenance
   - Change management procedures

6. **🌍 Stakeholder & Societal Impact**
   - Community engagement and feedback
   - Accessibility and inclusion measures
   - Broader societal impact consideration

### **Maturity Levels**

- **🔴 Expert (100+ points)**: World-class AI governance implementation
- **🟠 Advanced (75+ points)**: Sophisticated practices with comprehensive controls
- **🟡 Intermediate (50+ points)**: Solid foundation with enhancement opportunities
- **🟢 Basic (25+ points)**: Initial practices in place
- **⚪ Developing (0+ points)**: Early-stage governance and practices

## 🛠️ Development

### **Code Quality Standards**

- **TypeScript**: Strict mode enabled across the app for safer refactoring
- **ESLint**: Enforced code style and best practices via npm scripts
- **Testing**: Jest + React Testing Library with coverage reporting
- **Documentation**: Inline comments and README/docs for key flows (JSDoc is recommended for public APIs)
- **Accessibility**: Uses accessible UI primitives and aims to improve WCAG 2.1 alignment over time (no formal certification implied)

### **Path Aliases**

The project uses TypeScript path mapping for clean imports:

```typescript
import { useAssessment } from '@/hooks';
import { AssessmentMath } from '@/utils';
import { MATURITY_LEVELS } from '@/constants';
import { Factor } from '@/types';
import Calculator from '@/components/calculator/Calculator';
```

### **State Management**

The application uses custom React hooks for state management:

```typescript
// Assessment state management
const {
  factors,
  compositeScore,
  maturityLevel,
  updateFactorScore,
  exportAssessment,
} = useAssessment();

// Questionnaire state
const {
  currentSection,
  answers,
  updateAnswer,
  navigateToSection,
} = useQuestionnaire();
```

### **Error Handling**

Comprehensive error handling with custom utilities:

```typescript
// Standardized error creation
const error = ErrorUtils.createError('INVALID_SCORE', 'Score must be between 0 and 25');

// Safe operations with fallbacks
const data = StorageUtils.getItem('key', defaultValue);

// Error boundaries for component isolation
<ErrorBoundary fallback={CustomErrorFallback}>
  <Calculator />
</ErrorBoundary>
```

## 🧪 Testing

### **Testing Philosophy**

For teams adopting or extending PolydraIQ in production, a healthy testing strategy typically includes:

- **Unit Tests**: Individual component and utility function testing
- **Integration Tests**: Component interaction and data flow testing
- **Accessibility Considerations**: Keyboard navigation and basic assistive-technology flows where feasible
- **Error Handling Tests**: Failure scenario and recovery testing

### **Running Tests**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run coverage

# Run specific test file
npm test Calculator.test.tsx
```

### **Test Coverage Status & Goals**

- **Current status**: The open-source starter currently has a focused but partial Jest suite (overall coverage is well below 90% across the entire codebase and is being expanded over time).
- **Longer-term goals** (for teams running this in production) might include:
   - Components: 80–90%+ line coverage
   - Utilities: 90%+ line coverage
   - Critical error paths: Near-100% coverage
   - Accessibility: Regular manual checks and, where possible, automated tooling

## 🚀 Deployment

### **Production Build**

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### **Environment Variables**

Create a `.env` file for environment-specific configuration:

```env
VITE_APP_NAME="Polydra AI Assessment Platform"
VITE_API_BASE_URL="https://api.example.com"
VITE_ENABLE_ANALYTICS="true"
```

### **Deployment Targets**

- **Vercel**: Optimized for static site deployment
- **Netlify**: Continuous deployment from Git
- **AWS S3 + CloudFront**: Enterprise cloud hosting
- **Docker**: Containerized deployment options

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](./docs/CONTRIBUTING.md) for details.

### **Development Workflow**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Code Standards**

- Follow existing TypeScript and React patterns
- Include comprehensive tests for new features
- Update documentation for API changes
- Ensure accessibility compliance
- Add JSDoc comments for public functions

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0** (AGPL-3.0).

This means:
- ✅ **Free for personal and research use**
- ✅ **Open source contributions welcome**
- ⚠️ **Commercial use requires licensing discussion**
- 🔄 **Derivative works must remain open source**

For commercial licensing inquiries, please contact [matt.vegas@inference-stack.com](mailto:matt.vegas@inference-stack.com).

## 🏢 About Inference-Stack.com

**Inference-Stack.com** addresses the critical gap in enterprise AI trust through independent, multidimensional accreditation. As organizations rapidly deploy AI systems, regulators, customers, and partners increasingly demand comprehensive visibility, accountability, and assurance across every aspect of AI operations.

PolydraIQ is one mechanism in that broader toolkit: it helps quantify and qualify the *breadth* of an organization’s stated AI practices across many dimensions. It does **not** replace the need for deeper, hands-on technical and organizational analysis (for example, engineers and auditors reviewing infrastructure, model pipelines, codebases, and live products). Instead, it is designed to give teams a shared starting point and vocabulary so the wider open-source and enterprise communities can have more grounded conversations about AI governance inside their own organizations.

### **Enterprise Services**

- 🔍 **Comprehensive AI Audits**: Code-level security and compliance analysis
- 📋 **Certification Programs**: Independent third-party AI system accreditation
- 🎓 **Training & Consultation**: Executive workshops and technical guidance
- 🛠️ **Custom Solutions**: Tailored governance frameworks for enterprise needs

**Contact**: [https://www.inference-stack.com/#contact](https://www.inference-stack.com/#contact)

---

<div align="center">

**Built with ❤️ by [Inference Stack](https://www.inference-stack.com)**

*Empowering trustworthy AI through comprehensive governance*

</div>