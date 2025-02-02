import {Component, OnInit} from '@angular/core';
import {Country} from '../../interfaces/country';
import {CountriesService} from '../../services/countries.service';
import {SearchBoxComponent} from '../../../shared/components/search-box/search-box.component';
import {CountryTableComponent} from '../../components/country-table/country-table.component';

@Component({
  selector: 'app-by-country-page',
  imports: [
    SearchBoxComponent,
    CountryTableComponent
  ],
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = new Array<Country>();
  public initialValue: string = '';
  /* TODO: add missing loader */

  constructor( private countriesService: CountriesService ) {  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(country: string): void {
    this.countriesService.searchCountry( country )
      .subscribe( (countries:Country[]): void => {
        this.countries = countries
        console.log('get countries', { countries })
      } )
  };

}
