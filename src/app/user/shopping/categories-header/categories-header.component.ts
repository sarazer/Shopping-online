import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../data.service';
declare var $: any;

@Component({
  selector: 'categories-header',
  templateUrl: './categories-header.component.html',
  styleUrls: ['./categories-header.component.css']
})
export class CategoriesHeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  currentCategoy = 1;
  categories: any = [];
  search: any = this.dataService.search;

  ngOnInit() {

    this.dataService.getCategories().subscribe(
      categories => {
        this.categories = categories.json();
        this.updateCurrentCategoryView();
      }
    );

    this.route.params.subscribe((params: Params) => {
          this.currentCategoy = params['category_id'];
          this.updateCurrentCategoryView();
        }
      );

  }

  updateCurrentCategoryView() {
    $(document).ready(() => {
      $(`.secondary.vertical.pointing .item`).removeClass('active');
      $(`.secondary.vertical.pointing .item[href$='/${this.currentCategoy}']`).addClass('active');
    });
  }

  getProducts() {
    this.dataService.getProductByCategory(this.currentCategoy);
  }

}

