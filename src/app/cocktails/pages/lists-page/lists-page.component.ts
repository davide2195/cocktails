import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { CocktailsService } from '../../services/cocktails.service';

@Component({
  selector: 'app-lists-page',
  templateUrl: './lists-page.component.html',
  styles: ``
})
export class ListsPageComponent implements OnInit {

  public cocktails: Cocktail[] = [];

  constructor( private cocktailService: CocktailsService ) {}

  ngOnInit(): void {
    this.cocktailService.getCocktails()
    .subscribe( cocktails => this.cocktails = cocktails );
  }

}
