import { Component, computed, inject, signal } from '@angular/core';
import { Auth } from '../../../services/auth';
import { IUser } from '../../../models/auth.model';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MainTitle } from '../../apps/main-title/main-title';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { ErrorResponse } from '../../../services/error-service';

@Component({
  selector: 'app-profile',
  imports: [
    FormRoot,
    FormField,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MainTitle,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private readonly authService = inject(Auth);

  protected user = this.authService.currentUser;

  /**
   * isFormEdited
   * check if the form is edited, return true to enable the submit button
   */
  protected isFormEdited = computed(() => {
    for (const key in this.profileModel()) {
      if (!Object.prototype.hasOwnProperty.call(this.user(), key)) continue;

      const userValue = this.user()?.[key as keyof IUser];
      const modelValue = this.profileModel()[key as keyof IUser];
      if (userValue !== modelValue) {
        return true;
      }
    }
    return false;
  });

  /**
   * profileModel
   */
  private profileModel = signal<IUser>({
    firstName: this.user()?.firstName || '',
    lastName: this.user()?.lastName || '',
    username: this.user()?.username || '',
    email: this.user()?.email || '',
    password: this.user()?.password || '',
    confirmPassword: this.user()?.confirmPassword || '',
  });

  /**
   * profileForm
   */
  protected profileForm = form(
    this.profileModel,
    (schemaPath) => {
      required(schemaPath.firstName, { message: "Can't be blank!" });
      required(schemaPath.lastName, { message: "Can't be blank!" });
      required(schemaPath.username, { message: "Can't be blank!" });
      required(schemaPath.email, { message: "Can't be blank!" });
      email(schemaPath.email, { message: 'Email is incorrect!' });
      minLength(schemaPath.firstName, 2, { message: 'Min. 2 characters please' });
      minLength(schemaPath.lastName, 2, { message: 'Min. 2 characters please' });
      minLength(schemaPath.username, 5, { message: 'Min. 5 characters please' });
    },
    {
      submission: {
        action: async (field) => {
          const result = await firstValueFrom(
            this.authService.updateUser({ ...field().value(), id: this.user()?.id ?? '' }),
          );
          if (result instanceof ErrorResponse) {
            return { kind: 'serverError', message: result.value || '' };
          } else {
            this.profileModel.set(result);
          }

          return undefined;
        },
        onInvalid: (field) => {
          const errors = field().errorSummary();
          if (errors.length > 0) {
            const firstError = errors[0];
            firstError.fieldTree().focusBoundControl();
          }
        },
        ignoreValidators: 'none',
      },
    },
  );

  /**
   * clearInput
   * @param field string
   */
  protected clearInput(field: string): void {
    this.profileModel.update((f) => ({ ...f, [field]: '' }));
  }
}
