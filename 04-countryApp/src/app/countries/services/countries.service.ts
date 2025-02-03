import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheStore } from '../interfaces/cache-store.interface';
import {catchError, map, Observable, of, delay, tap} from 'rxjs';
import { Country } from '../interfaces/country';
import {Region} from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital  : { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion   : { region: '', countries: [] }
  }

  constructor( private http: HttpClient ) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStorage', JSON.stringify( this.cacheStore ) )
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem( 'cacheStorage') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem( 'cacheStorage' )! );
  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of( [])), // Si ocurre un error, regresa un arreglo vacio.
        delay( 2000 )
      );
  }

  searchCapital( capital: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ capital }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( ( countries: Country[] ) => {
          this.cacheStore.byCapital = { term: capital, countries: countries };
        }),
        tap( () => this.saveToLocalStorage() ),
      );
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( ( countries: Country[] ) => {
          this.cacheStore.byRegion = { region: region, countries: countries };
        }),
        tap( () => this.saveToLocalStorage() ),
      );
  }

  searchCountry( country: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/name/${ country }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( ( countries: Country[] ) => {
          this.cacheStore.byCountries = { term: country, countries: countries };
        }),
        tap( () => this.saveToLocalStorage() ),
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null ),
      catchError( (error) => of( null ) )
    );
  }
}
