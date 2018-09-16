import { Injectable } from '@angular/core';
import { Bill } from './bill';
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
export class BillService {

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billUrl)
      .pipe(
        tap(heroes => this.log('fetched bills')),
        catchError(this.handleError('getBills', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getBill(id: number): Observable<Bill> {
    const url = `${this.billUrl}?id=${id}`;
    return this.http.get<Bill>(url).pipe(
      tap(_ => this.log(`fetched bill id=${id}`)),
      catchError(this.handleError<Bill>(`getBill id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addBill (bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.billUrl, bill, httpOptions).pipe(
      tap((bill: Bill) => this.log(`added bill w/ id=${bill.id}`)),
      catchError(this.handleError<Bill>('addBill'))
    );
  }
  
  /** DELETE: delete the hero from the server */
  deleteBill (bill: Bill | number): Observable<Bill> {
    const id = typeof bill === 'number' ? bill : bill.id;
    const url = `${this.billUrl}?id=${id}`;

    return this.http.delete<Bill>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted bill id=${id}`)),
      catchError(this.handleError<Bill>('deleteBill'))
    );
  }

  /** PUT: update the hero on the server */
  updateBill (bill: Bill): Observable<any> {
    return this.http.put(this.billUrl, bill, httpOptions).pipe(
      tap(_ => this.log(`updated bill id=${bill.id}`)),
      catchError(this.handleError<any>('updateBill'))
    );
  }

  /* GET heroes whose name contains search term */
  searchBills(term: string): Observable<Bill[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Bill[]>(`${this.billUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found bills matching "${term}"`)),
      catchError(this.handleError<Bill[]>('searchBills', []))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BillService: ${message}`);
  }

  //private billUrl = 'api/bills';  // URL to web api

  private billUrl = 'http://localhost/backend/bills.php';


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
