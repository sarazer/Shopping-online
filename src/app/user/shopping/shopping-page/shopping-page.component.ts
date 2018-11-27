import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $('.menu .item').tab();
    });
  }

  sideBarToggle() {
    $('.ui.sidebar').toggleClass('visible');
  }

}
