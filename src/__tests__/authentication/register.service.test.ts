
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

  test('return token when when user data registration is successful', async () => {
    mock
      .onPost('/auth/register')
      .reply(201, mockAuthenticationResponse({ success: true, data: {} }));
    const data = {
      firstName: 'Oyin',
      surname: 'S',
      email: 'oyins@example.com',
      password: 'password1',
      isSuperuser: false,
    };

    const result = await store.dispatch(AuthService.registerUser(data));
    const response = result.payload;

    expect(result.type).toBe('auth/register/fulfilled');
    expect(response).toEqual(mockAuthenticationResponse({ success: true, data: {} }));
  });
});
