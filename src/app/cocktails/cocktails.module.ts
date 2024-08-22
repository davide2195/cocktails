import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocktailsRoutingModule } from './cocktails-routing.module';
import { CocktailPageComponent } from './pages/cocktail-page/cocktail-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListsPageComponent } from './pages/lists-page/lists-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { CocktailImagePipe } from './pipes/cocktail-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    CocktailPageComponent,
    LayoutPageComponent,
    ListsPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    CocktailImagePipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    CocktailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CocktailsModule { }
