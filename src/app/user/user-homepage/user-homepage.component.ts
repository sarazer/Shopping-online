import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {

  userName = '';
  user: any = this.dataService.user;

  constructor(private dataService: DataService) { }

  cart: any = this.dataService.cart;

  ngOnInit() {
    this.dataService.getCart();
    this.dataService.getUserDetails();
    this.dataService.getLastOrder();
  }

  logout() {
    this.dataService.logout();
  }

}
