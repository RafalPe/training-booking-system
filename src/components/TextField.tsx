import React, { type InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ label, error, className = '', ...props }) => {
  const baseInputStyles =
    'w-full px-3 py-2 pb-3 h-12 border rounded-md outline-none transition-colors text-gray-700  ';

  const stateStyles = error
    ? 'border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50'
    : 'border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600';

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-medium text-gray-600">{label}</label>
      <input className={`${baseInputStyles} ${stateStyles}`} {...props} />
    </div>
  );
};

export default TextField;
