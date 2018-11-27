import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
declare var $: any;

@Component({
  selector: 'receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor(private dataService: DataService) { }
  editProduct: any = null; 
  editQuantity = 0;
  cart: any = this.dataService.cart;
  searchText = "";

  ngOnInit() {
    $(document).ready(() => {
      $('.four.steps .step.cart')
        .addClass('active').removeClass('disabled');
      $('.four.steps .step.shipping')
        .removeClass('active').addClass('disabled');
      $('.four.steps .step.payment')
        .removeClass('active').addClass('disabled');
      $('.four.steps .step.finish')
        .removeClass('active').addClass('disabled');
    });
  }

  updateQuntity() {
    this.dataService.setCartQuantityProduct(this.editProduct.product_id, this.editQuantity);
    this.editProduct = null;
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

}

