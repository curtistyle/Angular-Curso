import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {
  constructor() { }

/*   validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({ email })

    return of({
      emailTaken: true,
    })
  } */

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
      const email = control.value;

      const httpCallObservable = new Observable<ValidationErrors|null>( (subscribe) => {
        console.log({ email })

        if ( email === 'cuertis@example.com' ) {
          subscribe.next({ emailTaken: true });
          subscribe.complete();
        }

        subscribe.next(null);
        subscribe.complete();

      } );

      return httpCallObservable;
    }



    /*
      return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
      .pipe(
        map( resp => {
          return ( resp.length === 0 ) ? null : { emailTaken: true }
        })
      );
    */
}
