import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../../data.service';
declare var $: any;

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

 constructor(private location: Location, private dataService: DataService, private router: Router) { }

  user: any;
  isLoading = false;
  invalid= false;
  
  ngOnInit() {
    $(document).ready(() => {
      $('.four.steps .step.cart')
        .removeClass('active').removeClass('disabled');
      $('.four.steps .step.shipping')
        .removeClass('active').removeClass('disabled');
      $('.four.steps .step.payment')
        .addClass('active').removeClass('disabled');
      $('.four.steps .step.finish')
        .addClass('disabled').removeClass('active');
    });

    this.user = this.dataService.user;

    if (!this.user.data.street_name_ship) {
      this.router.navigate(['/home/create-order/shipping'])
      return;
    }

    this.user.data = { ...this.dataService.user.data, cardCVC: "", cardNumber: "", cardUser: "", cardDate: "" };
  }

  onBackClick() {
    this.location.back();
  }

  validateCard() {
    const regexText = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    return (this.user.data.cardNumber || "").match(regexText) ? true : false;
  }

  validateDate() {
    const regexText = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const validation = (this.user.data.cardDate || "").match(regexText);
    if (validation) {
      const Vdate = new Date(+validation[2] + 2000, validation[1] - 1);
      return Vdate >= new Date();
    }
    return false;
  }

  validateCVC() {
    const regexText = /^([0-9]{3})$/;
    return (this.user.data.cardCVC || "").match(regexText);
  }

  formValid() {
    return this.validateDate() && this.validateCard() && this.validateCVC() && this.user.data.cardUser;
  }

  createOrder() {
    this.isLoading = true;
    setTimeout(() => {
      this.dataService.createOrder(() => {
        this.isLoading = false;
        this.router.navigate(['/home/create-order/print-receipt'])
      })
    }, 200);
  }


}