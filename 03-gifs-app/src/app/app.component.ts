import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent} from './shared/components/sidebar/sidebar.component';
import { HomePageComponent } from './gifs/pages/home-page/home-page.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    HttpClientModule,
    RouterOutlet,
    SidebarComponent,
    HomePageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gifs-app';
}
