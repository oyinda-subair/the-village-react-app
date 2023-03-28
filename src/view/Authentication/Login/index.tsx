import { connect } from 'react-redux';
import { AuthData, LoginData } from '../../../interfaces/auth.type';
import { authActions } from '../../../redux/slices/auth';
import { RootState, AppDispatch } from '../../../redux/store';
import withRouter from '../../helper/withRouter';
import Login from './Login';

const mapState = (state: RootState, _ownProps: any = {}) => {
  const auth: AuthData = state.auth;
  return {
    userInfo: auth.userInfo,
    apiError: auth.error,
    loading: auth.loading,
    isLoggedIn: auth.success,
  };
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    userLogin: (data: LoginData) => dispatch(authActions.loginUser(data)),
    // getUserData: () => dispatch(authActions.fetchUserData()),
  };
};

const connector = connect(mapState, mapDispatch)(Login);
export default withRouter(connector);
