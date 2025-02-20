import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'heroesApp';

  constructor (
    private authService: AuthService
  ) {}




}
