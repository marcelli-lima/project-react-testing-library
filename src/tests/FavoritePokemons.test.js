import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

test('Teste o componente FavoritePokemons.js', () => {
  render(<FavoritePokemons />);
  const text = screen.getByText(/No favorite pokemon found/i);
  expect(text).toBeInTheDocument();
});

test('Testa se os os pokemons favoritados são listados em <FavoritePokemons />', () => {
  renderWithRouter(<App />);
  const PokemonsDet = screen.getByRole('link', { name: /More details/i });
  userEvent.click(PokemonsDet); // entramos no link para ver os detalhes
  const favCheckBox = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
  userEvent.click(favCheckBox);
  const favPokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
  userEvent.click(favPokemons);
  const PokemonPeso = screen.getByText(/Average weight/i);
  expect(PokemonPeso).toBeInTheDocument();
});
