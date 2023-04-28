import React from 'react';

import { mockAuthenticationResponse } from '@/utils/testMockResponse';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '@view/Authentication/Login';

import http from '@redux/services/helper/axiosClient';
import { store } from '@redux/store';

import { renderWithProviders } from '@utils/testUtils';

global.FormData = FormData;

jest.mock('../../redux/services/helper/axiosClient');
const mockHttpClient = jest.mocked(http, { shallow: false });

describe('Login User', () => {
  afterEach(() => {
    cleanup; // eslint-disable-line
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

    await userEvent.clear(emailInput);

    await userEvent.click(submitButton);

    expect(screen.getByText(/Please Enter Email Address/)).toBeInTheDocument();
  });

  test('dispatch loginUser func onSubmit', async () => {
    const loginData = {
      username: 'email@email.com',
      password: 'password',
    };
    const mPost = mockHttpClient.post.mockResolvedValue(mockAuthenticationResponse);

    const user = userEvent.setup();

    renderWithProviders(<Login />, { store });
    const submitButton = await screen.findByTestId('login');

    await user.type(screen.getByTestId('email'), loginData.username);
    await user.type(screen.getByTestId('password'), loginData.password);

    await user.click(submitButton);

    expect(jest.isMockFunction(mPost)).toBeTruthy();

    const formDataExpect = {
      grant_type: 'password',
      ...loginData,
    };

    expect(mPost).toHaveBeenCalledTimes(1);

    expect(mPost).toBeCalledWith('/auth/login', expect.any(FormData));
    const callArgs: any = mPost.mock.calls[0][1];
    if (callArgs) {
      const body = callArgs as FormData;
      const formData = Array.from(body.entries()).reduce(
        (acc, f) => ({ ...acc, [f[0]]: f[1] }),
        {},
      );
      expect(formData).toMatchObject(formDataExpect);
    }
  });
});
