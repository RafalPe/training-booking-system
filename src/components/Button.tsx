import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, className = '', ...props }) => {
  const baseStyles =
    'w-full py-2 rounded smxt-lg font- text-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2';

  const stateStyles = disabled
    ? 'bg-button-disabled cursor-not-allowed'
    : 'bg-brand-purple hover:opacity-90';

  return (
    <button disabled={disabled} className={`${baseStyles} ${stateStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
