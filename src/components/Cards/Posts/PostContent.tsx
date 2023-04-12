import React from 'react';

import parse from 'html-react-parser';

interface PostContentProps {
  content: string;
}
const PostContent = (props: PostContentProps) => {
  return (
    <>
      <div className='ProseMirror'>{parse(props.content)}</div>
    </>
  );
};

export default PostContent;
