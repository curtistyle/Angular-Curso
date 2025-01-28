import {Component,  Input, Output, EventEmitter} from '@angular/core';
import {Character} from "../../interfaces/character.interface";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-dbz-list',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent {
  @Output() onDelete: EventEmitter<string> = new EventEmitter();

  @Input()
  public characterList: Character[] = [
    { name: 'Trunk', power: 10 },
    { name: 'Gohan', power: 20 }
  ];
  //@Output() onNewCharacter: EventEmitter<Character> = new EventEmitter();
  onDeleteCharacter(id?: string) {

    if ( !id )  return;
    console.log('Se emitio: ' + id);

    this.onDelete.emit( id );
  }
}
