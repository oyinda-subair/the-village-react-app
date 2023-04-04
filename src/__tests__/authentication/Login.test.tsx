import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../utils/testUtils';
import Login from '../../view/Authentication/Login';

describe('Login User', () => {
  afterEach(() => {
    cleanup;
    jest.resetAllMocks();
  });

  test('Entering invalid username', async () => {
    renderWithProviders(<Login />);
    const submitButton = await screen.findByTestId('login');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');

    await userEvent.type(emailInput, 'email@email.com');
    await userEvent.type(passwordInput, 'password');

    expect(emailInput).toHaveValue('email@email.com');
    expect(passwordInput).toHaveValue('password');

    // await userEvent.type(emailInput, '');
    await userEvent.clear(emailInput);

    await userEvent.click(submitButton);

    expect(screen.getByText(/Please Enter Email Address/)).toBeInTheDocument();
  });
});
