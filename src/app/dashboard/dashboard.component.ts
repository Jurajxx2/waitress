import { Component, OnInit } from '@angular/core';
import { Table } from '../table';
import { Bill } from '../bill';
import { TableService } from '../table.service';
import { BillService } from '../bill.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tables: Table[] = [];
  bills: Bill[] = [];
  openedBills: Bill[] = [];
  tableBills: number[] = [];
  otherBills: Bill[] = [];

  endOffset = { x: 0, y: 0 };

  gridSize = 100;
  grids = [0, 100, 200];

  tablePair = { x: 0, y:0, id: 0}

  outside = true;
  inside: boolean;
  others: boolean;

  editing = false;

  constructor(private tableService: TableService, private billService: BillService) { }

  ngOnInit() {
  	this.getTables();
  }

  getTables(): void {
    this.tableService.getTables().subscribe(tables => {
      this.tables = tables
      this.getBills();
      for(let table of this.tables){
        if (table.bill!=0) {
          this.tableBills.push(table.bill);
        }
      }
    });
  }

  getBills(): void {
    this.billService.getBills().subscribe(bills => {
      this.bills = bills;
      let i=0;
      for(let bill of this.bills){
        if (bill.opened) {
          this.openedBills.push(bill);
        }
      }
      for(let bill of this.openedBills){
        if (this.tableBills.indexOf(bill.id)==-1) {
          this.otherBills.push(bill);
        }
      }
    });
  }

  onStop(event) {
    this.tablePair.id = event.id;
  }

  onMoveEnd(event) {
    this.tablePair.x = event.x;
    this.tablePair.y = event.y;
    
    this.changeTablePosition(this.tables[this.tablePair.id]);
  }

  changeTablePosition(table: Table){
    table.x = this.tablePair.x;
    table.y = this.tablePair.y;
    console.log(table.name);
    this.tableService.updateTable(table).subscribe();
  }

  showOutside() {
    console.log("test");
    this.outside = true;
    this.inside = false;
    this.others = false;
  }

  showInside() {
    this.outside = false;
    this.inside = true;
    this.others = false;
  }

  showOthers() {
    this.outside = false;
    this.inside = false;
    this.others = true;
  }

  edit() {
    this.editing = !this.editing;
  }
}
