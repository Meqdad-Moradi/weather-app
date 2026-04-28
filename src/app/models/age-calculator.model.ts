import { max, min, required, schema } from '@angular/forms/signals';

export interface IAgeCalculator {
  day: number | null;
  month: number | null;
  year: number | null;
}

export function createInitialAgeCalculator(): IAgeCalculator {
  return {
    day: null,
    month: null,
    year: null,
  };
}

export const ageCalculatorSchema = schema<IAgeCalculator>((rootPath) => {
  // Add validation rules here if needed
  required(rootPath.day, { message: 'Day is required' });
  required(rootPath.month, { message: 'Month is required' });
  required(rootPath.year, { message: 'Year is required' });
  min(rootPath.day, 1, { message: 'Day must be at least 1' });
  min(rootPath.month, 1, { message: 'Month must be at least 1' });
  min(rootPath.year, 1, { message: 'Year must be at least 1900' });
  max(rootPath.day, 31, { message: 'Day cannot be greater than 31' });
  max(rootPath.month, 12, { message: 'Month cannot be greater than 12' });
  max(rootPath.year, new Date().getFullYear(), { message: 'Year cannot be in the future' });
});
