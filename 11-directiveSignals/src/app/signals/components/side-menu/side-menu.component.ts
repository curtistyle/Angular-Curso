import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string,
  route: string
}

@Component({
  selector: 'app-side-menu',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  /* public menuItems: MenuItem[] = [
    { title: 'Counter', route: 'counter' },
    { title: 'Users', route: 'user-info' },
    { title: 'Mutatios', route: 'properties' },
  ]
 */

  public menuItems = signal<MenuItem[]>(
    [
      { title: 'Counter', route: 'counter' },
      { title: 'Users', route: 'user-info' },
      { title: 'Mutatios', route: 'properties' },
    ]
  );
}
