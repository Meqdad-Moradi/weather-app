import { Component, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  pattern,
  required,
  validate,
} from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { Logo } from '../../apps/logo/logo';

@Component({
  selector: 'app-sign-up',
  imports: [Logo, FormField, FormRoot, MatIconModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  private signUpModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected signUpForm = form(
    this.signUpModel,
    (schema) => {
      required(schema.firstName, { message: 'First name is required' });
      pattern(schema.firstName, /^[a-zA-Z]+$/, { message: 'First name must contain only letters' });
      required(schema.lastName, { message: 'Last name is required' });
      pattern(schema.lastName, /^[a-zA-Z]+$/, { message: 'Last name must contain only letters' });
      required(schema.email, { message: 'Email is required' });
      email(schema.email, { message: 'Email is not valid' });
      required(schema.password, { message: 'Password is required' });
      minLength(schema.password, 8, { message: 'Password must be at least 8 characters long' });
      pattern(schema.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
        message: 'Use uppercase, lowercase, number, and special character',
      });
      required(schema.confirmPassword, { message: 'Please confirm your password' });
      validate(schema.confirmPassword, ({ value, valueOf }) =>
        value() === valueOf(schema.password)
          ? null
          : { kind: 'passwordMismatch', message: 'Passwords do not match' },
      );
    },
    {
      submission: {
        action: async () => undefined,
        onInvalid: (formData) => {
          const errors = formData().errorSummary();
          errors[0]?.fieldTree().focusBoundControl();
        },
        ignoreValidators: 'none',
      },
    },
  );

  protected resetField(
    fieldName: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword',
  ): void {
    this.signUpModel.update((model) => ({ ...model, [fieldName]: '' }));
  }
}
