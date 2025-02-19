import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    var query: string = `${ this.baseUrl }/heroes`;
    console.log("Query => ", query)
    return this.httpClient.get<Hero[]>( query );
  }

  public getHeroById( id: string ): Observable<Hero|undefined> {
    var query: string = `${ this.baseUrl }/heroes/${ id }`;
    return this.httpClient.get<Hero>( query )
    .pipe(
      catchError( error => of(undefined) ) // si ocurre un error devuelve un Observable<undefined>
    );
  }

  public getSuggestions( query: string ): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>( `${ this.baseUrl }/heroes?superhero=${{ query }}` );
  }

  public addHero( hero: Hero ): Observable<Hero> {
    return this.httpClient.post<Hero>( `${ this.baseUrl }/heroes/${ hero.id }`, hero );
  }

  public updateHero( hero: Hero ): Observable<Hero> {
    if ( !hero.id ) throw Error('Hero id is required');
    return this.httpClient.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero)
  }

  public deleteHero( id: string ): Observable<boolean> {
    return this.httpClient.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( error => of(false) ),
      )
  }
}
