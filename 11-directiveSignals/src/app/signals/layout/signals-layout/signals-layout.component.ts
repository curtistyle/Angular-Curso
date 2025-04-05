import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: 'app-signals-layout',
  imports: [CommonModule, RouterOutlet, SideMenuComponent],
  templateUrl: './signals-layout.component.html',
  styleUrl: './signals-layout.component.css'
})
export class SignalsLayoutComponent {

}
