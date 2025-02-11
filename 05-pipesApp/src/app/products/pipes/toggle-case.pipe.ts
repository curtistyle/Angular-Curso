import { Pipe, PipeTransform } from '@angular/core';

// curtis | toggleCase = 'CURTIS'
// CURTIS | toggleCase = 'curtis'

@Pipe({
  name: 'toggleCase'
})
export class ToggleCasePipe implements PipeTransform {

  transform( value: string, toUpper: boolean = false ): string {
    return ( toUpper ) ? value.toUpperCase() : value.toLowerCase();
  }

}
