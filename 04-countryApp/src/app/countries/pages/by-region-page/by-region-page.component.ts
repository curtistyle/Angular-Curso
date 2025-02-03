import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

import {Region} from '../../interfaces/region.type';
import {Country} from '../../interfaces/country';

import {CountriesService} from '../../services/countries.service';
import {CountryTableComponent} from '../../components/country-table/country-table.component';
import {LoadingSpinnerComponent} from '../../../shared/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-by-region-page',
  imports: [
    CountryTableComponent,
    NgForOf,
    LoadingSpinnerComponent,
    NgIf
  ],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = new Array<Country>();
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ) {

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchRegion( region: Region ): void {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countriesService.searchRegion( region )
      .subscribe( ( countries: Country[] ) => {
        this.countries = countries;
        this.isLoading = false;
      } );
  }
}
