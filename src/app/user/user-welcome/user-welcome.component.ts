import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  cart: any = this.dataService.cart;
  lastOrder: any = this.dataService.lastOrder;
  user: any = this.dataService.user;

  ngOnInit() {
    this.dataService.getCart();
    this.dataService.getUserDetails();
  }

  deleteCart() {
    this.dataService.deleteCart();
  }

  cartTotal() {
    let total = 0
    this.cart.data.forEach(item => {
      total += item.total;
    });
    return total;
  }

  cartCount() {
    let total = 0
    this.cart.data.forEach(item => {
      total += item.quantity;
    });
    return total;
  }

}

