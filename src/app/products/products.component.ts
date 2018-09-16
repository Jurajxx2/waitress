import { Component, OnInit } from '@angular/core';
import { Product } from '../product'
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  ngOnInit() {
  	this.getProducts();
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.productService.addProduct({id: this.findMissingID(), name: name } as Product)
    .subscribe(product => {
      this.products.push(product);
    });
  }

  findMissingID(): number {
    let i = 0;
    for (let product of this.products) {
      i++;
      if (product.id != i) {
        return i;
      }
    }
    return i+1;
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteProduct(product).subscribe();
  }

}
