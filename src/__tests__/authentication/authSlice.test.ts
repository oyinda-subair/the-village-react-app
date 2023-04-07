import { AuthData } from '@interface/auth.type';

import authReducer, { authActions } from '@redux/slices/auth';

const initialState: AuthData = {
  loading: false,
  error: null,
  success: false,
  isLoggedIn: false,
  userToken: null,
};

describe('auth reducer', () => {
  test('should return the initial state when passed an empty action', () => {
    const state = undefined;
    const action = { type: '' };
    const result = authReducer(state, action);
    expect(result).toEqual({ ...initialState });
  });
  it('should convert the login response received to an object', () => {
    const state = undefined;
    const loginToken = {
      accessToken: 'token',
      type: 'Bearer',
    };
    const action = { type: authActions.loginUser.fulfilled.type, payload: { ...loginToken } };
    const result = authReducer(state, action);
    expect(result.userToken).toEqual(loginToken);
  });
});
