import React, { useState } from 'react';
import { toast } from 'react-toastify';

import RegularButton from '@components/Buttons/RegularButton';
import SubmitButton from '@components/Buttons/SubmitButton';
import Tiptap from '@components/Inputs/RichText/Tiptap';
import TextBox from '@components/Inputs/TextBox';

import { Post } from '@interface/post.type';

import { history } from '@utils/history';
import { isEmpty } from '@utils/validator';

interface NewPostProps {
  apiError: any;
  loading: boolean;
  isLoggedIn: boolean;
  success: boolean;
  createPost: (data: Post) => any;
}

const NewPost = (props: NewPostProps) => {
  const defaultValues = {
    title: '',
    description: '',
    content: '',
    category: '',
    imageUrl: '',
  };

  const [error, setError] = useState(defaultValues);
  const [createPostForm, setCreatePostForm] = useState(defaultValues);
  const [enableEditor, setEnableEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(false);

  // console.log(content);

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(props.loading);
    setError(defaultValues);

    createPostForm.content = content.toString();

    const formError = validateInput();

    if (!isEmpty(formError as typeof defaultValues)) {
      setLoading(false);
      return setError(formError);
    }

    const { createPost } = props;
    createPost(createPostForm)
      .then((response: any) => {
        if (response.type === 'post/createpost/rejected') {
          setLoading(false);
          const msg: any = { message: response.payload };
          toast.error('Error registring user', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return setError({ ...msg });
        } else {
          toast.success('Successfully created new post!', {
            position: toast.POSITION.TOP_RIGHT,
          });

          history.navigate(`/posts/${response.payload.id}`);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        setError(err);
        alert(err);
      });
  };

  const handleCancel = (e: any) => {
    e.preventDefault();

    setCreatePostForm(defaultValues);
    setContent(false);
  };

  const validateInput = () => {
    const formError: any = {};
    // createPostForm.content = content
    const { title, content, category } = createPostForm;

    if (!title) {
      formError.title = 'Title is required';
    }

    if (!content) {
      formError.content = 'Post content field is required';
    }

    if (!category) {
      formError.category = 'Category is required';
    }

    return formError;
  };

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words bg-blueGray-200 w-full mb-6 shadow-xl rounded-lg mt-16'>
        <div className='px-6'>
          <div className='rounded-t mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <h6 className='text-blueGray-700 text-xl font-bold'>Create Post</h6>
            </div>
          </div>
          <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
            <form onSubmit={(e) => handleCreatePost(e)}>
              <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'></h6>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-12/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <TextBox
                      type={'text'}
                      name={'title'}
                      label={'Title'}
                      error={error?.title}
                      value={createPostForm.title}
                      onChange={(e) =>
                        setCreatePostForm({ ...createPostForm, title: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className='w-full lg:w-12/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <TextBox
                      type={'text'}
                      name={'description'}
                      label={'Description'}
                      error={error?.description}
                      value={createPostForm.description}
                      onChange={(e) =>
                        setCreatePostForm({ ...createPostForm, description: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <h6 className='text-blueGray-600 text-sm mt-3 mb-6 font-bold uppercase'>
                Write a Post
              </h6>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-12/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <Tiptap
                      content={content}
                      setContent={setContent}
                      placeholder='Add up to 5 points describing the product...'
                    />
                  </div>
                </div>
                <div className='w-full lg:w-12/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <TextBox
                      type={'text'}
                      name={'category'}
                      label={'Category'}
                      error={error?.category}
                      value={createPostForm.category}
                      onChange={(e) =>
                        setCreatePostForm({ ...createPostForm, category: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className='w-full lg:w-12/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <TextBox
                      type={'text'}
                      name={'imageUrl'}
                      label={'Image Url'}
                      error={error?.imageUrl}
                      value={createPostForm.imageUrl}
                      onChange={(e) =>
                        setCreatePostForm({ ...createPostForm, imageUrl: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap'>
                <div className='w-full lg:w-12/12 px-4'>
                  <div className='text-center flex justify-end'>
                    <RegularButton
                      loading={loading}
                      title='Cancel'
                      id='reset'
                      secondary
                      onClick={(e) => handleCancel(e)}
                    />
                    <SubmitButton loading={loading} title='Submit' id='create' />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
