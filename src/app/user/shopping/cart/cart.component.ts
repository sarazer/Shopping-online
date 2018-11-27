import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartVisible = true;
  editProduct = null;
  editQuantity = 0;

  constructor(private dataService: DataService) { }

  cart: any = this.dataService.cart;

  ngOnInit() {
    this.dataService.getCart();
  }

  toggleVisible() {
    this.cartVisible = !this.cartVisible;
  }

  cartTotal() {
    let total = 0
    this.cart.data.forEach(product => {
      total += product.total;
    });
    return total;
  }

  cartCount() {
    let total = 0
    this.cart.data.forEach(product => {
      total += product.quantity;
    });
    return total;
  }

  deleteCart() {
    this.dataService.deleteCart();
  }

  updateQuntity() {
    this.dataService.setCartQuantityProduct(this.editProduct.product_id, this.editQuantity);
    this.editProduct = null;
  }

  deleteItem(product) {
    this.dataService.deleteCartProduct(product.product_id);
  }

}
