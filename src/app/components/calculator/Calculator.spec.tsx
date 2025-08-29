import { customRender as render } from '../../../test-utils';
import Calculator from './Calculator';

describe('Calculator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Calculator />);
    expect(baseElement).toBeTruthy();
  });

  it('should display the 3D visualization', () => {
    const { getByTestId } = render(<Calculator />);
    expect(getByTestId('cube3d-mock')).toBeInTheDocument();
  });
});
