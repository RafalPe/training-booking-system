export type HolidayType = 'NATIONAL_HOLIDAY' | 'OBSERVANCE' | 'SEASON';

export interface Holiday {
  name: string;
  type: HolidayType;
  date: string;
  day: string;
}
