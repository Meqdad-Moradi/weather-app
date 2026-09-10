import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { IAuthUser, IStoredUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly sessionKey = 'weather-authenticated';
  private readonly userKey = 'weather-user';
  private readonly usersUrl = 'http://localhost:3000/users';
  private readonly http = inject(HttpClient);

  readonly currentUser = signal<IStoredUser | null>(this.readStoredUser());
  readonly isLoggedIn = signal(
    localStorage.getItem(this.sessionKey) === 'true' && this.currentUser() !== null,
  );

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<IAuthUser[]>(this.usersUrl, { params: { email, password } }).pipe(
      map((users) => users[0]),
      tap((user) => {
        if (user) {
          const storedUser: IStoredUser = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          localStorage.setItem(this.sessionKey, 'true');
          localStorage.setItem(this.userKey, JSON.stringify(storedUser));
          this.currentUser.set(storedUser);
          this.isLoggedIn.set(true);
        }
      }),
      map((user) => !!user),
      catchError(() => of(false)),
    );
  }

  private readStoredUser(): IStoredUser | null {
    const storedUser = localStorage.getItem(this.userKey);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as IStoredUser;
    } catch {
      localStorage.removeItem(this.userKey);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }
}
