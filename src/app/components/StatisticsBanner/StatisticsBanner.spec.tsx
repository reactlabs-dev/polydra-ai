import { render } from '@testing-library/react';

import StatisticsBanner from './StatisticsBanner';

describe('StatisticsBanner', () => {
  const mockFacts = [
    'Test fact 1',
    'Test fact 2',
    'Test fact 3'
  ];

  it('should render successfully', () => {
    const { baseElement } = render(<StatisticsBanner facts={mockFacts} />);
    expect(baseElement).toBeTruthy();
  });

  it('should display the first fact', () => {
    const { getByText } = render(<StatisticsBanner facts={mockFacts} />);
    expect(getByText('Test fact 1')).toBeTruthy();
  });

  it('should display "Did you know?" header', () => {
    const { getByText } = render(<StatisticsBanner facts={mockFacts} />);
    expect(getByText('Did you know?')).toBeTruthy();
  });
});
