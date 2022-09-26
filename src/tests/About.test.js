import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

test('testa o componente about', () => {
  render(<About />);

  const pokedex = screen.getByText(/This application simulates a Pokédex/i);
  expect(pokedex).toBeInTheDocument();

  const heading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
  expect(heading).toBeInTheDocument();

  const pokedex2 = screen.getByText(/One can filter Pokémons by type/i);
  expect(pokedex2).toBeInTheDocument();

  const paragraph = screen.queryAllByText(/Pokémons/i);
  expect(paragraph).toHaveLength(2);
});
