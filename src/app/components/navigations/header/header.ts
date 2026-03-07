import { Component, inject } from '@angular/core';
import { SwitchTheme } from '../../apps/switch-theme/switch-theme';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavService } from '../../../services/sidenav-service';

@Component({
  selector: 'app-header',
  imports: [SwitchTheme, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private sidenavService = inject(SidenavService);

  public toggleSideNav(): void {
    this.sidenavService.isSidenavOpen.update((isOpen) => !isOpen);
  }
}
