import { render } from '@testing-library/react';

import CompositeScoreDisplay from './CompositeScoreDisplay';

describe('CompositeScoreDisplay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompositeScoreDisplay score={0} />);
    expect(baseElement).toBeTruthy();
  });
});
