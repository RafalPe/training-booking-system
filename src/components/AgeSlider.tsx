import React from 'react';

interface AgeSliderProps {
  value: number;
  onChange: (val: number) => void;
}

const AgeSlider: React.FC<AgeSliderProps> = ({ value, onChange }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between pl-1 text-xs font-medium text-gray-500">
        <span>8</span>
        <span>100</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="8"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="bg-brand-light accent-brand-purple h-1 w-full -translate-y-[2px] cursor-pointer appearance-none rounded-lg"
        />
        <div
          className="absolute top-3 flex flex-col items-center"
          style={{
            left: `calc(${((value - 8) / (100 - 8)) * 100}% + ${8 - ((value - 8) / (100 - 8)) * 16}px)`,
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className="h-0 w-0 border-x-4 border-b-4 border-x-transparent border-b-white"
            style={{ filter: 'drop-shadow(0 -1px 0 var(--color-brand-light))' }}
          />
          <div className="border-brand-light text-brand-purple rounded border bg-white py-1 pr-4 pl-3 text-xs shadow-sm">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeSlider;
