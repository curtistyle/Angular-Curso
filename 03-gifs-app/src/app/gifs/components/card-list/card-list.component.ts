import {Component, Input} from '@angular/core';
import {Gif} from '../../interfaces/gifs.interfaces';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'gifs-card-list',
  imports: [
    NgForOf
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  @Input()
  public gifs: Gif[] = [];
}
