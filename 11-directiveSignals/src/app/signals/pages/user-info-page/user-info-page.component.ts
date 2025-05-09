import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-info-page',
  imports: [NgIf],
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {
  private userService = inject(UsersService);

  public userId = signal(1);
  public currentUser = signal<User|undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>( () => {
    if ( !this.currentUser() ) return 'Usuario no encontrado!';
    return `${ this.currentUser()?.first_name } ${this.currentUser()?.last_name } `;
  });

  ngOnInit(): void {
    this.loadUser( this.userId() );
  }



  public loadUser( id: number) {
    if (id <= 0) return;

    this.userId.set(id);
    this.currentUser.set(undefined)

    this.userService.getUserById( id )
    .subscribe({
      next: (user) =>
      // si todo sale bien
      {
        this.currentUser.set( user );
        this.userWasFound.set( true );
      },
      // si no existe el usuario
      error: () =>
      {
        this.userWasFound.set( false ),
        this.currentUser.set( undefined )
      }
    });
  }
}
