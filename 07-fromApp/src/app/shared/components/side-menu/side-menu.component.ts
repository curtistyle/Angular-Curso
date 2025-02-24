import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  imports: [
    NgFor,
    RouterModule,
    RouterLinkActive
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    { title: 'Basicos', route: './reactive/basic' },
    { title: 'Dinamicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' }
  ]

  public authMenu: MenuItem[] = [
    { title: 'Basicos', route: './auth' },
  ]

  public onClick( rt: string ): void {
    console.log('Route: ', rt)
  }
}
