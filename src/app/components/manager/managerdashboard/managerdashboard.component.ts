import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-managerdashboard',
  templateUrl: './managerdashboard.component.html',
  styleUrls: ['./managerdashboard.component.css']
})
export class ManagerdashboardComponent implements OnInit {
  userCount:any = "";
  productCount:any = "";
  transactionCount:any = "";
  // reservationCount:any = "";

  constructor(private adminService: AdminService) { }

  ngOnInit() {
   
    this.numberOfProducts();
    this.numberOfTransactions();
    // this.numberOfReservations();
  }


  // numberOfUsers(){
  //   this.adminService.numberOfUsers().subscribe(data => {
  //     this.userCount = data.response;
  //   });
  // }

  numberOfProducts(){
    this.adminService.numberOfProducts().subscribe(data => {
      this.productCount = data.response;
    });
  }

  numberOfTransactions(){
    this.adminService.numberOfTransactions().subscribe(data => {
      this.transactionCount = data.response;
    })
  }
  // numberOfReservations(){
  //   this.adminService.numberOfReservations().subscribe(data => {
  //     this.reservationCount = data.response;
  //   })
  }


