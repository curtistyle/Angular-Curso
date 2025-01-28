import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-heroes-hero',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public name: string = 'ironman'
  public age: number = 45;

  // getter : propiedad
  get capitalizedName(): string {
    return this.name.toUpperCase();
  }

  getHeroDescription(): string {
    return `${this.name} - ${this.age}`;
  }

  changeName(): void{

    let newName: string = 'spiderman'
    console.log(`New NAME: ${newName}`);
    this.name = newName;
  }

  changeAge(): void{
    let newAge: number = 25;
    console.log(`New AGE: ${newAge}`);
    this.age = newAge;
  }

  resetForm(): void{
    this.name = "ironman";
    this.age = 45;
  }
}
