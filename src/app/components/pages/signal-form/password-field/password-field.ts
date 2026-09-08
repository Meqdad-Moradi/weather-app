import { Component, computed, input, signal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-field',
  imports: [FormField, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './password-field.html',
  styleUrl: './password-field.css',
})
export class PasswordField {
  public field = input.required<FieldTree<string>>();
  public label = input('Password');

  protected isPasswordVisible = signal(false);

  /**
   * computed signals
   */
  protected inputType = computed(() => (this.isPasswordVisible() ? 'text' : 'password'));
  protected visibilityIcon = computed(() =>
    this.isPasswordVisible() ? 'visibility_off' : 'visibility',
  );

  /**
   * togglePasswordVisibility
   */
  protected togglePasswordVisibility(): void {
    this.isPasswordVisible.update((isVisible) => !isVisible);
  }
}
