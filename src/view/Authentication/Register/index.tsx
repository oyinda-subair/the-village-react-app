import { connect } from 'react-redux';

import withRouter from '@view/helper/withRouter';

import { AuthData, UserCreationData } from '@interface/auth.type';

import { authActions } from '@redux/slices/auth';
import { AppDispatch, RootState } from '@redux/store';

import Register from './Register';

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
    userRegistration: (data: UserCreationData) => dispatch(authActions.registerUser(data)),
  };
};

const connector = connect(mapState, mapDispatch)(Register);
export default withRouter(connector);
