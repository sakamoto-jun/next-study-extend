import { ComponentProps } from 'react';

interface Props extends ComponentProps<'input'> {}

const Input = (props: Props) => {
  const { className, ...rest } = props;

  return (
    <input
      className={`block w-full p-[12px] outline-none border border-gray-300 rounded-md focus:border-black hover:bg-gray-100 transition-colors ${className}`}
      {...rest}
    />
  );
};

export default Input;
