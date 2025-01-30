import {Component, Input} from '@angular/core';
import {Country} from '../../interfaces/country';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'countries-country-table',
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './country-table.component.html',
  styles: `
    img {
      width: 35px;
    }
  `
})
export class CountryTableComponent {
  @Input()
  public countries: Country[] = [];
}
