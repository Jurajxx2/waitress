import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../bill';
import { BillService } from '../bill.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService }  from '../product.service';
import { Product } from '../product';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(
  	private route: ActivatedRoute,
    private billService: BillService,
    private productService: ProductService,
    private location: Location
    ) { }

  bills: Bill[];
  @Input() bill: Bill;
  totalPrice: number;
  inputBox: string = "";
  wholeNumber: string = "";
  floatNumber: string = "00";
  isDecimal: boolean = true;

  brutto = true;
  netto = false;

  bruttoAmount = 0;
  nettoAmount = 0;

  ngOnInit() {
  	this.getBill();
  }

  input(i): void {
  	let conversion = "";
  	if (i==".") {
  		this.isDecimal = false;
  	} else {
	  	if (this.isDecimal) {
	  		console.log(i);
	  		this.wholeNumber += i;
		  	conversion = this.wholeNumber + '.' + this.floatNumber;
	  	} else {
	  		console.log(i);
	  		this.floatNumber = this.floatNumber.charAt(1) + i;
	  		
		  	conversion = this.wholeNumber + "." + this.floatNumber;
	  	}
	  	this.inputBox = conversion;
  	}
  }

  getBill(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.billService.getBill(id).subscribe(bill => {
    	this.bill = bill[0];
    	this.convertBill();
    	this.getTotalPrice();
    });
  }

  goBack(): void {
	this.location.back();
  }

  getTotalPrice(): void {
 	this.totalPrice = 0;
 	for(var i=0; i< this.bill.productsPrices.length; i++){
      this.totalPrice = this.totalPrice + this.bill.productsPrices[i];
    }
    this.nettoAmount = this.totalPrice;
 }

  productCounts: number[] = [];
  productNames: string[] = [];
  productCodes: number[] = [];
  productPrices: number[] = [];


  convertBill(): void {
  	let i=0;
   	for(i=0; i<this.bill.productCodes.length; i++){
  		if (this.indexOfSwitchedView(this.bill.productCodes[i])==-1) {
  			this.productCounts.push(1);
  			this.productNames.push(this.bill.products[i]);
  			this.productCodes.push(this.bill.productCodes[i]);
  			this.productPrices.push(this.bill.productsPrices[i]);
  		} else {
  			this.productCounts[this.indexOfSwitchedView(this.bill.productCodes[i])] += 1;
  			this.productPrices[this.indexOfSwitchedView(this.bill.productCodes[i])] += this.bill.productsPrices[i];
  		}
  	}
  }

  indexOfSwitchedView(o: number): number {    
    for (var i = 0; i < this.productCodes.length; i++) {
        if (this.productCodes[i] == o) {
            return i;
        }
    }
    return -1;
  }

  del(): void {
  	if (this.isDecimal) {
  		this.wholeNumber = this.wholeNumber.slice(0, this.wholeNumber.length-1);
	  	if (this.wholeNumber == "") {
	  		this.wholeNumber = "0"
	  	}
	  	this.inputBox = this.wholeNumber + "." + this.floatNumber;
  	} else {
  		if (this.floatNumber.charAt(1) == "0") {
  			this.isDecimal = true;
  			this.floatNumber = "00";
  		} else {
  			this.floatNumber = this.floatNumber.charAt(0) + "0";
  		}
  		this.inputBox = this.wholeNumber + "." + this.floatNumber;
  	}
  	
  }

  payedBrutto(){
  	if (this.netto) {
  		this.brutto = true;
  		this.netto = false;	
  	}
  	this.wholeNumber = "";
  	this.floatNumber = "00";
  	this.isDecimal = true;
  	this.inputBox = this.bruttoAmount.toString();
  }

  payedNetto(){
  	if (this.brutto) {
  		this.brutto = false;
  		this.netto = true;	
  	}
  	this.wholeNumber = "";
  	this.floatNumber = "00";
  	this.isDecimal = true;
  	this.inputBox = this.nettoAmount.toString();
  }

  enter(){
  	if (this.brutto) {
  		this.bruttoAmount = +this.inputBox;
  		this.payedNetto();
  	} else if (this.netto) {
  		this.nettoAmount = +this.inputBox;
  	}
  }

  close(){
  	this.bill.amountPaid = this.nettoAmount;
  	this.bill.opened = false;
  	this.billService.updateBill(this.bill).subscribe();
  	
  }
}
