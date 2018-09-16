import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { FormsModule } from '@angular/forms';
import { TableDetailComponent } from './table-detail/table-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableSearchComponent } from './table-search/table-search.component';
import { ProductsComponent } from './products/products.component';
import { BillsComponent } from './bills/bills.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { TableOrdersComponent } from './table-orders/table-orders.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { AngularDraggableModule } from 'angular2-draggable';
import { PayComponent } from './pay/pay.component';

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    TableDetailComponent,
    MessagesComponent,
    DashboardComponent,
    TableSearchComponent,
    ProductsComponent,
    BillsComponent,
    ProductDetailComponent,
    BillDetailComponent,
    TableOrdersComponent,
    ProductSearchComponent,
    ProductFilterComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    AngularDraggableModule
// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
	//HttpClientInMemoryWebApiModule.forRoot(
  //	  InMemoryDataService, { dataEncapsulation: false }
	//)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
