import {Component, Input, OnInit} from '@angular/core';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'shared-lazy-image',
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {
  @Input()
  public alt:string = '';

  @Input()
  public url!:string;

  public hasLoaded: Boolean = false;

  ngOnInit(): void {
      if ( !this.url ) throw new Error('URL property is required');
  }

  onLoad(){
    console.log('Img loaded');
    this.hasLoaded = true;
  }
}
