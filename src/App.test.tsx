import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent, getByRole } from '@testing-library/dom';
import App from './App';
import { MemoryRouter } from 'react-router';
import { Home } from './Home';

test('SearchByName renders with Home page', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  const searchByName = screen.getByRole('textbox');
  const searchByIngredients = screen.queryByRole('button', {name: /spirits/i});

  expect(searchByName).toBeInTheDocument();
  expect(searchByIngredients).not.toBeInTheDocument();
});

test('SearchByIngredients renders with button press', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const searchByName = screen.queryByRole('textbox');

  const spiritsBtn = screen.getByRole('button', {name: /spirits/i});
  expect(spiritsBtn).toBeInTheDocument();
  expect(searchByName).not.toBeInTheDocument();
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

test('Back button functions correctly', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  
  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const spiritsBtn = screen.getByRole('button', {name: /spirits/i});
  fireEvent.click(spiritsBtn);

  const backBtn = screen.getByRole('button', {name: /go back/i});
  fireEvent.click(backBtn);

  const nextSpiritsBtn = screen.queryByRole('button', {name: /spirits/i});
  expect(nextSpiritsBtn).toBeInTheDocument();
})

test('Subcategories render after click of category', () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const spiritsBtn = screen.getByRole('button', {name: /spirits/i});
  fireEvent.click(spiritsBtn);

  const ginBtn = screen.queryByRole('button', {name: /gin/i});
  expect(ginBtn).toBeInTheDocument();
})

test('MyBar ingredients persist after navigating to Profile', () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const spiritsBtn = screen.getByRole('button', {name: /spirits/i});
  fireEvent.click(spiritsBtn);

  const ginBtn = screen.getByRole('button', {name: /gin/i});
  fireEvent.click(ginBtn);

  const profileLink = screen.getByRole('link', {name: /my profile/i});
  fireEvent.click(profileLink);

  const homeLink = screen.getByRole('link', {name: /the cocktail library/i});
  fireEvent.click(homeLink);

  const nextSearchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(nextSearchByIngredientsBtn);

  const nextGinBtn = screen.getByRole('button', {name: /gin/i});
  expect(nextGinBtn).toBeInTheDocument();

})
