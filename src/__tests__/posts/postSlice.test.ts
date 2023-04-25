import { FetchUserPosts } from '@interface/post.type';

import postReducer, { postActions } from '@redux/slices/post';

import { mockPostResponse } from '../helper';

const initialState: FetchUserPosts = {
  loading: false,
  userPosts: [],
  error: null,
  success: false,
};

describe('Post Slice', () => {
  test('should create return initial state when passed empty action', () => {
    const state = undefined;
    const action = { type: '' };
    const result = postReducer(state, action);

    expect(result).toEqual({ ...initialState });
  });

  test('should convert createpost response received to an object', () => {
    const state = undefined;
    const createPostResponse = mockPostResponse();

    const action = {
      type: postActions.createPost.fulfilled.type,
      payload: { ...createPostResponse },
    };

    const result = postReducer(state, action);
    expect(result.userPosts).toEqual([createPostResponse]);
  });

  test('should add to state object with new response receives', () => {
    const createPostResponse1 = mockPostResponse();
    const createPostResponse2 = mockPostResponse({ title: 'Testing Again 2' });

    initialState.userPosts = [createPostResponse1];
    const state = initialState;

    const action = {
      type: postActions.createPost.fulfilled.type,
      payload: { ...createPostResponse2 },
    };

    const result = postReducer(state, action);
    expect(result.userPosts).toEqual([createPostResponse1, createPostResponse2]);
  });
});
