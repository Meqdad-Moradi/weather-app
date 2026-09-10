import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  submitLogin(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = String(formData.get('email') ?? '')
      .trim()
      .toLowerCase();
    const password = String(formData.get('password') ?? '');

    this.errorMessage.set('');
    this.isLoading.set(true);

    this.auth.login(email, password).subscribe((isAuthenticated) => {
      this.isLoading.set(false);

      if (!isAuthenticated) {
        this.errorMessage.set('We could not sign you in with those details.');
        return;
      }

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
      void this.router.navigateByUrl(returnUrl);
    });
  }
}
