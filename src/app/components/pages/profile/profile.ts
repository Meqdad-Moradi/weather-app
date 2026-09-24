import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../services/auth';
import { IUser } from '../../../models/auth.model';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MainTitle } from '../../apps/main-title/main-title';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

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
  // private readonly destroyRef = inject(DestroyRef);

  protected user = this.authService.currentUser;

  private profileModel = signal<IUser>({
    firstName: this.user()?.firstName || '',
    lastName: this.user()?.lastName || '',
    username: this.user()?.username || '',
    email: this.user()?.email || '',
    password: this.user()?.password || '',
    confirmPassword: this.user()?.confirmPassword || '',
  });

  protected profileForm = form(this.profileModel, (schemaPath) => {
    required(schemaPath.firstName, { message: "Can't be blank!" });
    required(schemaPath.lastName, { message: "Can't be blank!" });
    required(schemaPath.username, { message: "Can't be blank!" });
    required(schemaPath.email, { message: "Can't be blank!" });
    email(schemaPath.email, { message: 'Email is incorrect!' });
  });

  protected clearInput(field: string): void {
    this.profileModel.update((f) => ({ ...f, [field]: '' }));
  }
}
