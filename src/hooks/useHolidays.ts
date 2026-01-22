import { useState, useEffect, useMemo } from 'react';
import { type Holiday } from '../types/holiday';
import { fetchPolishHolidays } from '../api/holidayService';

export const useHolidays = (year: number) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolishHolidays()
      .then(setHolidays)
      .catch(() => setHolidays([]))
      .finally(() => setLoading(false));
  }, [year]);

  const holidayData = useMemo(() => {
    return holidays.reduce(
      (acc, h) => {
        acc[h.date] = h;
        return acc;
      },
      {} as Record<string, Holiday>,
    );
  }, [holidays]);

  return { holidayData, loading };
};
