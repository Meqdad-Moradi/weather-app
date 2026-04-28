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

@Component({
  selector: 'app-age-calculator',
  imports: [MainTitle, FormField, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './age-calculator.html',
  styleUrl: './age-calculator.css',
})
export class AgeCalculator {
  protected ageCalculatorModel = signal<IAgeCalculator>(createInitialAgeCalculator());
  protected ageCalculatorForm = form(this.ageCalculatorModel, ageCalculatorSchema);

  /**
   * onSubmit
   * @returns void
   */
  protected onSubmit(e: Event): void {
    e.preventDefault();

    if (this.ageCalculatorForm().invalid()) return;

    const { day, month, year } = this.ageCalculatorForm().value();
    const today = new Date();
    const birthDate = new Date(year!, month! - 1, day!);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();

    console.log(today.getDate() - birthDate.getDate());
    // Adjust age if birthday hasn't occurred yet this year
    // m < 0: birth month is later this year
    // m === 0 && today.getDate() < birthDate.getDate(): same month but day hasn't arrived
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(`Age: ${age} years, ${m} months, and ${d} days`);
  }
}
