import { connect } from 'react-redux';

import withRouter from '@view/helper/withRouter';

import { AuthData, LoginData } from '@interface/auth.type';

import { authActions } from '@redux/slices/auth';
import { AppDispatch, RootState } from '@redux/store';

import Login from './Login';

const mapState = (state: RootState, _ownProps: any = {}) => {
  const auth: AuthData = state.auth;
  return {
    apiError: auth.error,
    loading: auth.loading,
    isLoggedIn: auth.success,
  };
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    userLogin: (data: LoginData) => dispatch(authActions.loginUser(data)),
  };
};

const connector = connect(mapState, mapDispatch)(Login);
export default withRouter(connector);
