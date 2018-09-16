import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../bill';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BillService }  from '../bill.service';
import { ProductService }  from '../product.service';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent implements OnInit {

  @Input() bill: Bill;
  products: Product[];
  totalPrice: number = 0;

  constructor(
  	private route: ActivatedRoute,
    private billService: BillService,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
  	this.getBill();
  	this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getBill(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.billService.getBill(id).subscribe(bill => {
    	this.bill = bill[0];
    	this.getTotalPrice();
    });
  }

  goBack(): void {
	this.location.back();
  }

  save(): void {
   this.billService.updateBill(this.bill)
     .subscribe();
 }

  addToBill(product: Product): void {
 	this.bill.products.push(product.name);
 	this.bill.productCodes.push(product.code);
 	this.bill.productsPrices.push(product.price);
 	this.billService.updateBill(this.bill).subscribe();
 	this.getTotalPrice();
 }

 getTotalPrice(): void {
 	this.totalPrice = 0;
 	for(var i=0; i< this.bill.productsPrices.length; i++){
      this.totalPrice = this.totalPrice + this.bill.productsPrices[i];
    }
 }
  
}
