import { render } from '@testing-library/react';
import { DEFAULT_FACTORS } from '@/constants';
import { Factor } from '@/types';
import Visualization from './Visualization';

describe('Visualization', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Visualization factors={DEFAULT_FACTORS as Factor[]} />);
    expect(baseElement).toBeTruthy();
  });
});
