import { Component } from '@angular/core';
import {SearchBoxComponent} from '../../../shared/components/search-box/search-box.component';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../interfaces/country';

import {CountryTableComponent} from '../../components/country-table/country-table.component';
import {LoadingSpinnerComponent} from '../../../shared/loading-spinner/loading-spinner.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    SearchBoxComponent,
    CountryTableComponent,
    LoadingSpinnerComponent,
    NgIf
  ],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {
  public countries: Country[] = new Array<Country>();
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ) {  }

  public searchByCapital( value: string ): void {
    this.isLoading = true;
    this.countriesService.searchCapital( value )
      .subscribe( ( countries: Country[] ): void => {
        this.countries = countries;
        this.isLoading = false;
      } );
    console.log( 'From capital input-box: ', value );
  }
}
