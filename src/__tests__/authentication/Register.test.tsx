import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../utils/testUtils';
import Register from '../../view/Authentication/Register';

describe('Register User', () => {
  afterEach(() => {
    cleanup;
    jest.resetAllMocks();
  });

  test('Firstname is not provided and confirmPassword input does not match', async () => {
    renderWithProviders(<Register />);
    const submitButton = await screen.findByTestId('register');

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const confirmPasswordInput = screen.getByTestId('confirmPassword');
    await userEvent.type(emailInput, 'email@email.com');
    await userEvent.type(passwordInput, 'password');
    await userEvent.type(confirmPasswordInput, 'email@email.com');

    expect(emailInput).toHaveValue('email@email.com');
    expect(passwordInput).toHaveValue('password');

    await userEvent.click(submitButton);

    expect(screen.getByText(/First name is required/)).toBeInTheDocument();
    expect(screen.getByText(/Passwords does not match/)).toBeInTheDocument();
  });
});
