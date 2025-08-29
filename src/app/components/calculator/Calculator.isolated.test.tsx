/**
 * Calculator Isolated Tests
 * Tests Calculator component in isolation with mocked dependencies
 */
import { customRender as render, screen } from '../../../test-utils';
import Calculator from './Calculator';

describe('Calculator - Isolated Tests', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Calculator />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with data-testid prop', () => {
    render(<Calculator data-testid="test-calculator" />);
    expect(screen.getByTestId('test-calculator')).toBeInTheDocument();
  });

  it('should include mocked Cube3D component', () => {
    render(<Calculator />);
    expect(screen.getByTestId('cube3d-mock')).toBeInTheDocument();
  });
});