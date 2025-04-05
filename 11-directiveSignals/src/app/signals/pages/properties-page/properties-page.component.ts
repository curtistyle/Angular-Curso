import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-properties-page',
  imports: [JsonPipe],
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnInit {
  // limpieza automatica del efecto
  public ngOnInit(): void {
    setInterval( () => {
      this.counter.update( current => current + 1 )
    }, 1000 )
  }

  public user = signal<User>(
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  })

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }` )

  public counter = signal(10);

  public userChangedEffect = effect( () => {
    console.log('userChangedEfect triggered');
    console.log( this.user().first_name )
    console.log( { counter: this.counter() } )
  } )

  public incresesBy( value: number) {
    this.counter.update( current => current + value )
  }

  public onFieldUpdated( field: keyof User, value: string ){
    // console.log({ field, value });
    //this.user.update( (current: User) => ({...current, first_name: "Hola Mundo"}));

    this.user.update((currentUser: User) => {
      switch (field) {
        case 'email':
          return { ...currentUser, email: value };
        case 'first_name':
          return { ...currentUser, first_name: value };
        case 'last_name':
          return { ...currentUser, last_name: value };
        case 'id':
          return { ...currentUser, id: Number(value) };
        default:
          // retornar el usuario sin cambios si field es desconocido
          return currentUser;
      }
    });
  }
}
