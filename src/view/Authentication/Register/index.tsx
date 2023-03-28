import { connect } from 'react-redux';

import withRouter from '../../helper/withRouter';
import Register from './Register';
import { AppDispatch, RootState } from '../../../redux/store';
import { authActions } from '../../../redux/slices/auth';
import { UserRegistration } from '../../../interfaces/user.type';

const mapState = (_state: RootState, _ownProps: any = {}) => {
  return {};
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    userRegistration: (data: UserRegistration) => dispatch(authActions.registerUser(data)),
  };
};

const connector = connect(mapState, mapDispatch)(Register);
export default withRouter(connector);
