import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainTitle } from '../../apps/main-title/main-title';
import { SignalFormModel } from '../../../models/signal-form.model';
import {
  form,
  FormField,
  FormRoot,
  minLength,
  pattern,
  required,
  validate,
} from '@angular/forms/signals';
import { PasswordField } from './password-field/password-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signal-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MainTitle,
    FormField,
    FormRoot,
    PasswordField,
  ],
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.css',
})
export class SignalForm {
  private isUserNameAvailable = signal<boolean>(false);
  private formModel = signal<SignalFormModel>({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected signUpForm = form(
    this.formModel,
    (schema) => {
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
    },
    {
      submission: {
        action: async (field) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
            console.log('Form submitted successfully:', field().value());
            return;
          } catch (error) {
            console.error('Form submission failed:', error);
            return { kind: 'submissionError', message: 'Form submission failed' };
          }
        },
        onInvalid: (field) => {
          const firstError = field().errors()?.[0];
          if (firstError) {
            firstError.fieldTree().formFieldBindings();
            console.error('Form submission failed:', firstError.message);
          }
        },
        ignoreValidators: 'none',
      },
    },
  );
}
