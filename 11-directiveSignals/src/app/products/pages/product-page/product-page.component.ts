import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { JsonPipe } from '@angular/common';
import { CustomLabelDirective } from '../../../shared/directives/customLabel.directive';

@Component({
  selector: 'app-product-page',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    CustomLabelDirective
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  private fb = inject(FormBuilder)

  public color: string = 'green';

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.email]]
  })

  public changeColor() {
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random()*16|0).toString(16));
    this.color = color;
  }
}
