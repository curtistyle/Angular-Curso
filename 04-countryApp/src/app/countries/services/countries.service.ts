import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheStore } from '../interfaces/cache-store.interface';
import {catchError, map, Observable, of, delay, tap} from 'rxjs';
import { Country } from '../interfaces/country';

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

  constructor( private http: HttpClient ) { }

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
        })
      );
  }

  searchRegion( region: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest( url );
  };

  searchCountry( country: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/name/${ country }`;
    return this.getCountriesRequest( url );
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
