import React from 'react';

import { render } from '@testing-library/react';
import FactorSlider from './FactorSlider';
import { initialFactors } from './FactorSlider';

describe('FactorSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FactorSlider factor={initialFactors[0]} onChange={() => 3} />);
    expect(baseElement).toBeTruthy();
  });
});
