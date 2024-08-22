import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Cocktail } from '../interfaces/cocktail.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class CocktailsService {

  private baseUrl: string = environments.baseUrl;


  constructor(private http: HttpClient) { }


  getCocktails():Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(`${ this.baseUrl }/cocktails`);
  }

  getCocktailById( id: string ): Observable<Cocktail|undefined> {
    return this.http.get<Cocktail>(`${ this.baseUrl }/cocktails/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getSuggestions( query: string ): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(`${ this.baseUrl }/cocktails?q=${ query }&_limit=6`);
  }

  addCocktail( cocktail: Cocktail ): Observable<Cocktail> {
    return this.http.post<Cocktail>(`${ this.baseUrl }/cocktails`, cocktail);
  }

  updateCocktail( cocktail: Cocktail ): Observable<Cocktail> {
    if ( !cocktail.id ) throw Error ('Cocktail id is required')

    return this.http.patch<Cocktail>(`${ this.baseUrl }/cocktails/${ cocktail.id }`, cocktail);
  }

  deleteCocktailById( id: string ): Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/cocktails/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }



}
