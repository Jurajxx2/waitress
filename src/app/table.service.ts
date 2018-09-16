import { Injectable } from '@angular/core';
import { Table } from './table';
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


export class TableService {

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.tableUrl)
      .pipe(
        tap(heroes => this.log('fetched tables')),
        catchError(this.handleError('getTables', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getTable(id: number): Observable<Table> {
    const url = `${this.tableUrl}?id=${id}`;
    return this.http.get<Table>(url).pipe(
      tap(_ => this.log(`fetched table id=${id}`)),
      catchError(this.handleError<Table>(`getTable id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addTable (table: Table): Observable<Table> {
    return this.http.post<Table>(this.tableUrl, table, httpOptions).pipe(
      tap((table: Table) => this.log(`added table w/ id=${table.id}`)),
      catchError(this.handleError<Table>('addTable'))
    );
  }
  
  /** DELETE: delete the hero from the server */
  deleteTable (table: Table | number): Observable<Table> {
    const id = typeof table === 'number' ? table : table.id;
    const url = `${this.tableUrl}?id=${id}`;

    return this.http.delete<Table>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted table id=${id}`)),
      catchError(this.handleError<Table>('deleteTable'))
    );
  }

  /** PUT: update the hero on the server */
  updateTable (table: Table): Observable<any> {
    return this.http.put(this.tableUrl, table, httpOptions).pipe(
      tap(_ => this.log(`updated table id=${table.id}`)),
      catchError(this.handleError<any>('updateTable'))
    );
  }

  /* GET heroes whose name contains search term */
  searchTables(term: string): Observable<Table[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Table[]>(`${this.tableUrl}/?state=${term}`).pipe(
      tap(_ => this.log(`found tables matching "${term}"`)),
      catchError(this.handleError<Table[]>('searchTables', []))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TableService: ${message}`);
  }

  //private tableUrl = 'api/tables';  // URL to web api

  private tableUrl = 'http://localhost/backend/tables.php';


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
