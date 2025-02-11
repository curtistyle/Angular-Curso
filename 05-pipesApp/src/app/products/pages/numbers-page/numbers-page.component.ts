import { Component } from '@angular/core';
import {Panel} from 'primeng/panel';
import {Card} from 'primeng/card';
import {CurrencyPipe, DecimalPipe, PercentPipe} from '@angular/common';

@Component({
  selector: 'app-numbers-page',
  imports: [
    Panel,
    Card,
    DecimalPipe,
    CurrencyPipe,
    PercentPipe
  ],
  templateUrl: './numbers-page.component.html',
  styleUrl: './numbers-page.component.css'
})
export class NumbersPageComponent {
  public totalSells: number = 2567789.5567;
  public percent: number = 0.4856;
}
