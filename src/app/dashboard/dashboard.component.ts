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
}
