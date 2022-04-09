import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent, getByRole } from '@testing-library/dom';
import App from './App';
import { MemoryRouter } from 'react-router';
import { Home } from './Home';

test('Nav bar renders', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const logoButton = screen.getByRole('link', {name: /the cocktail library/i});
  expect(logoButton).toBeInTheDocument();
})
