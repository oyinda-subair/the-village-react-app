import React from 'react';

interface RegularButtonProps {
  loading: boolean;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  id?: string;
  secondary?: boolean;
}

const RegularButton: React.FC<RegularButtonProps> = (props: RegularButtonProps) => {
  const { loading, title, onClick, id, secondary } = props;

  const buttonStyle = secondary
    ? 'bg-red-400 active:bg-red-500'
    : 'bg-indigo-500 active:bg-indigo-600';

  return (
    <button
      className={
        buttonStyle +
        ' text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
      }
      type='button'
      onClick={onClick}
      data-testid={id}
    >
      {loading && (
        <svg
          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {title}
    </button>
  );
};

export default RegularButton;
