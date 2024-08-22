import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Cocktail } from '../../interfaces/cocktail.interface';

@Component({
  selector: 'app-cocktail-page',
  templateUrl: './cocktail-page.component.html',

})
export class CocktailPageComponent implements OnInit {

  public cocktail?: Cocktail;

  constructor(
    private cocktailsService: CocktailsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.cocktailsService.getCocktailById( id ) ),
      )
      .subscribe( cocktail => {
          if( !cocktail) return this.router.navigate([ '/cocktails/list']);

          this.cocktail = cocktail;
          return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('/cocktails/list');
  }

}
