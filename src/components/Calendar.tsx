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
      <div className="w-full max-w-[345px] overflow-hidden rounded-lg border border-gray-100 bg-white px-6 pt-[30px] pb-[20px] shadow-sm md:max-w-[325px] md:px-6 md:pt-6 md:pb-3">
        <div className="mb-4 flex items-center justify-between md:mb-2">
          <button
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
            className={`group flex h-8 w-8 items-center justify-center transition-colors ${
              isPrevDisabled ? 'cursor-not-allowed opacity-30' : ''
            }`}
          >
            <div className="group-hover:border-r-brand-purple h-0 w-0 border-y-[8px] border-r-[10px] border-y-transparent border-r-purple-300 transition-colors" />
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
            <div className="group-hover:border-l-brand-purple h-0 w-0 border-y-[8px] border-l-[10px] border-y-transparent border-l-purple-300 transition-colors" />
          </button>
        </div>

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

            const dayOfWeek = getDay(date);
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
                    : 'text-text-dark hover:bg-brand-purple/10'
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
          className={`flex items-center gap-3 p-1 transition-all duration-500 ease-in-out ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#CBB2FF]">
            <span className="text-sm font-bold text-white">i</span>
          </div>
          <p className="text-sm text-[#0B0B3F]">It is {observanceInfo}.</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
