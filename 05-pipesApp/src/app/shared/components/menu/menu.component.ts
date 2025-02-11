import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Menubar } from 'primeng/menubar';



@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [Menubar]
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
            label: 'Custom Pipes',
            icon: 'pi pi-cog',
            routerLink: '/order'
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
