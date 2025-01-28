import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Gif, SearchResponse} from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'OXutKKQnBRY6WEhjXjf11rYAlFY9Yp6V';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs service ready');
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];

  }


  private organizeHistory( tag: string ): void {
    tag = tag.toLowerCase();
    // si existe el tag en la lista...
    if ( this._tagsHistory.includes( tag ) ) {
      // ...devuelve un nuevo arreglo sin el elemento repetido
      this._tagsHistory = this._tagsHistory.filter( ( oldTag:string ): boolean => oldTag !== tag );
    }
    // inserta el tag al inicio de la lista
    this._tagsHistory.unshift( tag );

    // limita la lista a 10 elementos
    this._tagsHistory = this._tagsHistory.slice( 0,10 );

    this.saveLocalStorage();
  }
  private saveLocalStorage(): void {
    sessionStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage(): void {
    if ( !sessionStorage.getItem( 'history' ) ) { return ;}
    this._tagsHistory = JSON.parse( sessionStorage.getItem('history')! )
    this.searchTag( this._tagsHistory[0] );
  }

  searchTag( tag: string ): void {
  if ( tag.length == 0 ) return;
  this.organizeHistory( tag );

  const params: HttpParams = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', tag);

  console.log( this.tagsHistory );
  this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
    .subscribe( ( resp: SearchResponse ):void => {
      this.gifsList = resp.data;
      console.info( 'The API was consulted!' );
      //console.log( this.gifsList );
    });


}
}
//fetch('http://api.giphy.com/v1/gifs/search?api_key=OXutKKQnBRY6WEhjXjf11rYAlFY9Yp6V&q=valorant&limit=10')
//  .then( response => response.json() )
//  .then( data => console.log(data))
