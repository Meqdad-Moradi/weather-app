import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Logo } from '../../apps/logo/logo';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [Logo, FormField, FormRoot, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private loginModel = signal({
    email: '',
    password: '',
    rememberMe: true,
  });

  protected loginForm = form(
    this.loginModel,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email is required' });
      email(schemaPath.email, { message: 'Email is not valid' });
      required(schemaPath.password, { message: 'Password is required' });
    },
    {
      submission: {
        action: async (formData) => {
          try {
            const result = await firstValueFrom(
              this.auth.login(formData.email().value(), formData.password().value()),
            );

            console.log('Login result:', result);

            if (result) {
              const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
              void this.router.navigateByUrl(returnUrl);
            }
            return;
          } catch (error) {
            return { kind: 'submissionError', message: 'Form submission failed' };
          }
        },
        onInvalid: (formData) => {
          const errors = formData().errorSummary();

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
   * resetField
   * @param filedName string
   */
  protected resetField(filedName: string): void {
    this.loginModel.update((model) => {
      return { ...model, [filedName]: '' };
    });
  }
}
