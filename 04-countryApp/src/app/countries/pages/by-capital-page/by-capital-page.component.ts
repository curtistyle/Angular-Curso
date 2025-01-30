import { Component } from '@angular/core';
import {SearchBoxComponent} from '../../../shared/components/search-box/search-box.component';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../interfaces/country';

import {CountryTableComponent} from '../../components/country-table/country-table.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    SearchBoxComponent,
    CountryTableComponent
  ],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {
  public countries: Country[] = new Array<Country>();

  constructor( private countriesService: CountriesService ) {  }

  public searchByCapital( value: string ): void {
    this.countriesService.searchCapital( value )
      .subscribe( ( countries: Country[] ): void => {
        this.countries = countries;
      } );
    console.log( 'From capital input-box: ', value );
  }
}
