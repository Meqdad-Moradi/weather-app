import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, concatMap, map, of, tap } from 'rxjs';
import { IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);

  private readonly usersUrl = '/users';
  private readonly userKey = 'weather-user';

  public readonly currentUser = signal<IUser | null>(this.readStoredUser());
  public readonly isLoggedIn = computed(
    () => !!localStorage.getItem(this.userKey) && this.currentUser() !== null,
  );

  /**
   * getUsers
   * @returns Observable<IUser[]>
   */
  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  /**
   * login
   * @param email string
   * @param password string
   * @returns Observable<boolean>
   */
  public login(email: string, password: string): Observable<boolean> {
    return this.http.get<IUser[]>(this.usersUrl, { params: { email, password } }).pipe(
      map((users) => users.find((user) => user.email === email && user.password === password)),
      tap((user) => {
        if (user) {
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.currentUser.set(user);
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
  private readStoredUser(): IUser | null {
    const storedUser = localStorage.getItem(this.userKey);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as IUser;
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
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
  }

  /**
   * register
   * @param user IAuthUser
   * @returns Observable<boolean>
   */
  public register(user: IUser): Observable<boolean> {
    return this.http.post<IUser>(this.usersUrl, user).pipe(
      concatMap((newUser) => this.login(newUser.email, newUser.password)),
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
