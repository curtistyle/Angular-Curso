import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): MaybeAsync<GuardResult> {
    return this.authService.checkAuth()
    .pipe(
      tap( isAuthenticated => {
        if ( !isAuthenticated ) this.router.navigate(['./auth/login']);
      } )
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
