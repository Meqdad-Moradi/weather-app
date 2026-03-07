import { Component } from '@angular/core';
import { SwitchTheme } from '../apps/switch-theme/switch-theme';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SwitchTheme],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
