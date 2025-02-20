import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
private baseUrl = environments.baseUrl;
private user?: User;

  constructor( private httpClient: HttpClient ) { }

  get currentUser(): User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  public login( email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap( user => localStorage.setItem('token', "aasjdh11.aksjdaksjh2.12983uisj" ) )
      )
  }

  public checkAuth(): Observable<boolean>{
    if ( !localStorage.getItem('token') ) return of(false);
    console.log(`BASE URL: ${ this.baseUrl }/users/1`)
    const token = localStorage.getItem('token');
    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError( err => of(false) )
       );
  }

  public logOut() {
    this.user = undefined;
    localStorage.clear();
  }
}
