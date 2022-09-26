import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa o componente pokemom.js', () => {
  const More = 'More details';
  const favPoke = 'Pokémon favoritado?';
  test('testa se as informaçoes detalhadas aparecem', () => {
    renderWithRouter(<App />);
    const more = screen.getByRole('link', { name: More });
    expect(more).toBeInTheDocument();
    userEvent.click(more);
    const title = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(title).toBeInTheDocument();
    expect(more).not.toBeInTheDocument();
    const sumary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(sumary).toBeInTheDocument();
    const resume = screen.getByText('This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.');
    expect(resume).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);
    const more = screen.getByRole('link', { name: More });
    expect(more).toBeInTheDocument();
    userEvent.click(more);
    const title = screen.getByRole('heading',
      { name: 'Game Locations of Pikachu', level: 2 });
    expect(title).toBeInTheDocument();

    const getSec = screen.queryAllByRole('img', { name: /location/i });
    expect(getSec).toHaveLength(2);

    const LOC = [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ];

    const image = screen.queryAllByRole('img', { name: 'Pikachu location' });
    LOC.forEach((map, index) => {
      expect(image[index].src).toBe(map.map);
      const name = screen.getByText(map.location);
      expect(name).toBeInTheDocument();
    });
  });

  test('Teste se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    renderWithRouter(<App />);
    const more = screen.getByRole('link', { name: More });
    expect(more).toBeInTheDocument();
    userEvent.click(more);

    const input = screen.getByLabelText(favPoke);
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('checkbox');
  });

  test('Teste se o usuário pode favoritar e desfav pokémon na página de detalhes', () => {
    renderWithRouter(<App />);
    const more = screen.getByRole('link', { name: More });
    expect(more).toBeInTheDocument();
    userEvent.click(more);

    const input = screen.getByLabelText(favPoke);
    expect(input).toBeInTheDocument();

    userEvent.click(input);
    expect(input.checked).toBeTruthy();

    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favLink).toBeInTheDocument();

    userEvent.click(favLink);

    const favList = screen.queryAllByTestId('pokemon-name');
    expect(favList).toHaveLength(1);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    userEvent.click(home);

    const moreDet = screen.getByRole('link', { name: More });
    expect(moreDet).toBeInTheDocument();
    userEvent.click(moreDet);

    const input2 = screen.getByLabelText(favPoke);
    expect(input2).toBeInTheDocument();
    expect(input2.checked).toBeTruthy();

    userEvent.click(input2);
    expect(input2.checked).toBeFalsy();
    userEvent.click(favLink);

    const favList1 = screen.queryAllByTestId('pokemon-name');
    expect(favList1).toHaveLength(0);
  });
});
