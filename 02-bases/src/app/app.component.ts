import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CounterComponent} from "./counter/counter.component";
import {EntradaComponent} from "./entrada/entrada.component";
import {HeroComponent} from "./heroes/hero/hero.component";
import {ListComponent} from "./heroes/list/list.component";
import {MainPageComponent} from "./dbz/pages/main-page.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterComponent, EntradaComponent, HeroComponent, ListComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my new page with Angular';
  public parrafo: string = 'Que onda? whoo';
}
