import {Component} from "@angular/core";

@Component({
  template: `
    <label for="in-entrada">Ingrese un valor: </label>
    <input id="in-entrada" type="text" />
    <button (click)="getValue()" >Obtener valor</button>
    <h3>{{valor}}</h3>
  `,
  standalone: true,
  selector: "app-entrada",
})
export class EntradaComponent {
  public valor: string = "";

  getValue(): void{
    let input: HTMLInputElement = <HTMLInputElement>document.getElementById("in-entrada");
    this.valor = input.value;
    console.log(input.value);
  }
}
