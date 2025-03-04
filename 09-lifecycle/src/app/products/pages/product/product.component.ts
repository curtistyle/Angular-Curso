import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PriceComponent } from "../price/price.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'products-product-page',
  imports: [PriceComponent, NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  public isProductVisible: boolean = false;
  public currentPrice: number = 10;

  constructor() {
    console.log('constructor');
  }
  ngOnInit(): void {
    console.log('OnInit');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChange.Product');
    console.log({changes});
  }
  ngDoCheck(): void {
    console.log('DoCheck');
  }
  ngAfterContentInit(): void {
    console.log('AfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('AfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('AfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('AfterViewChecked');
  }
  ngOnDestroy(): void {
    console.log('OnDestroy');
  }

  public incresePrice(): void {
    this.currentPrice++;
  }

}
