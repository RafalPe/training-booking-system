import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, className = '', ...props }) => {
  const baseStyles =
    'w-full py-2 rounded smxt-lg font- text-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2';

  const stateStyles = disabled
    ? 'bg-purple-300 cursor-not-allowed'
    : 'bg-purple-600 hover:bg-purple-700 hover:ring-2 hover:ring-purple-600';

  return (
    <button disabled={disabled} className={`${baseStyles} ${stateStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
