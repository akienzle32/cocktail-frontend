import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent, getByRole } from '@testing-library/dom';
import App from './App';
import { MemoryRouter } from 'react-router';
import { Home } from './Home';

test('SearchByName renders with Home page', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  const searchByName = screen.getByRole('textbox');

  expect(searchByName).toBeInTheDocument();
});

test('SearchByIngredients renders with button press', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const searchByIngredientsComponent = screen.getByRole('button', {name: /gin/i});
  expect(searchByIngredientsComponent).toBeInTheDocument();
})
