import { Component, OnInit } from '@angular/core';
import { Bill } from '../bill'
import { BillService } from '../bill.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  bills: Bill[];

  constructor(private billService: BillService) { }

  getBills(): void {
    this.billService.getBills().subscribe(bills => this.bills = bills);
  }

  ngOnInit() {
  	this.getBills();
  }

  add(date: string): void {
  date = date.trim();
  if (!name) { return; }
  this.billService.addBill({ date } as Bill)
    .subscribe(bill => {
      this.bills.push(bill);
    });
  }

  delete(bill: Bill): void {
    this.bills = this.bills.filter(h => h !== bill);
    this.billService.deleteBill(bill).subscribe();
  }

}
