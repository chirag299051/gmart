import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { CheckoutComponent } from './shopping/components/checkout/checkout.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { LoginComponent } from './core/components/login/login.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  // { path: '**', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },

  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },

  { 
    path: 'admin/products/new',
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService] 
  },

  { 
    path: 'admin/products/:id',
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService] 
  },

  { 
    path: 'admin/products',
    component: AdminProductsComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService] 
  },

  { 
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
