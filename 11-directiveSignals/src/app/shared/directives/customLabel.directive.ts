import { Directive, ElementRef, Input, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string ) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    console.log(value);
    this.setErrorMenssage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    console.log(el);
    this.htmlElement = el;
  }

  public setStyle(): void {
    if ( !this.htmlElement ) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  public setErrorMenssage(): void {
    if ( !this.htmlElement ) return;
    if ( !this._errors ) {
      this.htmlElement.nativeElement.style.color = 'green';
      this.htmlElement.nativeElement.innerText = `No hay errores.`;
      return;
    }

    const errors = Object.keys(this._errors);

    if ( errors.includes('required') ) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if ( errors.includes('minlength') ) {
      const min = this._errors!['minlength']['requiredLenght']
      const current = this._errors!['minlength']['actualLength']

      this.htmlElement.nativeElement.innerText = `Minimo ${current}/${min} caracteres.`;
      return;
    }

    if ( errors.includes('email') ) {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo';
      return;
    }


  }
}
