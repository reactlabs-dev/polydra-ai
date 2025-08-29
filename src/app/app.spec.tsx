import { customRender as render } from '../test-utils';
import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />, { withRouter: true });
    expect(baseElement).toBeTruthy();
  });

  it('should have PolydraIQ as the main title', () => {
    const { getByText } = render(<App />, { withRouter: true });
    expect(getByText(/PolydraIQ/i)).toBeTruthy();
  });

  it('should display the composite quality score', () => {
    const { getByText } = render(<App />, { withRouter: true });
    expect(getByText(/Composite Quality Score:/i)).toBeTruthy();
  });
});
