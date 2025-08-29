import { render } from '@testing-library/react';

import StatisticsBanner from './StatisticsBanner';

describe('StatisticsBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StatisticsBanner />);
    expect(baseElement).toBeTruthy();
  });
});
