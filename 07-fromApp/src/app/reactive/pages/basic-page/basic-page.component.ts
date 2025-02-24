import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6,
}

@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent implements OnInit {
  /*   public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0)
    }); */
    private fb = inject(FormBuilder);
    public myForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]]
  })

  public isValidField( field: string ) {
    const control = this.myForm.get(field);
    return control?.errors && control?.touched
  }

  public getFieldError(field :string): string | null {
    const control = this.myForm.get(field);

    if ( !control ) return null;

    const errors = control.errors || {};

    for (const key of Object.keys(errors)){
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracteres`;
      }
    }

    return null;
  }

  public onSave(): void {
    if ( this.myForm.invalid ) return;
    console.log( this.myForm.value );
    this.myForm.reset( { price: 0, inStorage: 0 } )
  }

  ngOnInit(): void {
    this.myForm.markAsTouched();
    this.myForm.reset(  );
  }


}

