import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchUserPosts, Post } from '@interface/post.type';

import PostService from '@services/post.service';

import { RootState } from '../store';

const initialState: FetchUserPosts = {
  loading: false,
  userPosts: [],
  error: null,
  success: false,
};

const createReducers = () => {
  return {};
};

const createExtraReducers = () => {
  const { createPost } = PostService;
  return (builder: any) => {
    builder
      .addCase(createPost.pending, (state: FetchUserPosts) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state: FetchUserPosts, action: PayloadAction<Post>) => {
        const { payload } = action;
        state.loading = false;
        state.success = true;
        state.userPosts = [...state.userPosts, payload];
      })
      .addCase(createPost.rejected, (state: FetchUserPosts, action: PayloadAction) => {
        state.loading = false;
        state.error = action.payload;
      });
  };
};

const name = 'post';
const reducers = createReducers();
const extraReducers = createExtraReducers();
const postSlice = createSlice({ name, initialState, reducers, extraReducers });

const { reducer, actions } = postSlice;

export const getPostDataById = (state: RootState, postId: string) => {
  const post = state.post.userPosts.find((e) => e.id === postId);
  return post;
};

export const postActions = { ...actions, ...PostService };
export default reducer;
