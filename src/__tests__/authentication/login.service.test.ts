import MockAdapter from 'axios-mock-adapter';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AuthService from '@redux/services/auth.service';
import http from '@redux/services/helper/axiosClient';
import { AppDispatch, RootState } from '@redux/store';

import { mockAuthenticationResponse } from '@utils/testMockResponse';

const middlewares = [thunk];
const mockStore = createMockStore<RootState, AppDispatch>(middlewares);

describe('Mock auth service', () => {
  let mock: MockAdapter;
  let store: any;

  beforeEach(() => {
    mock = new MockAdapter(http);
    store = mockStore(undefined);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('return token when login user is successful', async () => {
    mock.onPost('/auth/login').reply(200, mockAuthenticationResponse);
    const loginData = {
      username: 'email@email.com',
      password: 'password',
    };

    const result = await store.dispatch(AuthService.loginUser(loginData));
    const response = result.payload;

    expect(result.type).toBe('auth/login/fulfilled');
    expect(response).toEqual(mockAuthenticationResponse);
  });
});
