import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../table';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TableService }  from '../table.service';
import { Product } from '../product'
import { ProductService } from '../product.service';
import { Bill } from '../bill';
import { BillService } from '../bill.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.css']
})
export class TableOrdersComponent implements OnInit {

  @Input() table: Table;
  categories: Category[];

  constructor(
  	private route: ActivatedRoute,
    private tableService: TableService,
    private location: Location,
    private productService: ProductService,
    private billService: BillService,
    private categoryService: CategoryService
  ) { }

  products: Product[];
  @Input() bill: Bill;
  bills: Bill[];
  totalPrice: number;

  displaySwitch: boolean = true;

  productCounts: number[] = [];
  productNames: string[] = [];
  productCodes: number[] = [];
  productPrices: number[] = [];

  selectedProducts: boolean[] = [];

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

  indexOfBill(o: number): number {    
    for (var i = 0; i < this.bill.productCodes.length; i++) {
        if (this.bill.productCodes[i] == o) {
            return i;
        }
    }
    return -1;
  }

  ngOnInit() {
  	this.getTable();
  	this.getProducts();
  	this.getCategories();
  }

  initiateField(): void {
  	for(let i=0; i<this.bill.productCodes.length; i++){
  		this.selectedProducts.push(false);
  	}
  }

  getTable(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tableService.getTable(id).subscribe(table => {
    	this.table = table[0];
    	if (this.table.bill!=0) {
    		this.getBill();
    	}
    	});
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getProductByCode(code: number): Product {
  	for(let product of this.products){
  		if (product.code==code) {
  			return product;
  		}
  	}
  	return null;
  }

  getProductByIndex(index: number): Product {
  	return null;
  }

  goBack(): void {
	this.location.back();
  }

  save(): void {
   this.tableService.updateTable(this.table)
     .subscribe(t => {
     	this.getTable();
     });
 }

 saveBill(): void {
   this.billService.updateBill(this.bill)
     .subscribe();
 }

 addToBill(product: Product): void {
 	this.bill.products.push(product.name);
 	this.bill.productCodes.push(product.code);
 	this.bill.productsPrices.push(product.price);
 	this.billService.updateBill(this.bill).subscribe();
 	this.getTotalPrice();

 	if (!this.displaySwitch) {
 		if (this.indexOfSwitchedView(product.code)==-1) {
  			this.productCounts.push(1);
  			this.productNames.push(product.name);
  			this.productCodes.push(product.code);
  			this.productPrices.push(product.price);
  		} else {
  			this.productCounts[this.indexOfSwitchedView(product.code)] += 1;
  			this.productPrices[this.indexOfSwitchedView(product.code)] += product.price;
  		}
 	}
 }

 removeFromBill(index: number): void {

 	if (!this.displaySwitch) {

 		console.log(this.productCodes[index]);
 		
 		this.bill.products.splice(this.indexOfBill(this.productCodes[index]), 1);
 		this.bill.productCodes.splice(this.indexOfBill(this.productCodes[index]), 1);
 		this.bill.productsPrices.splice(this.indexOfBill(this.productCodes[index]), 1);
 		this.billService.updateBill(this.bill).subscribe();
 		this.getTotalPrice();

 		if (this.productCounts[index]==1) {
  			this.productCounts.splice(index, 1);
  			this.productNames.splice(index, 1);
  			this.productCodes.splice(index, 1);
  			this.productPrices.splice(index, 1);
  		} else {
  			this.productCounts[index] = this.productCounts[index]-1;
  			this.productPrices[index] = this.productPrices[index] - this.getProductByCode(this.productCodes[index]).price;
  		}
 	} else {
 		this.bill.products.splice(index, 1);
 		this.bill.productCodes.splice(index, 1);
 		this.bill.productsPrices.splice(index, 1);
 		this.billService.updateBill(this.bill).subscribe();
 		this.getTotalPrice();
 	}
 }

  getBills(): void {
    this.billService.getBills().subscribe(bills => this.bills = bills);
  }

 getTotalPrice(): void {
 	this.totalPrice = 0;
 	for(var i=0; i< this.bill.productsPrices.length; i++){
      this.totalPrice = this.totalPrice + this.bill.productsPrices[i];
    }
 }

 generateBill(): void {
 	this.billService.getBills().subscribe(bills => {
 		this.bills = bills
 		let id = this.findMissingID();
 		let date = new Date;
	 	this.table.bill = id;
	 	this.save();
	 	this.billService.addBill({id: id, date: date.toString(), note: 'test', opened: true, products: [], productCodes: [], productsPrices: [], amountPaid: 0} as Bill)
	      .subscribe(bill => {
	      	this.bill = bill
	      	this.getBill();
	      });
 	});
 }

 removeBill(): void {
 	this.table.bill = 0;
 	this.save();
 }

 findMissingID(): number {
    let i = 0;
    for (let bill of this.bills) {
      i++;
      if (bill.id != i) {
        return i;
      }
    }
    return i+1;
  }

 getBill(): void {
    const id = this.table.bill;
    this.billService.getBill(id).subscribe(bill => {
    	this.bill = bill[0];
    	this.initiateField();
    	this.getTotalPrice();
    });
  }

  paySelected(): void {

  }

  selectProduct(index: number): void {
  	this.selectedProducts[index] = !this.selectedProducts[index];
  }

  plusOne(code: number): void {
  	this.addToBill(this.getProductByCode(code));
  }

  minusOne(index: number): void {
  	this.removeFromBill(index);
  }

  switch(): void {

  	this.displaySwitch = !this.displaySwitch;

  	this.selectedProducts.length = 0;

  	if (this.displaySwitch) {
  		this.productCounts.length = 0;
	  	this.productNames.length = 0;
	  	this.productCodes.length = 0;
  		this.productPrices.length = 0;
  	} else {
  		this.convertBill();
  	}
  	this.selectedProducts.length = 0
  }
}
