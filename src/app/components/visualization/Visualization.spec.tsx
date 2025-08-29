import { render } from '@testing-library/react';

import Visualization from './Visualization';

describe('Visualization', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Visualization />);
    expect(baseElement).toBeTruthy();
  });
});
