import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private BASE_URL: string = 'https://restcountries.com/v3.1';

  private _regions: Region[] = Object.values(Region)

  constructor( private http: HttpClient ) { }

  get regions(): Region[] {
    return [ ...this._regions ]
  }

  public getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {
    if ( !region ) return of([]);

    const url: string = `${ this.BASE_URL }/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [] // ?? operador de coalescencia nula
         }))),
        tap( response => console.log({ response }) )
      );
  }

  public getCountryByAlphaCode( alphaCode: string ): Observable<SmallCountry> {
    const url = `${ this.BASE_URL }/alpha/${ alphaCode }?fields=cca3,name,borders`;
    return this.http.get<Country>( url )
      .pipe(
        map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }) )
      );
  }

  getCountryBordersByCode( borders: string[] ): Observable<SmallCountry[]> {
    if ( !borders || borders.length === 0 ) return of([]);

    const countriesRequest: Observable<SmallCountry>[] = [];

    borders.forEach( code => {
      const request = this.getCountryByAlphaCode( code );
      countriesRequest.push( request );
    } );

    return combineLatest( countriesRequest );
  }
}
