import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PrimeNG } from 'primeng/config';
import { MenuComponent } from './shared/components/menu/menu.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pipesApp';

  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);

  }

}
