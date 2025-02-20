
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgStyle } from '@angular/common'
import { NgFor, NgIf } from '@angular/common'
import { NgClass } from '@angular/common'
import { RouterLink } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatNavList, MatListItem, MatListItemIcon } from '@angular/material/list';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';


@Component({
  selector: 'app-layout-page',
  imports: [
    RouterOutlet,
    NgStyle,
    NgClass,
    NgFor,
    RouterLink,
    NgIf,

    MatListItemIcon,
    MatListItem,
    MatNavList,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list'},
    { label: 'Anadir', icon: 'add', url: './new-hero'},
    { label: 'Buscar', icon: 'search', url: './search'},
  ]

  constructor (
    private authService: AuthService,
    private router: Router
  ) {

  }
  get user(): User | undefined {
    return this.authService.currentUser;
  }

  public onLogOut(): void {
    this.authService.logOut();
    this.router.navigate(['/auth/login'])
  }
}
