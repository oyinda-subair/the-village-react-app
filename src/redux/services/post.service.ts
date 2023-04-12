import { createAsyncThunk } from '@reduxjs/toolkit';

import { CreateNewPost } from '@/interface/payload.type';
import { Post } from '@/interface/post.type';

import http from './helper/axiosClient';
import PropertyNormalizer from './helper/propertyNormalizer';

const createPost = createAsyncThunk('post/createpost', async (data: Post, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const normalizedPayload: CreateNewPost = PropertyNormalizer.reverseNormalize(data);
    console.log('post creation payload', normalizedPayload);

    const response = await http.post('/posts/', normalizedPayload, config);

    const result: Post = PropertyNormalizer.normalize(response.data);

    return result;
  } catch (error: any) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

const PostService = {
  createPost,
};

export default PostService;
