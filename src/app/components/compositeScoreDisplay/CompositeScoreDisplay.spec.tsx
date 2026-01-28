import { render } from '../../../test-utils';

import CompositeScoreDisplay from './CompositeScoreDisplay';

describe('CompositeScoreDisplay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompositeScoreDisplay score={0} />);
    expect(baseElement).toBeTruthy();
  });
});
