import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent, getByRole } from '@testing-library/dom';
import App from './App';
import { MemoryRouter } from 'react-router';

test('Login renders with link click', () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const loginLink = screen.getByRole('link', { name: /log in/i});
  fireEvent.click(loginLink);

  const loginComponent = screen.getByRole('button', {name: /log in/i});
  expect(loginComponent).toBeInTheDocument();
})
