import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../general/about/about.component';
import { LoginComponent } from '../general/login/login.component';
import { RegisterComponent } from '../general/register/register.component';
import { HomepageComponent } from '../general/homepage/homepage.component';
import { UserHomepageComponent } from '../user/user-homepage/user-homepage.component';
import { UserWelcomeComponent } from '../user/user-welcome/user-welcome.component';
import { ShoppingPageComponent } from '../user/shopping/shopping-page/shopping-page.component';
import { CreateOrderMainComponent } from '../user/create-order/create-order-main/create-order-main.component';
import { AdminHomepageComponent } from '../admin/admin-homepage/admin-homepage.component';
import { AdminProductsComponent } from '../admin/admin-products/admin-products.component';
import { AdminInsertProductsComponent } from '../admin/admin-insert-products/admin-insert-products.component';
import { ReceiptComponent } from '../user/create-order/receipt/receipt.component';
import { GetReceiptComponent } from '../user/create-order/get-receipt/get-receipt.component';
import { PaymentComponent } from '../user/create-order/payment/payment.component';
import { ShippingComponent } from '../user/create-order/shipping/shipping.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: RegisterComponent,
      },
    ]
  },
  {
    path: 'home',
    component: UserHomepageComponent,
    children: [
      {
        path: '',
        component: UserWelcomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'shopping/:category_id',
        component: ShoppingPageComponent
      },
      {
        path: 'shopping',
        redirectTo: 'shopping/1',
        pathMatch: 'full'
      },
      {
        path: 'create-order',
        component: CreateOrderMainComponent,
        children: [
          {
            path: '',
            component: ReceiptComponent
          },
          {
            path: 'shipping',
            component: ShippingComponent
          },
          {
            path: 'payment',
            component: PaymentComponent
          },
          {
            path: 'print-receipt',
            component: GetReceiptComponent
          }
        ]
      },
    ]
  },
  {

    path: 'admin',
    component: AdminHomepageComponent,
    children: [
      {
        path: '',
        component: AdminProductsComponent
      },
      {
        path: 'insert-product',
        component: AdminInsertProductsComponent
      },
      {
        path: 'insert-product/:product_id',
        component: AdminInsertProductsComponent
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
