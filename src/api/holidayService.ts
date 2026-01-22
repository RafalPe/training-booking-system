import { type Holiday } from '../types/holiday';

//API Key was invalid so I generated my own and could't send year param because it's premium feature
const API_KEY = import.meta.env.VITE_HOLIDAYS_API_KEY;
const BASE_URL = import.meta.env.VITE_HOLIDAYS_API_URL;

export const fetchPolishHolidays = async (): Promise<Holiday[]> => {
  const response = await fetch(`${BASE_URL}?country=PL`, {
    headers: { 'X-Api-Key': API_KEY },
  });

  if (!response.ok) {
    throw new Error('Problem z pobraniem świąt');
  }

  return response.json();
};
