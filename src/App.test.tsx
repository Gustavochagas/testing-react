import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('app', () => {
  test('Simple render', async () => {
    const { container } = render(<App />);
    expect(container.querySelector('.App')).toBeInTheDocument();
  });
});
