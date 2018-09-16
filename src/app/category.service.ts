import { Injectable } from '@angular/core';
import { Category } from './category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;' })
  };

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl)
      .pipe(
        tap(heroes => this.log('fetched categories')),
        catchError(this.handleError('getCategories', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryUrl}?id=${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addCategory (category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, category, httpOptions).pipe(
      tap((category: Category) => this.log(`added category w/ id=${category.id}`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }
  
  /** DELETE: delete the hero from the server */
  deleteCategory (category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this.categoryUrl}?id=${id}`;

    return this.http.delete<Category>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  /** PUT: update the hero on the server */
  updateCategory (category: Category): Observable<any> {
    return this.http.put(this.categoryUrl, category, httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  /* GET heroes whose name contains search term */
  searchCategories(term: string): Observable<Category[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Category[]>(`${this.categoryUrl}/?state=${term}`).pipe(
      tap(_ => this.log(`found categorys matching "${term}"`)),
      catchError(this.handleError<Category[]>('searchCategorys', []))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CategoryService: ${message}`);
  }

  //private categoryUrl = 'api/categories';  // URL to web api

  private categoryUrl = 'http://localhost/backend/categories.php';

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
