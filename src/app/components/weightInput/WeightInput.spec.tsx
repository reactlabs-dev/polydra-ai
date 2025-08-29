import { render } from '@testing-library/react';

import WeightInput from './WeightInput';

describe('WeightInput', () => {
  const mockFactor = {
    name: 'Test Factor',
    score: 0.5,
    weight: 1.0
  };

  const mockOnChange = jest.fn();

  it('should render successfully', () => {
    const { baseElement } = render(
      <WeightInput factor={mockFactor} onChange={mockOnChange} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should display factor name', () => {
    const { getByText } = render(
      <WeightInput factor={mockFactor} onChange={mockOnChange} />
    );
    expect(getByText(/Test Factor Weight/i)).toBeTruthy();
  });
});
