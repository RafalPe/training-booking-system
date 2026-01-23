import React, { type InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  errorMessage,
  className = '',
  ...props
}) => {
  const baseInputStyles =
    'w-full px-3 py-2 pb-3 h-12 border rounded-md outline-none transition-colors text-gray-700 bg-white placeholder-gray-400';

  const stateStyles = error
    ? 'border-error focus:ring-1 focus:ring-error bg-error/5'
    : 'border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600';

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-medium text-gray-600">{label}</label>
      <input className={`${baseInputStyles} ${stateStyles}`} {...props} />
      {error && errorMessage && (
        <div className="text-error mt-2 flex items-center gap-2 text-sm">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <circle cx="10" cy="10" r="10" fill="var(--color-error)" />
            <path
              d="M10 5V11"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14V14.1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="leading-tight">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default TextField;
