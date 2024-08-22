import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../../interfaces/cocktail.interface';

@Component({
  selector: 'cocktails-cocktail-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit {

  @Input()
  public cocktail!: Cocktail;


  ngOnInit(): void {
    if( !this.cocktail ) throw Error('Cocktail property is required');
  }


}
