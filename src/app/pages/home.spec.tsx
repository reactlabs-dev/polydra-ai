import { render } from '../../test-utils';

import Home from './home';

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });
});
