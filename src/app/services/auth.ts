import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, concatMap, map, of, tap } from 'rxjs';
import { IAuthUser, IStoredUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly sessionKey = 'weather-authenticated';
  private readonly userKey = 'weather-user';
  private readonly usersUrl = '/users';
  private readonly http = inject(HttpClient);

  public readonly currentUser = signal<IStoredUser | null>(this.readStoredUser());
  public readonly isLoggedIn = signal(
    localStorage.getItem(this.sessionKey) === 'true' && this.currentUser() !== null,
  );

  /**
   * login
   * @param email string
   * @param password string
   * @returns Observable<boolean>
   */
  public login(email: string, password: string): Observable<boolean> {
    return this.http.get<IAuthUser[]>(this.usersUrl, { params: { email, password } }).pipe(
      map((users) => users.find((user) => user.email === email && user.password === password)),
      tap((user) => {
        if (user) {
          const storedUser: IStoredUser = {
            id: user.id,
            username: user.username,
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

  /**
   * readStoredUser
   * @returns IStoredUser | null
   */
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

  /**
   * logout
   * @returns void
   */
  public logout(): void {
    localStorage.removeItem(this.sessionKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }

  /**
   * register
   * @param user IAuthUser
   * @returns Observable<boolean>
   */
  public register(user: IAuthUser): Observable<boolean> {
    return this.http.post<IAuthUser>(this.usersUrl, user).pipe(
      concatMap((newUser) => this.login(newUser.email, newUser.password)),
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
