import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {authGuard} from "./guards/auth.guard";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", component: LoginComponent},


  {path : "admin" , component : AdminTemplateComponent,canActivate : [authGuard], children : [
      {path: "products", component: ProductsComponent},
      {path:"customers", component: CustomersComponent},
      {path:"newProduct", component: NewProductComponent},
      {path:"edit/:id", component: EditProductComponent}
    ]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
