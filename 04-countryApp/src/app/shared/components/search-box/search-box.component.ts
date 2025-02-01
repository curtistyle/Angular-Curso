import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, Subject} from 'rxjs';


@Component({
  selector: 'shared-search-box',
  imports: [],
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  // @Output() onNewCharacter: EventEmitter<Character> = new EventEmitter();
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
      this.debouncer
        .pipe(
          debounceTime( 300 ),
        )
        .subscribe( value => {
        this.onDebounce.emit( value );
      } );
  }

  emitValue( value: string ): void {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ): void {
    this.debouncer.next( searchTerm );
  }
}
