import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent }      from './tables/tables.component';
import { BillsComponent }      from './bills/bills.component';
import { ProductsComponent }      from './products/products.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { TableDetailComponent }  from './table-detail/table-detail.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { BillDetailComponent }  from './bill-detail/bill-detail.component';
import { TableOrdersComponent }  from './table-orders/table-orders.component';
import { CategoriesComponent }  from './categories/categories.component';
import { CategoryDetailComponent }  from './category-detail/category-detail.component';
import { PayComponent } from './pay/pay.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tables/:id', component: TableDetailComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'bills/:id', component: BillDetailComponent },
  { path: 'detail/:id', component: TableOrdersComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'pay/:id', component: PayComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
