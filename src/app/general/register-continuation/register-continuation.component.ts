import { Component, OnInit, Input } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { DataService } from '../../data.service';

declare var $: any;

@Component({
  selector: 'register-continuation',
  templateUrl: './register-continuation.component.html',
  styleUrls: ['./register-continuation.component.css']
})

export class RegisterContinuationComponent implements OnInit {
  @Input() user: any;
  cities: any = [];
  invalid = false;
  registerFaild = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getCities().subscribe(
      cities => {
        this.cities = cities.json();
        this.citiesDropdown();
      }
    );

  }

  citiesDropdown() {
    $(document).ready(() => {
      $('.ui.dropdown').dropdown({
        values: this.cities, placeholder: 'cities', action: 'activate',
        onChange: (text, value) => {
          this.user.city_id = text;
          this.cities.city_name = text;
          this.invalid = false;
          this.registerFaild = false;
        }
      });
    });
  }

  finishRegister() {
    if (!this.validateForm()) {
      this.invalid = true;
      return;
    }

    this.dataService.register({
      user: {
        ...this.user,
        password: Md5.hashStr(this.user.password),
        repeatPassword: Md5.hashStr(this.user.repeatPassword)
      }
    })
      .subscribe(
        res => {
          if (res.json().success == true) {
            const newUrl = res.json().toUrl;
            window.location.href = newUrl;
          } else {
            this.registerFaild = true;
          }
        },
        err => this.registerFaild = true
      );
  }

  validateForm() {
    const { first_name, last_name, city_id, street, house_number } = this.user;
    if (!first_name || !last_name || !city_id || !street || !house_number) {
      return false;
    }
    return true;
  }

}

