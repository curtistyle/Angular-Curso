import {Component, Input, OnInit} from '@angular/core';

import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  imports: [
    LazyImageComponent
  ],
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  ngOnInit(): void {
      if ( !this.gif ) throw new Error("Gif property is required");
  }

}
