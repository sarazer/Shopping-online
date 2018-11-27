import { Component, OnInit} from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',

})

export class ProductComponent implements OnInit {
  product: any = this.dataService.activeProduct;
  quantity = 1;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  addToCart() {
    this.dataService.addCartProduct(this.product.data.product_id, this.quantity);
    this.quantity = 1;
  }

  onClose() {
    this.quantity = 1;
  }
}
