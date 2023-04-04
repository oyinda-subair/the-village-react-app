import React from 'react';

import { cleanup, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import App from '../App';
import { UserInfoData } from '../interfaces/user.type';
import { renderWithProviders } from '../utils/testUtils';

const mockStore = configureStore();

const initialState = {
  auth: {
    loading: false,
    error: '',
    success: false,
    isLoggedIn: false,
  },
  user: {
    loading: false,
    userDetails: {},
    error: null,
    success: false,
  },
};

// Tests
describe('Landing Page', () => {
  afterEach(() => {
    cleanup;
    jest.resetAllMocks();
  });

  test('Renders main page correctly when user is logged out', async () => {
    const store = mockStore(initialState);
    // Setup
    renderWithProviders(<App />, { store });
    expect(screen.getByText(/Welcome Back!/)).toBeInTheDocument();
  });

  test('Renders main page correctly when user is logged in', async () => {
    const fakeUsers: UserInfoData = {
      id: '2b3g48hdjsdj',
      firstName: 'Test',
      surname: 'Account',
      email: 'test.account@example.com',
      isSuperuser: false,
      role: 'user',
      createdAt: '2022-10-03',
      updatedAt: '2022-10-03',
    };

    initialState.user.userDetails = fakeUsers;
    const store = mockStore(initialState);
    // Setup
    renderWithProviders(<App />, { store });
    expect(screen.getByText(/Welcome Back!/)).toBeInTheDocument();
    expect(screen.getByText(/Test/)).toBeInTheDocument();
  });
});