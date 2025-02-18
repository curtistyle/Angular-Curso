import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-list-page',
  imports: [
    NgFor,
    CardComponent
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit{
  public heroes: Hero[] = [];

  constructor( private heroesService: HeroesService ) {

  }
  ngOnInit(): void {
    this.heroesService.getHeroes()
    .subscribe( heroes => {
      this.heroes = heroes;
      console.log("response: ", { heroes } );
    } );

  }
}
