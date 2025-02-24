import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  })

  public newFavorite: FormControl = new FormControl('',  Validators.required );

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public isValidField( field: string ) {
    const control = this.myForm.get( field );
    return control?.errors && control?.touched;
  }

  public isValidFieldInArray( formArray: FormArray, index: number ): boolean | null {
    const control = formArray.controls[index] as FormControl;
    console.log( `Form array valid, errors: ${control.errors} && touched: ${control.touched}` );
    return control?.errors && control?.touched;
  }

  public getFieldError( field: string ): string | null {
    const control: FormControl = this.myForm.get(field) as FormControl;

    if ( !control ) return null;

    const errors = control.errors || {};

    for ( const key of Object.keys(errors) ){
      switch( key ){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracteres`;
      }
    }

    return null;
  }

  public onAddToFavorites(): void {
    if ( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    console.log( this.newFavorite.value );

    this.newFavorite.reset();
  }

  public onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt( index );
  }

  public onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log( this.myForm.value );
    //var control = this.myForm.get('favoriteGames') as FormArray;
    //control = this.fb.array([]);

    this.myForm.controls['favoriteGames'] = this.fb.array([['', Validators.required ]]);
    this.myForm.reset();
  }
}
