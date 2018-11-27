import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  userName = '';
  user: any = this.dataService.user;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }
  logout() {
    this.dataService.logout();
  }
}

