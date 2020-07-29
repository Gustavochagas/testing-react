import React from 'react';
import { mocked } from 'ts-jest/utils';
import { render, act } from '@testing-library/react';
import * as usersService from './services/usersService';
import App from './App';

const getUsers = mocked(usersService.getUsers);

jest.mock('./services/usersService');

const waitMilliseconds = async (ms: number) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, ms));
  });
};
const waitStart = async () => {
  await waitMilliseconds(100);
};

beforeAll(() => {
  getUsers.mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          _id: '5efdbd84ff18702de15bb68f',
          name: 'Gustavo Chagas',
          active: true
        },
        {
          _id: 'e15bb68ff18702de15bb68f',
          name: 'Jon Doe',
          active: false
        }
      ]
    })
  );
});

beforeEach(() => {
  getUsers.mockClear();
});

describe('app', () => {
  test('Simple render', async () => {
    const { container } = render(<App />);
    expect(container.querySelector('.loading')).toBeInTheDocument();
    await act(waitStart);
    expect(container.querySelector('.loading')).not.toBeInTheDocument();
    expect(getUsers).toHaveBeenCalledTimes(1);
  });

  test('Expect has 2 users', async () => {
    const { container } = render(<App />);
    await act(waitStart);
    expect(container.querySelectorAll('.user').length).toBe(2);
  });

  test('Expect error in request', async () => {
    const error = new Error('Error testing');
    (error as any).response = { status: 400 };
    getUsers.mockImplementation(() => Promise.reject(error));
    const { container } = render(<App />);
    expect(container.querySelector('.loading')).toBeInTheDocument();
    await act(waitStart);
    expect(container.querySelector('.loading')).not.toBeInTheDocument();
    expect(container.querySelector('.error')).toBeInTheDocument();
  });
});
