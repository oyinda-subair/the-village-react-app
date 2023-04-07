import { connect } from 'react-redux';

import withRouter from '@view/helper/withRouter';

import { FetchUserData } from '@interface/user.type';

import { userActions } from '@redux/slices/user';
import { AppDispatch, RootState } from '@redux/store';

import LandingPage from './LandingPage';

const mapState = (state: RootState, _ownProps: any = {}) => {
  const user: FetchUserData = state.user;
  const isLoggedIn = state.auth.isLoggedIn;
  return {
    userDetails: user?.userDetails || {},
    apiError: user.error,
    loading: user.loading,
    isLoggedIn,
  };
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    getUserData: () => dispatch(userActions.fetchUserData()),
  };
};

const connector = connect(mapState, mapDispatch)(LandingPage);
export default withRouter(connector);
