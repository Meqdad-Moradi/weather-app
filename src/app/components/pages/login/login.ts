import { Component, inject } from '@angular/core';
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

  submitLogin(event: SubmitEvent): void {
    event.preventDefault();
    this.auth.login();
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
    void this.router.navigateByUrl(returnUrl);
  }
}
