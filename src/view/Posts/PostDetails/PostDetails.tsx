import React from 'react';
import { useParams } from 'react-router-dom';

import PostContent from '@/components/Cards/Posts/PostContent';
import { getPostDataById } from '@/redux/slices/post';

import { useAppSelector } from '@redux/hook';

const PostDetails: React.FC = () => {
  type PostParams = {
    postId: string;
  };

  const { postId } = useParams<PostParams>();
  const post: any = useAppSelector((state: any) => (postId ? getPostDataById(state, postId) : {}));

  return (
    <>
      <section className='relative py-16'>
        <div className='container mx-auto px-4'>
          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg'>
            <div className='px-6'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
                  <div className='py-6 px-3 mt-32 sm:mt-0'>
                    <button
                      className='bg-sky-500 active:bg-sky-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'
                      type='button'
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className='w-full lg:w-4/12 px-4 lg:order-1'>
                  <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                    <div className='mr-4 p-3 text-center'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-slate-600'>
                        22
                      </span>
                      <span className='text-sm text-slate-400'>Friends</span>
                    </div>
                    <div className='mr-4 p-3 text-center'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-slate-600'>
                        10
                      </span>
                      <span className='text-sm text-slate-400'>Photos</span>
                    </div>
                    <div className='lg:mr-4 p-3 text-center'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-slate-600'>
                        89
                      </span>
                      <span className='text-sm text-slate-400'>Comments</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-10 py-10 border-t border-blueGray-200'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full lg:w-9/12 px-4'>
                    {post && <PostContent content={post.content} />}
                    <a
                      href='#pablo'
                      className='font-normal text-sky-500'
                      onClick={(e) => e.preventDefault()}
                    >
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetails;
