import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgFor,
    NgIf
  ],
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent implements AfterViewInit {
  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];
  public myForm: FormGroup;

  constructor ( private fb: FormBuilder, private countriesService: CountriesService ) {
    this.myForm = this.fb.group({
      region:  ['', Validators.required],
      country: ['', Validators.required],
      border: ['', Validators.required]
    });
  }
  ngAfterViewInit(): void {
    this.onRegionChanged();
    this.onCountryChange();
  }

  /* ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChange();
  } */

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  private predicateOrder( a: SmallCountry, b: SmallCountry ): any{
    if (a.name > b.name) return 1
    if (a.name < b.name) return -1
    return 0
  }

  private onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.borders = [] ),
        switchMap( (region) => this.countriesService.getCountriesByRegion(region) )
      )
      .subscribe( region => {
        console.log({ region })
        this.countriesByRegion = region.sort(this.predicateOrder);
      } );
  }

  public onCountryChange(): void {
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('border')!.setValue('') ),
      filter( (value: string) => value.length > 0 ),
      switchMap( (alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode) ),
      switchMap( (country) => this.countriesService.getCountryBordersByCode( country.borders ) ),
    )
    .subscribe( countries => {
      this.borders = countries;
      console.log( { borders:countries } );
    })
  }


}
