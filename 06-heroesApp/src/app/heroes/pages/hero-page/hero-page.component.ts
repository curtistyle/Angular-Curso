
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { JsonPipe, NgIf } from '@angular/common';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { HeroImagePipe } from '../../pipes/heroImage.pipe';

import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatList, MatListItem } from "@angular/material/list";
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardHeader, MatCardImage, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-hero-page',
  imports: [
    HeroImagePipe,
    NgIf,

    MatProgressSpinner,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatListItem,
    MatList,
    MatButton,
    MatIcon
  ],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor (
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute, // buscar informacion
    private router: Router,
  ){ }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(10000),
        switchMap( ( { id } ) => this.heroesService.getHeroById( id ) )
      ).subscribe( hero => {
        if ( !hero ) return this.router.navigate( ['/heroes/list'] );
        this.hero = hero
        return;
      })
  }

  public goBack(): void {
    this.router.navigateByUrl("/heroes/list")
  }

}
