import { Component, OnInit } from '@angular/core';
import { FormControl,  FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { Hero } from '../../interfaces/hero.interface';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field"
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent, MatOption  } from "@angular/material/autocomplete";
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    MatInputModule,
    MatFormFieldModule,
    MatLabel,
    MatOption,
    MatAutocompleteModule,
    FormsModule
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor( private heroesService: HeroesService ){}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getHeroes()
      .subscribe( heroes => {
        this.heroes = heroes.filter((superhero) => superhero.superhero.toLowerCase().includes(value.toLowerCase()))
        console.log(this.heroes);
      });
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );
    this.selectedHero = hero;
  }
}
