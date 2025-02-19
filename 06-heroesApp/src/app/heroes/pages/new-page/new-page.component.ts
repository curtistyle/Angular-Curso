import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { HeroImagePipe } from '../../pipes/heroImage.pipe';
import { filter, switchMap, tap } from 'rxjs';

import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule, MatOption } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  imports: [
    MatDividerModule,
    MatCardModule,
    MatCardContent,
    MatFormFieldModule,
    MatLabel,
    MatSelectModule,
    MatOption,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    NgFor,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    HeroImagePipe,
    NgIf,
  ],
  standalone: true,
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego:        new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters:       new FormControl<string>(''),
    alt_img:          new FormControl<string>(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'Dc - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ];

  constructor(
    private heroesService: HeroesService,
    private activatadRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){
  }

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.activatadRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id ))
      ).subscribe( hero => {
        if ( !hero ) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset( hero );
        return;
      })
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  public onSubmit(): void {
    if ( this.heroForm.invalid ) return;


    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          this.showSnackBar(`${ hero.superhero} uploaded!`);
        }
      );
      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar(`${ hero.superhero} created!`);
      })
  }

  public onDeleteHero() {
    if ( !this.currentHero.id ) throw Error('Hero id is required!');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value
    } );

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroesService.deleteHero( this.currentHero.id) ),
        filter( (wasDeleted: boolean) => wasDeleted),
        tap( wasDeleted => console.log( { wasDeleted } )), // espera:  true | false | undefined
      )
      .subscribe( result => {
        console.log( {result} )
        this.router.navigate(['/heroes']);
      })

/*     dialogRef.afterClosed().subscribe( result => {
      if ( !result ) return;
      console.log('deleted!', this.currentHero.id );
      this.heroesService.deleteHero( this.currentHero.id )
      .subscribe( wasDeleted => {
        if ( wasDeleted ) this.router.navigate(['/heroes']);
      });

    } ); */
  }

  public showSnackBar( message: string): void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    } )
  }
}
