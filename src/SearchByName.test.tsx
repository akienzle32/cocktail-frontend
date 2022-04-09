import { render, screen } from '@testing-library/react';
import { fireEvent, getByRole } from '@testing-library/dom';
import App from './App';
import { MemoryRouter } from 'react-router';
import { Home } from './Home';
import { rest } from 'msw';

test('SearchByName renders with Home page', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const searchByName = screen.getByRole('textbox');
    const searchByIngredients = screen.queryByRole('button', {name: /spirits/i});
  
    expect(searchByName).toBeInTheDocument();
    expect(searchByIngredients).not.toBeInTheDocument();
  });