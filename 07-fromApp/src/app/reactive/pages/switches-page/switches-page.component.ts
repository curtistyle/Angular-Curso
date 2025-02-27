import { Component, inject, OnInit } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent implements OnInit{
  private fb = inject(FormBuilder)

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotification: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  public person = {
    gender: 'F',
    wantNotification: false
  }

  public ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  public onSave() {
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    // crea un nuevo objeto (newPerson) sin la propiedad termsAndConditions de this.myForm.value
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person)
  }

  public isValidField( field: string) {
    const control = this.myForm.get(field) as FormControl;
    return control?.errors && control.touched;
  }
}
