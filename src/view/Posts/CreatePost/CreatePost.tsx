import React from 'react';

import NewPost from '@/components/Cards/Posts/NewPost';
import { Post } from '@/interface/post.type';

interface CreatePostProps {
  apiError: any;
  loading: boolean;
  isLoggedIn: boolean;
  success: boolean;
  createPost: (data: Post) => any;
}

const CreatePost = (props: CreatePostProps) => {
  return (
    <>
      <main className='profile-page'>
        <div className='flex top-0 w-full h-full'>
          <div className='container mx-auto px-4 h-full'>
            <div className='flex content-center items-center justify-center h-full'>
              <div className='w-full lg:w-8/12 px-4'>
                <NewPost {...props} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default CreatePost;
