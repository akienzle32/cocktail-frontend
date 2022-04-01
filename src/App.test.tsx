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

  const searchByIngredientsComponent = screen.getByRole('button', {name: /spirits/i});
  expect(searchByIngredientsComponent).toBeInTheDocument();
})

test('Profile renders with link click', () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const profileLink = screen.getByRole('link', { name: /my profile/i});
  fireEvent.click(profileLink);

  const profileComponent = screen.getByRole('button', {name: /profile/i});
  expect(profileComponent).toBeInTheDocument();
})

test('Back button does not render initially with SearchByIngredients', () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const backButton = screen.queryByRole('button', {name: /go back/i});
  expect(backButton).not.toBeInTheDocument();
})

test('Back button renders after click of category', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  
  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const spiritsBtn = screen.getByRole('button', {name: /spirits/i});
  fireEvent.click(spiritsBtn);

  const backButton = screen.getByRole('button', {name: /go back/i});
  expect(backButton).toBeInTheDocument();
})
