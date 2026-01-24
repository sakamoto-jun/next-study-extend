import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {}

const Button = (props: Props) => {
  const { className, children, ...rest } = props;

  return (
    <button
      className={`w-full p-[12px] text-[18px] text-white bg-black rounded-[10px] disabled:text-zinc-200 disabled:bg-zinc-400 hover:scale-[1.01] active:scale-[0.99] transition-transform ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
