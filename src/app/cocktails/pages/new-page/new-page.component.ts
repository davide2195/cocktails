import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { CocktailsService } from '../../services/cocktails.service';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { filter, switchMap, tap } from 'rxjs';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  public cocktailForm = new FormGroup({
    id:       new FormControl<string>(''),
    cocktail: new FormControl<string>('', { nonNullable: true }),
    origen:   new FormControl(''),
    metodo:   new FormControl(''),
    copa:     new FormControl(''),
    receta:   new FormControl(''),
    garnish:  new FormControl(''),
    alt_img:  new FormControl(''),
  })

  constructor(
      private cocktailsService: CocktailsService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private snackbar: MatSnackBar,
      private dialog: MatDialog
    ) {}

    get currentCocktail(): Cocktail{
    const cocktail = this.cocktailForm.value as Cocktail;
    return cocktail;
  }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.cocktailsService.getCocktailById( id ) ),
      ).subscribe( cocktail => {

        if ( !cocktail) return this.router.navigateByUrl('/');

        this.cocktailForm.reset( cocktail );
        return;

      })

  }


  onSubmit():void {

    if ( this.cocktailForm.invalid) return;

    if ( this.currentCocktail.id ) {
      this.cocktailsService.updateCocktail ( this.currentCocktail )
       .subscribe ( cocktail => {
          this.showSnackbar(`${ cocktail.cocktail } update!`);
       });

       return;
    }

    this.cocktailsService.addCocktail ( this.currentCocktail )
     .subscribe( cocktail => {

        this.router.navigate(['/cocktails/edit', cocktail.id ]);
        this.showSnackbar(`${ cocktail.cocktail } created! `);
     })

  }

  onConfirmDelete() {
    if ( !this.currentCocktail.id) throw Error ('cocktail id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.cocktailForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.cocktailsService.deleteCocktailById( this.currentCocktail.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),

      )
      .subscribe(() => {
        this.router.navigate(['/cocktails']);
    })


    // dialogRef.afterClosed().subscribe(result => {
    //   if ( !result) return

    //   this.cocktailsService.deleteCocktailById( this.currentCocktail.id )
    //   .subscribe( wasDeleted => {
    //     if ( wasDeleted )
    //   this.router.navigate(['/cocktails']);
    //   })
    // });
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    } )
  }
}
