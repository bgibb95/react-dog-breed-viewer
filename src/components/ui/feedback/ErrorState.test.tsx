import { render, screen } from '@testing-library/react';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  it('renders the error message correctly', () => {
    const errorMessage = 'Failed to fetch breeds';

    render(<ErrorState message={errorMessage} />);

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText('Please try reloading the page or try again later.'),
    ).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
