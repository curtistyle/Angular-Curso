import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

import {Character} from "../../interfaces/character.interface";



@Component({
  selector: 'app-dbz-add-character',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css'
})
export class AddCharacterComponent {
  @Output() onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    name: '', power: 0
  };

  private clear(): void {
    this.character = {name:'', power: 0};
  }

  emitCharacter(): void{
    console.log(this.character);
    if (this.character.name === '') return;

    this.onNewCharacter.emit(this.character);

    this.clear();
  }
}
