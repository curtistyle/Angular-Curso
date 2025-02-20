import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,

    RouterLink,

    FormsModule,
    CommonModule,
    MatFormField,
    MatLabel
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  public onLogin(): void {
    console.log('LOGIN!');
    this.authService.login('fernando@gmail.com', '123445')
      .subscribe( user => {
        this.router.navigate(['/']);
      } );
  }
}
