
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgStyle } from '@angular/common'
import { NgFor } from '@angular/common'
import { NgClass } from '@angular/common'
import { RouterLink } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatNavList, MatListItem, MatListItemIcon } from '@angular/material/list';

@Component({
  selector: 'app-layout-page',
  imports: [
    RouterOutlet,
    NgStyle,
    NgClass,
    NgFor,
    RouterLink,

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
}
