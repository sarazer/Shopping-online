import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {DataService} from './data.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProductsComponent } from './user/shopping/products/products.component';
import { ProductComponent } from './user/shopping/product/product.component';
import { CartComponent } from './user/shopping/cart/cart.component';
import { ShoppingPageComponent } from './user/shopping/shopping-page/shopping-page.component';
import { LoginComponent } from './general/login/login.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminInsertProductsComponent } from './admin/admin-insert-products/admin-insert-products.component';
import { UserWelcomeComponent } from './user/user-welcome/user-welcome.component';
import { UserHomepageComponent } from './user/user-homepage/user-homepage.component';
import { CategoriesHeaderComponent } from './user/shopping/categories-header/categories-header.component';
import { CreateOrderMainComponent } from './user/create-order/create-order-main/create-order-main.component';
import { ShippingComponent } from './user/create-order/shipping/shipping.component';
import { PaymentComponent } from './user/create-order/payment/payment.component';
import { GetReceiptComponent } from './user/create-order/get-receipt/get-receipt.component';
import { ReceiptComponent } from './user/create-order/receipt/receipt.component';
import { AboutComponent } from './general/about/about.component';
import { RegisterComponent } from './general/register/register.component';
import { HomepageComponent } from './general/homepage/homepage.component';
import { RegisterContinuationComponent } from './general/register-continuation/register-continuation.component';
import { HighlightSearch } from './highlight.pipe';
import { AdminEditProductComponent } from './admin/admin-edit-product/admin-edit-product.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent,
    ShoppingPageComponent,
    LoginComponent,
    AdminHomepageComponent,
    AdminProductsComponent,
    AdminInsertProductsComponent,
    UserWelcomeComponent,
    UserHomepageComponent,
    CategoriesHeaderComponent,
    CreateOrderMainComponent,
    ShippingComponent,
    PaymentComponent,
    GetReceiptComponent,
    ReceiptComponent,
    AboutComponent,
    RegisterComponent,
    HomepageComponent,
    RegisterContinuationComponent,
    HighlightSearch,
    AdminEditProductComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
