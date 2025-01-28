import {Component} from "@angular/core";

@Component({
  selector: "app-counter",
  template: `
    <button (click)="increseBy(2)" >+1</button>
    <button (click)="decreseBy(2)">-1</button>
    <button (click)="reset()" >Reset</button>
    <p>CONTADOR: {{ contador }}</p>
  `,
  standalone: true
})
export class CounterComponent {
  public contador: number = 10;

  increseBy(count: number=1): void{
    if (this.contador + count <= 20) {
      this.contador += count;
    }
  }
  decreseBy(count: number=1): void{
    if (this.contador - count >= 0) {
      this.contador -= count;
    }
  }
  reset(): void {
    this.contador = 0;
  }
}
