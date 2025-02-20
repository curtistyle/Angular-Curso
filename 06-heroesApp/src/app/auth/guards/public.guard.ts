import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {
    constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): MaybeAsync<GuardResult> {
    return this.authService.checkAuth()
    .pipe(
      tap( isAuthenticated => {
        // si esta autenticado no permite entrar al login,
        // lo lleva al root de la pagina
        if ( isAuthenticated ) this.router.navigate(['./']);
      } ),
      map( isAuthenticated => !isAuthenticated ),
      tap(value => console.log("# isAuth: ", value))
    )
  }

  public canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    console.log('Can Math');
    console.log( { route, segments} );

    return this.checkAuthStatus();
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log('Can Activate')
    console.log( { route, state} );

    return this.checkAuthStatus();
  }

}
