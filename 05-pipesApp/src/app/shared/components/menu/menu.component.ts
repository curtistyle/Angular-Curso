import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';



@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [Menu, ToastModule, MenubarModule, NgIf, RouterLink]
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  urlRef: any;

  ngOnInit() {
    this.items =  [
      {
        label: 'Pipies de Angular',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Textos y Fechas',
            icon: 'pi pi-align-left',
            routerLink: '/'

          },
          {
            label: 'Numeros',
            icon: 'pi pi-dollar',
            routerLink: '/numbers'
          },
          {
            label: 'No comunes',
            icon: 'pi pi-globe',
            routerLink: '/uncommon'
          }
        ]
      },
      {
        label: 'Pipes personalizados',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Otro elemento',
            icon: 'pi pi-cog',
            route: '/'
          }
        ]
      }
    ];
  }

}

    /*this.items = [
      {
        label: 'Pipies de Angular',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Textos y Fechas',
            icon: 'pi pi-align-left'
          },
          {
            label: 'Numeros',
            icon: 'pi pi-dollar'
          },
          {
            label: 'No comunes',
            icon: 'pi pi-globe',
          }
        ]
      },
      {
        label: 'Pipes personalizados',
        icon: 'pi pi-cog',
        items: [
          { label: 'Otro elemento', icon: 'pi pi-cog' },
        ]
      }
    ];
     */
