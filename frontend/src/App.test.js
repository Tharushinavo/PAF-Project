import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title', () => {
  render(<App />);
  const heading = screen.getByText(/Foodie Social/i);
  expect(heading).toBeInTheDocument();
});

