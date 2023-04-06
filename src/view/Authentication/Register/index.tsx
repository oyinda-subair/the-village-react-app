import { connect } from 'react-redux';

import { UserCreationData } from '../../../interfaces/auth.type';
import { authActions } from '../../../redux/slices/auth';
import { AppDispatch, RootState } from '../../../redux/store';
import withRouter from '../../helper/withRouter';

import Register from './Register';

const mapState = (_state: RootState, _ownProps: any = {}) => {
  return {};
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    userRegistration: (data: UserCreationData) => dispatch(authActions.registerUser(data)),
  };
};

const connector = connect(mapState, mapDispatch)(Register);
export default withRouter(connector);
