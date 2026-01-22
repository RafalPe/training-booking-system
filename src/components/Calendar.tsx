import React from 'react';
import { format, getDay, isSameDay, isBefore, startOfToday } from 'date-fns';
import { useCalendar } from '../hooks/useCalendar';

interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ value, onChange }) => {
  const {
    currentMonth,
    daysInMonth,
    offset,
    isPrevDisabled,
    isNextDisabled,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    holidayData,
    loading,
    selectedDate,
    observanceInfo,
    isVisible,
    setObservanceInfo,
  } = useCalendar({ value, onChange });

  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const today = startOfToday();

  return (
    <div className="flex flex-col gap-2">
      <div className="max-h-[290px] w-full max-w-[325px] overflow-hidden rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
            className={`group flex h-8 w-8 items-center justify-center transition-colors ${
              isPrevDisabled ? 'cursor-not-allowed opacity-30' : ''
            }`}
          >
            <div className="group-hover:border-r-brand-purple h-0 w-0 border-y-[6px] border-r-[8px] border-y-transparent border-r-purple-300 transition-colors" />
          </button>
          <h3 className="text-text-dark text-md font-medium tracking-tight">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={handleNextMonth}
            disabled={isNextDisabled}
            className={`group flex h-8 w-8 items-center justify-center transition-colors ${
              isNextDisabled ? 'cursor-not-allowed opacity-30' : ''
            }`}
          >
            <div className="group-hover:border-l-brand-purple h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-purple-300 transition-colors" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 place-items-center gap-x-4 gap-y-1 pl-1">
          {days.map((d) => (
            <span key={d} className="text-text-dark mb-2 text-sm font-medium">
              {d}
            </span>
          ))}

          {offset.map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {daysInMonth.map((date) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const holiday = holidayData[dateStr];

            const dayOfWeek = getDay(date); // 0=Sun, 6=Sat
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isSunday = dayOfWeek === 0;
            const isNationalHoliday = holiday?.type === 'NATIONAL_HOLIDAY';
            const isObservance = holiday?.type === 'OBSERVANCE';
            const isPast = isBefore(date, today);

            const isDisabled = isSunday || isNationalHoliday || loading || isPast;
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

            return (
              <button
                key={dateStr}
                disabled={isDisabled}
                onClick={() => handleDateClick(date, isObservance ? holiday.name : undefined)}
                className={`text-md flex h-8 w-8 items-center justify-center rounded-full font-normal transition-all ${
                  isSelected ? 'bg-brand-purple text-white shadow-md' : ''
                } ${
                  isDisabled
                    ? 'cursor-not-allowed text-gray-200'
                    : 'text-text-dark hover:bg-purple-50'
                } ${!isSelected && isWeekend && !isDisabled ? 'text-gray-300' : ''} `}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      {observanceInfo && (
        <div
          onTransitionEnd={() => {
            if (!isVisible) setObservanceInfo(null);
          }}
          className={`text-brand-purple rounded-md bg-purple-50 p-3 text-sm font-medium transition-all duration-500 ease-in-out ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
        >
          It's {observanceInfo}!
        </div>
      )}
    </div>
  );
};

export default Calendar;
