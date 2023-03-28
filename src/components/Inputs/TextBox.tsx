import React from 'react';

interface TextboxProps {
  label: string;
  name: string;
  error: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  required?: boolean;
}

const TextBox = (props: TextboxProps) => {
  const { label, name, error, value, type = 'text', onChange, required } = props;

  return (
    <div>
      <label
        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
        htmlFor={'grid-' + { name }}
      >
        {label} {required && <span className='text-red-600'>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
      />
      {error && <p className='text-red-500 text-xs italic'>{error}</p>}
    </div>
  );
};

export default TextBox;
