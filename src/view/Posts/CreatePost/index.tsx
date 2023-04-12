import { connect } from 'react-redux';

import withRouter from '@view/helper/withRouter';

import { Post } from '@interface/post.type';

import { postActions } from '@redux/slices/post';
import { AppDispatch, RootState } from '@redux/store';

import CreatePost from './CreatePost';

const mapState = (state: RootState, _ownProps: any = {}) => {
  const isLoggedIn = state.auth.isLoggedIn;
  const postData = state.post;

  return {
    apiError: postData.error,
    loading: postData.loading,
    success: postData.success,
    isLoggedIn,
  };
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    createPost: (data: Post) => dispatch(postActions.createPost(data)),
  };
};

const connector = connect(mapState, mapDispatch)(CreatePost);
export default withRouter(connector);
