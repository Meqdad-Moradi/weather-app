import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainTitle } from '../../apps/main-title/main-title';
import {
  disableMissingFields,
  handleRequiredFields,
  SignalFormModel,
} from '../../../models/signal-form.model';
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
  private readonly metadata = signal<string[]>(['firstName', 'lastName']);
  private isNewUser = signal(false);

  private formModel = signal<SignalFormModel>({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected signUpForm = form(
    this.formModel,
    (schemaPath) => {
      // handle disabled fields
      const modelKeys = Object.keys(this.formModel()) as (keyof SignalFormModel)[];
      disableMissingFields(schemaPath, modelKeys, this.metadata, this.isNewUser());
      // handle required fields
      handleRequiredFields(schemaPath, modelKeys);

      pattern(schemaPath.lastName, /^[a-zA-Z]+$/, {
        message: 'Last Name must contain only letters',
      });
      pattern(schemaPath.firstName, /^[a-zA-Z]+$/, {
        message: 'First Name must contain only letters',
      });
      pattern(schemaPath.email, /^\S+@\S+\.\S+$/, { message: 'Email is not valid' });
      minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters long' });
      pattern(schemaPath.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      });
      validate(schemaPath.confirmPassword, ({ value, valueOf }) => {
        if (value() !== valueOf(schemaPath.password)) {
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
          // const firstError = field().errors()?.[0];
          // if (firstError) {
          //   firstError.fieldTree().formFieldBindings();
          //   console.error('Form submission failed:', firstError.message);
          // }
          // ۱. گرفتن لیست تمام فیلدهایی که در این لحظه خطا دارند
          const errors = field().errorSummary();

          if (errors.length > 0) {
            // ۲. انتخاب اولین فیلد خطا (مثلاً اگر نام پر باشد ولی شهر خالی باشد، فیلد شهر انتخاب می‌شود)
            const firstErrorField = errors[0];

            // ۳. فوکوس خودکار و اسکرول شدن صفحه روی همان کنترلر المان در HTML!
            firstErrorField.fieldTree().focusBoundControl();
          }
        },
        ignoreValidators: 'none',
      },
    },
  );
}
