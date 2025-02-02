import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, Subject, Subscription} from 'rxjs';


@Component({
  selector: 'shared-search-box',
  imports: [],
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public initialValue: string = '';

  @Input()
  public placeholder: string = '';

  // @Output() onNewCharacter: EventEmitter<Character> = new EventEmitter();
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
      this.debouncerSubscription = this.debouncer
        .pipe(
          debounceTime( 300 ),
        )
        .subscribe( value => {
        this.onDebounce.emit( value );
        console.log( 'valores emitidos' + value );
      } );
  }

  ngOnDestroy(): void {
    // this.debouncer.unsubscribe();
    this.debouncerSubscription?.unsubscribe();
    console.error('destruido');
  }

  emitValue( value: string ): void {
    this.onValue.emit( value );
  }



  onKeyPress( searchTerm: string ): void {
    this.debouncer.next( searchTerm );
  }
}
