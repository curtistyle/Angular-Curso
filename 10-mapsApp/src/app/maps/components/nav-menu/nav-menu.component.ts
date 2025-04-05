import { RouterLink, Routes } from '@angular/router';
import { mapsRoutes } from './../../maps.routes';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface MenuItem {
  name  : string;
  route : string;
}

@Component({
  selector: 'maps-nav-menu',
  imports: [NgFor, RouterLink],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'FullScreen' },
    { route: '/maps/zoom-range', name: 'Zoom Range' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Houses' },
  ];

}
