import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = environment.backendUrl;
  user: any = { data: {} };
  lastOrder: any = { data: { order: {}, data: [] } }
  search: any = { text: '' };
  products: any = { data: [] };
  cart: any = { data: [] };
  activeProduct: any = { data: {} };

  constructor(private http: Http) {

  }

  dateFormat(dF) {
    var year, month, day;
    year = String(dF.getFullYear());
    
    month = String(dF.getMonth() + 1);
    if (month.length == 1) {
      month = "0" + month;
    }
    day = String(dF.getDay());
    if (day.length == 1) {
      day = "0" + day;
    }

    return year + "-" + month + "-" +day ;

  }

  getCities() {
    return this.http.get(this.apiUrl + 'cities');
  }

  productCount() {
    return this.http.get(this.apiUrl + 'productCount');
  }

  orderCount() {
    return this.http.get(this.apiUrl + 'orderCount');
  }

  isIdValid(id) {
    return this.http.get(this.apiUrl + 'isValidId/' + id);
  }

  login(user) {
    return this.http.post(this.apiUrl + 'login', user);
  }
  register(user) {
    return this.http.post(this.apiUrl + 'register', user);
  }

  logout() {
    return this.http.get(this.apiUrl + 'logout').subscribe(() => {
      setTimeout(() => { window.location.href = '/about'; }, 800);
    }
    );
  }

  getUserDetails() {
    return this.http.get(this.apiUrl + 'user').subscribe(
      user => this.user.data = user.json(),
      err => window.location.href = '/login'
    );
  }

  getProducts() {
    return this.http.get(this.apiUrl + 'products');
  }

  getProduct(product_id) {
    return this.http.get(this.apiUrl + "product/" + product_id);
  }


  editProduct(product, product_id) {
    return this.http.put(this.apiUrl + 'editProduct/' + product_id, product);
  }

  createProduct(product) {
    return this.http.post(this.apiUrl + 'insertProduct', product);
  }

  getCategories() {
    return this.http.get(this.apiUrl + 'categories');
  }

  getProductByCategory(category_id) {
    let url = this.apiUrl + 'products/category/' + category_id;
    if (this.search.text) {
      url = this.apiUrl + 'products/search/' + this.search.text;
    }

    this.http.get(url).subscribe(data => {
      this.products.data = data.json(),
        err => window.location.href = '/login'
    }
    );
  }

  getCart() {
    this.http.get(this.apiUrl + 'cart').subscribe(
      cart => this.cart.data = cart.json(),
      err => window.location.href = '/login'
    );
  }

  setCartQuantityProduct(product_id, quantity) {
    this.http.put(this.apiUrl + 'setCart', { product_id, quantity }).subscribe(
      cart => this.cart.data = cart.json(),
      err => window.location.href = '/login'
    );
  }

  addCartProduct(product_id, quantity) {
    this.http.post(this.apiUrl + 'insertCartProduct', { product_id, quantity }).subscribe(
      cart => this.cart.data = cart.json(),
      err => window.location.href = '/login'
    );
  }

  deleteCartProduct(product_id) {
    this.http.delete(this.apiUrl + 'deleteCart' + product_id).subscribe(
      cart => this.cart.data = cart.json(),
      err => window.location.href = '/login'
    );
  }

  deleteCart() {
    this.http.delete(this.apiUrl + 'cart').subscribe(
      cart => this.cart.data = cart.json(),
      err => window.location.href = '/login'
    );
  }

  getDeliveryDate() {
    return this.http.get(this.apiUrl + 'deliveryDate');
  }
  createOrder(callback) {
    const userData = this.user.data;
    const orderData = {
      delivery_street: `${userData.street_name_ship}, ${userData.house_number_ship}`,
      delivery_date: userData.shipping_date,
      order_date: this.dateFormat(new Date()),
      credit_card_info: userData.cardNumber.substring(userData.cardNumber.length - 4),
      city_code: userData.city_id_ship
    };

    this.http.post(this.apiUrl + 'createOrder', orderData).subscribe(
      order => {
        callback();
        this.lastOrder.data = order.json()
      },
      err => console.log(err)
    );
  }

  getLastOrder() {
    this.http.get(this.apiUrl + 'lastOrder').subscribe(
      order => { this.lastOrder.data = order.json() },
      err => window.location.href = '/login'
    );
  }
}