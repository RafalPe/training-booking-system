import { useState, useMemo, useEffect } from 'react';
import { useHolidays } from '../hooks/useHolidays';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
} from 'date-fns';

interface UseCalendarProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
}

export const useCalendar = ({ value, onChange }: UseCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);
  const [observanceInfo, setObservanceInfo] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (observanceInfo) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [observanceInfo]);

  const selectedDate = value !== undefined ? value : internalSelectedDate;

  const year = currentMonth.getFullYear();
  const { holidayData, loading } = useHolidays(year);

  const minDate = startOfMonth(new Date());
  const maxDate = new Date(2026, 11, 31);

  const isPrevDisabled = isSameMonth(currentMonth, minDate);
  const isNextDisabled = isSameMonth(currentMonth, maxDate);

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const startDay = getDay(startOfMonth(currentMonth));
  const offsetCount = (startDay + 6) % 7;
  const offset = Array(offsetCount).fill(null);

  const handlePrevMonth = () => {
    if (!isPrevDisabled) setCurrentMonth((prev) => subMonths(prev, 1));
  };
  const handleNextMonth = () => {
    if (!isNextDisabled) setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleDateClick = (date: Date, holidayName?: string) => {
    if (onChange) {
      onChange(date);
    } else {
      setInternalSelectedDate(date);
    }
    setObservanceInfo(holidayName || null);
    if (holidayName) setIsVisible(true);
  };

  return {
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
    setIsVisible,
  };
};
