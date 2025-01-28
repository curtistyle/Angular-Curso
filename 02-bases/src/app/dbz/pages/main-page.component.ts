import {Component} from '@angular/core';
import {ListComponent} from "../components/list/list.component";
import {AddCharacterComponent} from "../components/add-character/add-character.component";
import {Character} from "../interfaces/character.interface";
import {DbzService} from "../services/dbz.service";

@Component({
  selector: 'app-dbz-main-page',   // <--- change
  templateUrl: './main-page.component.html', // <--- change
  imports: [ListComponent, AddCharacterComponent],
  standalone: true
})
export class MainPageComponent { // <--- change
  public title: string = 'DBZ';
  constructor( private dbzService: DbzService) { }
  get characters() :Character[]{
    return [...this.dbzService.characters]
  }

  onDeleteCharacter(id :string):void { this.dbzService.deteleCharacterById( id ); }

  onNewCharacter(character: Character):void{ this.dbzService.addCharacter(character) }
}
