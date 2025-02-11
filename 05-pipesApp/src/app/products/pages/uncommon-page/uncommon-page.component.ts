import { Component } from '@angular/core';
import { Panel } from 'primeng/panel';
import { Fieldset } from 'primeng/fieldset';
import {Button} from 'primeng/button';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  NgForOf, NgIf,
  SlicePipe,
  TitleCasePipe
} from '@angular/common';
import {interval, Observable, tap} from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  imports: [
    Panel,
    Fieldset,
    Button,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    KeyValuePipe,
    NgForOf,
    TitleCasePipe,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {
  // i18n Select
  public name: string = 'Nikola Tesla';
  public gender: 'male' | 'female' = 'male';
  public paragraphs: string = `fue un inventor, ingeniero electrico y mecanico serbio nacionalizado estadounidense,
        celebre por sus contribuciones al diseno del moderno suministro de electricidad de corriente alterna.`;
  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  }

  changeClient(): void{
    this.name = 'Marie Curie';
    this.gender = 'female';
    this.paragraphs = `
    fue una fisica y quimica de origen polaco. Pionera en el campo de la radiactividad, es la primera y unica persona en recibir
    dos premios nobel en distintas especialidades cientificas: Fisica y Quimica.
    `;
  }

  // i18n Plural
  public clients: string[] = ['Carlos', 'Marta', 'Fatima', 'Pedro', 'Melisa', 'Agostina', 'Cristian', 'Juan', 'Exequiel', 'Lisandro'];
  public clientsMap = {
    '=0': 'no tenemos ningun cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos 2 esperado',
    'other': 'tenemos # clientes esperando.'
  }

  deleteClient(): void {
    this.clients.shift();
  }

  // keyValue Pipe
  public person = {
    name: 'Curtis',
    age: 55,
    address: 'Ottawa, Canada'
  }

  // Async Pipe
  public myObservableTimer:Observable<number> = interval(2000).pipe(
    tap( value => console.log( 'tap:', value ))
  );

  public promiseValue = new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve( 'Tenemos data en la promesa.' );
      console.log( 'Tenemos data en la promesa.' );
    }, 3500)
  })

}
