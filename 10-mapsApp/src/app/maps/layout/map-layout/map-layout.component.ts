import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { NavMenuComponent } from "../../components/nav-menu/nav-menu.component";

@Component({
  imports: [
    RouterOutlet,
    SideMenuComponent,
    NgIf,
    NavMenuComponent
],
  templateUrl: './map-layout.component.html',
  styleUrl: './map-layout.component.css'
})
export class MapLayoutComponent {
  constructor( private router: Router ) { }

  public isNavbar(): boolean {
    return this.router.url.startsWith('/maps/properties');
  }
}
