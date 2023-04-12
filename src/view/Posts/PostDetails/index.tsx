import { connect } from 'react-redux';

import withRouter from '@view/helper/withRouter';

import { Post } from '@interface/post.type';

import { postActions } from '@redux/slices/post';
import { AppDispatch, RootState } from '@redux/store';

import PostDetails from './PostDetails';

const mapState = (state: RootState, _ownProps: any = {}) => {
  const isLoggedIn = state.auth.isLoggedIn;
  const postData = state.post;

  return {
    apiError: postData.error,
    loading: postData.loading,
    success: postData.success,
    postData: postData.userPosts,
    isLoggedIn,
  };
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {};
};

const connector = connect(mapState, mapDispatch)(PostDetails);
export default withRouter(connector);
