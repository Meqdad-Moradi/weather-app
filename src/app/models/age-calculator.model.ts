import { max, min, required, schema } from '@angular/forms/signals';

export interface IAgeCalculator {
  days: number | null;
  months: number | null;
  years: number | null;
}

export function createInitialAgeCalculator(): IAgeCalculator {
  return {
    days: null,
    months: null,
    years: null,
  };
}

export const ageCalculatorSchema = schema<IAgeCalculator>((rootPath) => {
  // Add validation rules here if needed
  required(rootPath.days, { message: 'Day is required' });
  required(rootPath.months, { message: 'Month is required' });
  required(rootPath.years, { message: 'Year is required' });
  min(rootPath.days, 1, { message: 'Day must be at least 1' });
  min(rootPath.months, 1, { message: 'Month must be at least 1' });
  min(rootPath.years, 1, { message: 'Year must be at least 1900' });
  max(rootPath.days, 31, { message: 'Day cannot be greater than 31' });
  max(rootPath.months, 12, { message: 'Month cannot be greater than 12' });
  max(rootPath.years, new Date().getFullYear(), { message: 'Year cannot be in the future' });
});
