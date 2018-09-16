import { Component, OnInit } from '@angular/core';
 
import { Observable, Subject } from 'rxjs';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
import { Table } from '../table';
import { TableService } from '../table.service';
 
@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: [ './table-search.component.css' ]
})
export class TableSearchComponent implements OnInit {
  tables$: Observable<Table[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private tableService: TableService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.tables$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.tableService.searchTables(term)),
    );
  }  
}
