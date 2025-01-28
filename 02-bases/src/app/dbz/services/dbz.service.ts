import { Injectable } from '@angular/core';
import {Character} from "../interfaces/character.interface";
import { v4 as uuid } from 'uuid'



@Injectable({
  providedIn: 'root'
})
export class DbzService {
  public characters: Character[] = [
    {id: uuid(), name: 'Krillin', power: 1000},
    {id: uuid(), name: 'Goku', power: 9500},
    {id: uuid(), name: 'Vegeta', power: 9500},
    {id: uuid(), name: 'Bulma', power: 10},
    {id: uuid(), name: 'Majin Buu', power: 3000},
    {id: uuid(), name: 'Cell', power: 4500},
    {id: uuid(), name: 'Androide 18', power: 2000},
    {id: uuid(), name: 'Freezer', power: 1000}
  ];

  addCharacter(character: Character): void {
    console.log('MainPage!')
    const newCharacter: Character = { id: uuid(), ...character }

    console.log(newCharacter);
    this.characters.push(newCharacter)
  }

  deteleCharacterById(id: string) {
    console.log("Se elimino: ");
    this.characters = this.characters.filter((character: Character) => character.id !== id);
  }
}
