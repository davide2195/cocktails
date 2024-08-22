import { Pipe, PipeTransform } from '@angular/core';
import { Cocktail } from '../interfaces/cocktail.interface';

@Pipe({
  name: 'cocktailImage'
})
export class CocktailImagePipe implements PipeTransform {

  transform( cocktail: Cocktail ): string {

    if ( !cocktail.id && !cocktail.alt_img ) {
      return 'assets/no-image.png';
    }

    if ( cocktail.alt_img ) return cocktail.alt_img;

    return `assets/cocktails/${ cocktail.id }.jpg`;
  }

}
