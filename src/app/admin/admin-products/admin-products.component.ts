import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProducts().subscribe(
      data => {
        this.products = data.json();
      }
    );
  }

}


