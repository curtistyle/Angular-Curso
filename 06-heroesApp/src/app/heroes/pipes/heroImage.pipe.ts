import { Pipe, type PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  private rootFolder: string = 'assets/heroes/';

  transform( hero: Hero): string {
    if ( !hero.id && !hero.alt_img ) return 'assets/no-image.png';
    if ( hero.alt_img ) return hero.alt_img;
    return this.rootFolder + hero.id + '.jpg';
  }

}
