import { Component } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { cantBeStrider, emailPattern, firstNameAndLastnamePattern } from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  //constructor( private fb: FormBuilder ) {}
  //constructor( @Optional() private fb: FormBuilder ) {}
  //private valitatorService = inject(ValidatorsService);

  //private fb = inject(FormBuilder);
  public myForm: FormGroup;

  constructor ( private fb: FormBuilder, private validatorsService: ValidatorsService, private emailValidator: EmailValidatorService) {
    this.myForm = this.fb.group({
      name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
      //email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ new EmailValidatorService() ]],
      email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ this.emailValidator ]],
      username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
      password2: ['', [ Validators.required ]]
    },
    {
      validators: [
        // TODO: _investigate_: FormBuilder => AbstractControlOptions
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
      ]
    }
  );
  }

  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  public onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
