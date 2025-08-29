import { render } from '@testing-library/react';

import MainMenu from './MainMenu';

describe('MainMenu', () => {
  it('should render successfully', () => {
    const mockOnMenuClick = jest.fn();
    const { baseElement } = render(<MainMenu onMenuClick={mockOnMenuClick} />);
    expect(baseElement).toBeTruthy();
  });
});
