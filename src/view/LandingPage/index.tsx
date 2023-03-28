import { connect } from 'react-redux';
import { AuthData } from '../../interfaces/auth.type';
import { FetchUserData } from '../../interfaces/user.type';
import { selectUserData, userActions } from '../../redux/slices/user';
import { AppDispatch, RootState } from '../../redux/store';
import withRouter from '../helper/withRouter';
import LandingPage from './LandingPage';

const mapState = (state: RootState, _ownProps: any = {}) => {
  const user: FetchUserData = state.user;
  const isLoggedIn = state.auth.isLoggedIn;
  return {
    userDetails: user.userDetails,
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
