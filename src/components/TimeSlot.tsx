import React, { type ButtonHTMLAttributes } from 'react';

interface TimeSlotProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  time: string;
  selected?: boolean;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, selected, className = '', ...props }) => {
  const baseStyles =
    'w-full py-2 px-3 border rounded-md font-medium text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple';

  const stateStyles = selected
    ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
    : 'border-gray-300 hover:border-brand-purple/50';

  return (
    <button type="button" className={`${baseStyles} ${stateStyles} ${className}`} {...props}>
      {time}
    </button>
  );
};

export default TimeSlot;
