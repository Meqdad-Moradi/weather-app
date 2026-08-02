import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainTitle } from '../../apps/main-title/main-title';
import { SignalFormModel } from '../../../models/signal-form.model';
import { form, FormField, minLength, pattern, required, validate } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { TogglePasswordVisibility } from '../../../directives/toggle-password-visibility';

@Component({
  selector: 'app-signal-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MainTitle,
    FormField,
    TogglePasswordVisibility,
  ],
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.css',
})
export class SignalForm {
  protected isPasswordVisible = signal<boolean>(false);
  protected isConfirmPasswordVisible = signal<boolean>(false);

  private isUserNameAvailable = signal<boolean>(false);
  private formModel = signal<SignalFormModel>({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected signUpForm = form(this.formModel, (schema) => {
    required(schema.lastName, { message: 'Last Name is required' });
    pattern(schema.lastName, /^[a-zA-Z]+$/, { message: 'Last Name must contain only letters' });
    required(schema.firstName, { message: 'First Name is required' });
    pattern(schema.firstName, /^[a-zA-Z]+$/, { message: 'First Name must contain only letters' });
    required(schema.email, { message: 'Email is required' });
    pattern(schema.email, /^\S+@\S+\.\S+$/, { message: 'Email is not valid' });
    required(schema.password, { message: 'Password is required' });
    minLength(schema.password, 8, { message: 'Password must be at least 8 characters long' });
    pattern(schema.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    });
    required(schema.confirmPassword, { message: 'Confirm Password is required' });
    validate(schema.confirmPassword, ({ value, valueOf }) => {
      if (value() !== valueOf(schema.password)) {
        return { kind: 'passwordMisMatch', message: 'Passwords do not match' };
      }
      return null; // valid
    });
  });

  /**
   * onSubmit
   * handles the form submission event, preventing the default behavior and validating the form.
   * @param e Event
   */
  protected onSubmit(e: Event) {
    e.preventDefault();

    if (this.signUpForm().valid()) {
      console.log('Form submitted successfully:', this.formModel());
    } else {
      console.log('Form submission failed. Please correct the errors and try again.');
    }
  }

  /**
   * togglePasswordVisibility
   * toggles the visibility of the password input field between 'text' and 'password'.
   */
  protected togglePasswordVisibility(): void {
    this.isPasswordVisible.update((x) => !x);
  }

  /**
   * toggleConfirmPasswordVisibility
   * toggles the visibility of the confirm password input field between 'text' and 'password'.
   */
  protected toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible.update((x) => !x);
  }
}
