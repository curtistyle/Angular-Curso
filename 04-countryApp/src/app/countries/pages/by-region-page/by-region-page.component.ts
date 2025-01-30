import { Component } from '@angular/core';
import {Country} from '../../interfaces/country';
import {CountriesService} from '../../services/countries.service';
import {SearchBoxComponent} from '../../../shared/components/search-box/search-box.component';
import {CountryTableComponent} from '../../components/country-table/country-table.component';

@Component({
  selector: 'app-by-region-page',
  imports: [
    SearchBoxComponent,
    CountryTableComponent
  ],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public regions: Country[] = new Array<Country>();

  constructor( private countriesService: CountriesService ) {

  }

  searchRegion( region: string ): void {
    this.countriesService.searchRegion( region )
      .subscribe( ( regions: Country[] ) => {
        this.regions = regions;
      } );
  }
}
