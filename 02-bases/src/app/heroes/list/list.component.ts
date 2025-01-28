import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  public heroes: string[] = ['Spiderman', 'Ironman', 'Hulk', 'Capitan America', 'Pantera Negra', 'Thor'];
  public deleteHero?:string;
  removeLastHero(): void{
    this.deleteHero = this.heroes.pop();
    console.log("Ultimo heroe borrado: "+ this.deleteHero);
  }
}
