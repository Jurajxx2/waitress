import { Injectable } from '@angular/core';
import { Product } from './product';
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

export class ProductService {
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        tap(heroes => this.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}?id=${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addProduct (product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product, httpOptions).pipe(
      tap((product: Product) => this.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }
  
  /** DELETE: delete the hero from the server */
  deleteProduct (product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productUrl}?id=${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  /** PUT: update the hero on the server */
  updateProduct (product: Product): Observable<any> {
    return this.http.put(this.productUrl, product, httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  /* GET heroes whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

  //private productUrl = 'api/products';  // URL to web api

  private productUrl = 'http://localhost/backend/products.php';


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
