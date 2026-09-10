import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly sessionKey = 'weather-authenticated';

  readonly isLoggedIn = signal(localStorage.getItem(this.sessionKey) === 'true');

  login(): void {
    localStorage.setItem(this.sessionKey, 'true');
    this.isLoggedIn.set(true);
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.isLoggedIn.set(false);
  }
}
