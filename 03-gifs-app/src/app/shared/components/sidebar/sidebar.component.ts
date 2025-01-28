import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { NgForOf, TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'shared-sidebar',
  imports: [
    NgForOf,
    TitleCasePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor( private gifsService: GifsService ) {

  }

  get tags(): string[] {
    return this.gifsService.tagsHistory
  }

  public search( tag: string ):void {
    this.gifsService.searchTag( tag )
  }

}
