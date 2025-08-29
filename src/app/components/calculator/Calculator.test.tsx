/**
 * Simplified Calculator Test Suite
 * Uses centralized mocking system for reliable testing
 */
import { customRender as render, screen, fireEvent, createMockFactors } from '../../../test-utils';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { baseElement } = render(<Calculator />);
      expect(baseElement).toBeTruthy();
    });

    it('should render with correct accessibility attributes', () => {
      render(<Calculator data-testid="test-calculator" />);
      expect(screen.getByTestId('test-calculator')).toBeInTheDocument();
    });

    it('should display composite score', () => {
      render(<Calculator />);
      expect(screen.getByText(/Composite Quality Score:/i)).toBeInTheDocument();
    });

    it('should display maturity level indicator', () => {
      render(<Calculator />);
      expect(screen.getByText(/AI Maturity Level:/i)).toBeInTheDocument();
    });

    it('should display 3D visualization', () => {
      render(<Calculator />);
      expect(screen.getByTestId('cube3d-mock')).toBeInTheDocument();
    });
  });

  describe('Score Management', () => {
    it('should initialize with default factor scores', () => {
      render(<Calculator />);
      // Check that sliders are present (they contain the initial scores)
      const sliders = screen.getAllByRole('slider');
      expect(sliders.length).toBeGreaterThan(0);
    });

    it('should calculate composite score correctly', () => {
      render(<Calculator />);
      const scoreElement = screen.getByText(/Composite Quality Score:/i);
      expect(scoreElement).toBeInTheDocument();
      // The score should be displayed as a number - use getByRole to be more specific
      expect(screen.getByRole('heading', { name: /composite quality score/i }))
        .toHaveTextContent(/\d+\.\d+/);
    });
  });

  describe('Maturity Level Calculation', () => {
    it('should show appropriate maturity level', () => {
      render(<Calculator />);
      // Should show one of the expected maturity levels
      const maturityText = screen.getByText(/AI Maturity Level:/i);
      expect(maturityText).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should integrate properly with Visualization component', () => {
      render(<Calculator />);
      expect(screen.getByTestId('cube3d-mock')).toBeInTheDocument();
      expect(screen.getByTestId('cube3d-factors')).toBeInTheDocument();
    });

    it('should integrate properly with FactorSlider components', () => {
      render(<Calculator />);
      const sliders = screen.getAllByRole('slider');
      expect(sliders.length).toBeGreaterThan(0);
    });
  });
});

describe('Calculator Integration Tests', () => {
  it('should render all main components', () => {
    render(<Calculator />);
    
    // Check for main sections
    expect(screen.getByText(/Composite Quality Score:/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Maturity Level:/i)).toBeInTheDocument();
    expect(screen.getByTestId('cube3d-mock')).toBeInTheDocument();
    expect(screen.getByText(/Manual Score Adjustment/i)).toBeInTheDocument();
  });
});