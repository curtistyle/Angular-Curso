import { Component } from '@angular/core';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router'


@Component({
  selector: 'app-register-page',
  imports: [
    MatFormField,
    MatLabel,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
