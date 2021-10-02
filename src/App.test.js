import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cart', () => {
  render(<App />);
  const linkElement = screen.getByText(/Shopping cart/i);
  expect(linkElement).toBeInTheDocument();
});
