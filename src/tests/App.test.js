import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testando o componente App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { history } = renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: 'Pokédex' });
    expect(title).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('testa os links', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  test('testa o link home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('testa o link about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('testa o link about', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('testa a pagina not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-not-found');
    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});
