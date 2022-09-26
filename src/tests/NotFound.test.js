import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

test(' Teste o componente <NotFound.js />', () => {
  render(<NotFound />);
  const title = screen.getByRole('heading',
    { name: /Page requested not found/i, level: 2 });
  expect(title).toBeInTheDocument();

  const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  const image = screen.getByRole('img',
    { name: 'Pikachu crying because the page requested was not found' });
  expect(image.src).toBe(URL);
});
