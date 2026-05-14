import { Component, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainTitle } from '../../apps/main-title/main-title';
import {
  ageCalculatorSchema,
  createInitialAgeCalculator,
  IAgeCalculator,
} from '../../../models/age-calculator.model';
import { form, FormField } from '@angular/forms/signals';
import moment from 'moment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-age-calculator',
  imports: [MainTitle, FormField, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './age-calculator.html',
  styleUrl: './age-calculator.css',
})
export class AgeCalculator {
  protected ageCalculatorModel = signal<IAgeCalculator>(createInitialAgeCalculator());
  protected ageCalculatorForm = form(this.ageCalculatorModel, ageCalculatorSchema);

  protected age = signal<IAgeCalculator | null>(null);

  /**
   * onSubmit
   * @returns void
   */
  protected onSubmit(e: Event): void {
    e.preventDefault();

    if (this.ageCalculatorForm().invalid()) return;

    const { days: day, months: month, years: year } = this.ageCalculatorForm().value();
    const birthDate = new Date(year!, month! - 1, day!);
    this.calculateAgeDiff(birthDate.toISOString().split('T')[0]);
  }

  /**
   * calculateAgeDiff
   * Method to calculate the difference in years, months, and days between the input date and the current date
   * @param value string
   * @returns void
   */
  private calculateAgeDiff(value: string): void {
    // Format the input date to 'yyyy-MM-dd'
    const formattedDate = formatDate(value, 'yyyy-MM-dd', 'de-DE');
    // Create a moment object from the formatted date
    const birthdate = moment(formattedDate);
    const now = moment();

    // Calculate full years
    const years = now.diff(birthdate, 'years');
    // Add years to birth date for the remaining diff
    const updatedBirth = birthdate.clone().add(years, 'years');

    // Calculate full months after years
    const months = now.diff(updatedBirth, 'months');
    const updatedBirthWithMonths = updatedBirth.clone().add(months, 'months');

    // Remaining days difference
    const days = now.diff(updatedBirthWithMonths, 'days');

    const result = { years, months, days };
    if (!result) {
      // this.displaySnackbar('No date or birthdate is selected!');
      return;
    }

    this.age.set(result);
  }
}
