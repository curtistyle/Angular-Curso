import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'products-price-page',
  imports: [],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public price: number = 0;

  public interval$?: Subscription;

  ngOnInit(): void {
    console.log('OnInit.Price');
    this.interval$ =interval(1000).subscribe( (value) => console.log(`Tick: ${value}`) );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges.Price');
    console.log({changes})
  }
  ngOnDestroy(): void {
    console.log('OnDestroy.Price');
    this.interval$?.unsubscribe();
  }


}
