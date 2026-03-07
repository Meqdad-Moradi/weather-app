import { Component, inject } from '@angular/core';
import { Theme } from '../../../services/theme';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-switch-theme',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './switch-theme.html',
  styleUrl: './switch-theme.css',
})
export class SwitchTheme {
  private readonly themeService = inject(Theme);

  public theme = this.themeService.theme;

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
