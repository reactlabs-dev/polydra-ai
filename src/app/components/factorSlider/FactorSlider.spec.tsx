import React from 'react';
import { render } from '@testing-library/react';
import { DEFAULT_FACTORS } from '@/constants';
import { Factor } from '@/types';
import FactorSlider from './FactorSlider';

describe('FactorSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FactorSlider factor={DEFAULT_FACTORS[0] as Factor} onChange={() => {}} />);
    expect(baseElement).toBeTruthy();
  });
});
