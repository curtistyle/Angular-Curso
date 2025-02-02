import {Component, OnInit} from '@angular/core';
import {Country} from '../../interfaces/country';
import {CountriesService} from '../../services/countries.service';
import {SearchBoxComponent} from '../../../shared/components/search-box/search-box.component';
import {CountryTableComponent} from '../../components/country-table/country-table.component';

// @ts-ignore
@Component({
  selector: 'app-by-region-page',
  imports: [
    SearchBoxComponent,
    CountryTableComponent
  ],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public regions: Country[] = new Array<Country>();
  /* TODO: change initial value */
  public initialValue: string | any = '';

  constructor( private countriesService: CountriesService ) {

  }

  ngOnInit(): void {
    this.regions = this.countriesService.cacheStore.byRegion.countries;
    /* TODO: change region */
    this.initialValue = this.countriesService.cacheStore.byRegion.region;
  }

  searchRegion( region: string ): void {
    this.countriesService.searchRegion( region )
      .subscribe( ( regions: Country[] ) => {
        this.regions = regions;
      } );
  }
}
