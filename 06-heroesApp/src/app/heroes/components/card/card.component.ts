import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgFor, SlicePipe } from '@angular/common';
import { Hero } from '../../interfaces/hero.interface';
import { RouterLink } from '@angular/router';
// Material
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle, MatCardActions, MatCardImage } from '@angular/material/card'
import { MatChip, MatChipListbox } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider'
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { HeroImagePipe } from "../../pipes/heroImage.pipe";
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'heroes-hero-card',
  imports: [
    NgFor,
    SlicePipe,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    MatCardActions,
    MatCardImage,
    MatChip,
    MatChipListbox,
    MatDivider,
    MatButton,
    MatIcon,
    HeroImagePipe,
    MatTooltip
],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit{

  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if ( !this.hero ) throw new Error('Method not implemented.');
  }
}
