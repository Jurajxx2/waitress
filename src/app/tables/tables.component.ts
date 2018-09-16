import { Component, OnInit } from '@angular/core';
import {Table} from '../table'
import { TableService } from '../table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  tables: Table[];

  constructor(private tableService: TableService) { }

  getTables(): void {
    this.tableService.getTables().subscribe(tables => this.tables = tables);
  }

  ngOnInit() {
  	this.getTables();
  }

  add(): void {
    this.tableService.addTable({id: this.findMissingNumber(), name: 'new table', isOccupied: false, outside: true, visible: true, bill: 0} as Table)
      .subscribe(table => {
        this.tables.push(table);
      });
    this.getTables();
  }

  findMissingNumber(): number {
    let i = 0;
    for (let table of this.tables) {
      i++;
      if (table.id != i) {
        return i;
      }
    }
    return i+1;
  }

  delete(table: Table): void {
    this.tables = this.tables.filter(h => h !== table);
    this.tableService.deleteTable(table).subscribe();
  }

}
