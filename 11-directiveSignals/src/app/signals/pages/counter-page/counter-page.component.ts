import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  imports: [],
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {
  constructor() {}

  public counter = signal(10);

  // propiedad de solo lectura
  public squareCounter = computed( () => this.counter() * this.counter() )

  public increseBy( value: number) {
    this.counter.update( current => current + value)
  }
}
