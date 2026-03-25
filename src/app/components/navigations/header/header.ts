import { Component, computed, inject } from '@angular/core';
import { SwitchTheme } from '../../apps/switch-theme/switch-theme';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavService } from '../../../services/sidenav-service';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { getAppName } from '../../../helpers/utils';

@Component({
  selector: 'app-header',
  imports: [SwitchTheme, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private sidenavService = inject(SidenavService);
  private readonly router = inject(Router);

  private url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.slice(1).split('?')[0]),
    ),
    { initialValue: '' },
  );

  protected title = computed(() => getAppName(this.url()));

  public toggleSideNav(): void {
    this.sidenavService.isSidenavOpen.update((isOpen) => !isOpen);
  }
}
