import {Component} from '@angular/core';
import {Panel} from 'primeng/panel';
import {ToggleCasePipe} from '../../pipes/toggle-case.pipe';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Color, Hero} from '../../interfaces/hero';
import {CanFlyPipe} from '../../pipes/can-fly.pipe';
import {SortByPipe} from '../../pipes/sort-by.pipe';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'products-order',
  imports: [
    Panel,
    ToggleCasePipe,
    Toolbar,
    Button,
    TableModule,
    CanFlyPipe,
    SortByPipe,
    TitleCasePipe
  ],
  templateUrl: './order.component.html',
  styles: ``
})
export class OrderComponent {
  public isUpperCase: boolean = false;
  public orderBy?: keyof Hero;

  public heroes: Hero[] = [
    {
      name: 'SuperMan',
      canFly: true,
      color: Color.blue
    },
    {
      name: 'Batman',
      canFly: false,
      color: Color.black
    },
    {
      name: 'Daredevil',
      canFly: false,
      color: Color.red
    },
    {
      name: 'Robin',
      canFly: false,
      color: Color.red
    },
    {
      name: 'Linterna Verde',
      canFly: true,
      color: Color.green
    },
  ];

  toggleUpperCase(): void {
    this.isUpperCase = !this.isUpperCase;
  }

  changeOrder( value: keyof Hero ) {
    this.orderBy = value;
  }
}
