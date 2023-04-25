import React from 'react';

import CreatePost from '@/view/Posts/CreatePost';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@utils/testUtils';

describe('Create Post', () => {
  afterEach(() => {
    cleanup; // eslint-disable-line
    jest.resetAllMocks();
  });

  test('fail for reuired fields', async () => {
    renderWithProviders(<CreatePost />);

    const submitButton = await screen.findByTestId('create');

    const titleInput = screen.getByTestId('title');
    const descriptionInput = screen.getByTestId('description');

    await userEvent.type(titleInput, 'Title');
    await userEvent.type(descriptionInput, 'password');

    await userEvent.click(submitButton);

    expect(screen.getByText(/Category is required/)).toBeInTheDocument();
  });
});
