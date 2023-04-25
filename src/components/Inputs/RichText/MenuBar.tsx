import React from 'react';
import { BiCodeBlock } from 'react-icons/bi';
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from 'react-icons/fa';

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='menuBar'>
      <div>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is_active' : ''}
          data-testid='bold'
        >
          <FaBold />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is_active' : ''}
          data-testid='italic'
        >
          <FaItalic />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is_active' : ''}
          data-testid='underline'
        >
          <FaUnderline />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is_active' : ''}
          data-testid='strike'
        >
          <FaStrikethrough />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is_active' : ''}
          data-testid='code'
        >
          <FaCode />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is_active' : ''}
          data-testid='heading2'
        >
          <FaHeading />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is_active' : ''}
          data-testid='heading3'
        >
          <FaHeading className='heading3' />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is_active' : ''}
          data-testid='bullet-list'
        >
          <FaListUl />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is_active' : ''}
          data-testid='ordered-list'
        >
          <FaListOl />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is_active' : ''}
          data-testid='block-quote'
        >
          <FaQuoteLeft />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          data-testid='code-block'
        >
          <BiCodeBlock />
        </button>
      </div>
      <div>
        <button
          type='button'
          onClick={() => editor.chain().focus().undo().run()}
          data-testid='undo'
        >
          <FaUndo />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().redo().run()}
          data-testid='redo'
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
