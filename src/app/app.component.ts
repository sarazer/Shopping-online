import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-online';
  productsCount = 0;
  ordersCount = 0;

 constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.orderCount().subscribe(data => this.ordersCount = data.json().count);
    this.dataService.productCount().subscribe(data => this.productsCount = data.json().count);
  }

}

