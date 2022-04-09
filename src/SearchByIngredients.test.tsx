import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent, getByRole } from '@testing-library/dom';
import App from './App';
import { MemoryRouter } from 'react-router';
import { Home } from './Home';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
    rest.get(`${process.env.REACT_APP_API}cocktails/ingredients/categories`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
              {"category": "Spirits"}, 
              {"category": "Fortified wines"}, 
              {"category": "Bitters"},
               {"category": "Garnishes"}, 
               {"category": "Fruit juices"}, 
               {"category": "Sweeteners"}, 
               {"category": "Liqueurs"}
            ])
        )
    }),
    rest.get(`${process.env.REACT_APP_API}cocktails/ingredients/spirits`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {"id": 1, "name": "Gin", "category": "Spirits"}, 
          {"id": 8, "name": "Rye whiskey", "category": "Spirits"}, 
          {"id": 13, "name": "Tequila", "category": "Spirits"}, 
          {"id": 16, "name": "White rum", "category": "Spirits"}
        ])
      )
    })
]

const server = setupServer(...handlers);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('SearchByIngredients renders with button press', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const spiritsBtn = screen.findByRole('button', {name: /spirits/i});
  waitFor(() => expect(spiritsBtn).toBeInTheDocument());
})

test('Back button does not render initially with SearchByIngredients', () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const backButton = screen.queryByRole('button', {name: /go back/i});
  expect(backButton).not.toBeInTheDocument();
})

test('Back button renders after click of category', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  
  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const spiritsBtn = await screen.findByRole('button', {name: /spirits/i});
  fireEvent.click(spiritsBtn);

  const backButton = await screen.findByRole('button', {name: /go back/i});
  waitFor(() => expect(backButton).toBeInTheDocument());
})

test('Back button functions correctly', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  
  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const spiritsBtn = await screen.findByRole('button', {name: /spirits/i});
  fireEvent.click(spiritsBtn);

  const backBtn = await screen.findByRole('button', {name: /go back/i});
  fireEvent.click(backBtn);

  const nextSpiritsBtn = await screen.findByRole('button', {name: /spirits/i});
  expect(nextSpiritsBtn).toBeInTheDocument();
})

test('Subcategories render after click of category', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const spiritsBtn = await screen.findByRole('button', {name: /spirits/i});
  fireEvent.click(spiritsBtn);

  const ginBtn = await screen.findByRole('button', {name: /gin/i});
  waitFor(() => expect(ginBtn).toBeInTheDocument());
})


test('The search component to display persists after navigating to Login', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const loginLink = screen.getByRole('link', {name: /log in/i});
  fireEvent.click(loginLink);

  const homeLink = screen.getByRole('link', {name: /the cocktail library/i});
  fireEvent.click(homeLink);

  const spiritsBtn = await screen.findByRole('button', {name: /spirits/i});
  waitFor(() => expect(spiritsBtn).toBeInTheDocument());
})

test('MyBar ingredients persist after navigating to Login', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const searchByIngredientsBtn = screen.getByRole('button', {name: /search by ingredients/i});
  fireEvent.click(searchByIngredientsBtn);

  const spiritsBtn = await screen.findByRole('button', {name: /spirits/i});
  fireEvent.click(spiritsBtn);

  const ginBtn = await screen.findByRole('button', {name: /gin/i});
  fireEvent.click(ginBtn);

  const loginLink = screen.getByRole('link', {name: /log in/i});
  fireEvent.click(loginLink);

  const homeLink = screen.getByRole('link', {name: /the cocktail library/i});
  fireEvent.click(homeLink);

  const nextGinBtn = screen.getByRole('button', {name: /gin/i});
  expect(nextGinBtn).toBeInTheDocument();
})