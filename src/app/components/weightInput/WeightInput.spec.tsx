import { render } from '@testing-library/react';

import WeightInput from './WeightInput';

describe('WeightInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WeightInput />);
    expect(baseElement).toBeTruthy();
  });
});
