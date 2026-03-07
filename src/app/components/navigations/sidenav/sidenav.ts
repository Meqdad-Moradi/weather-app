import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidenavService } from '../../../services/sidenav-service';
import { MatDivider, MatListModule } from '@angular/material/list';
import { MatIcon } from "@angular/material/icon";
import { Header } from "../header/header";

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatListModule, MatDivider, RouterOutlet, RouterLink, Header],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  private readonly sidenavService = inject(SidenavService);

  public isSidenavOpen = this.sidenavService.isSidenavOpen;
}
