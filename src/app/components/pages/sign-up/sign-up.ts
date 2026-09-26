import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  pattern,
  required,
  validate,
  validateAsync,
  validateHttp,
} from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { Logo } from '../../apps/logo/logo';
import { firstValueFrom, Observable } from 'rxjs';
import { Auth } from '../../../services/auth';
import { IUser } from '../../../models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sign-up',
  imports: [Logo, FormField, FormRoot, MatIconModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  private readonly authService = inject(Auth);
  private readonly snackbar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private signUpModel = signal<IUser>({
    id: '',
    firstName: '',
    lastName: '',
    username: '',
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
      // validateHttp(schema.username, {
      //   request: ({ value }) => {
      //     const username = value();
      //     return username ? this.authService.getUsers() : undefined;
      //   },
      //   onSuccess: (respons: IUser[], { value }) => {
      //     const available = !respons.some((x) => x.username === value());
      //     return available
      //       ? null
      //       : { message: 'username is already taken!', kind: 'usernameTaken' };
      //   },
      //   onError(error) {
      //     console.log('Validation request faild: ', error);
      //     return { message: 'Could not verify username availability!', kind: 'serverError' };
      //   },
      // });
    },
    {
      submission: {
        action: async (fields) => {
          try {
            const id = crypto.randomUUID();
            const token: IUser = { ...fields().value(), id };
            const result = await firstValueFrom(this.authService.registerNewUser(token));

            if (result) {
              this.snackbar.open('Registration successful! You can now log in.', 'Close', {
                duration: 5000,
              });
              this.router.navigate(['/']);
            } else {
              this.snackbar.open('Registration failed. Please try again.', 'Close', {
                duration: 5000,
              });
            }
            return;
          } catch (error) {
            console.log(error);
          }
        },
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
