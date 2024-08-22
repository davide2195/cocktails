import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { CocktailsService } from '../../services/cocktails.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public cocktails: Cocktail[] = [];
  public selectedCocktail?: Cocktail;

  constructor ( private cocktailsService: CocktailsService ) {


  }

  searchCocktail() {
    const value: string = this.searchInput.value || '';

    this.cocktailsService.getSuggestions( value )
      .subscribe( cocktail => this.cocktails = cocktail );
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ):void {
    if ( !event.option.value ) {
      this.selectedCocktail = undefined;
      return
    }

    const cocktail: Cocktail = event.option.value;
    this.searchInput.setValue( cocktail.cocktail );

    this.selectedCocktail = cocktail;
   }

}
