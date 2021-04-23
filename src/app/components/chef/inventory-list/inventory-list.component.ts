import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { Inventory } from 'src/app/model/inventory';
import { ChefService } from 'src/app/services/chef.service';
//import {Inventory} from '../../../model/Inventory';
declare var $: any;


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  [x: string]: any;
  productList: Array<Inventory>;
  dataSource: MatTableDataSource<Inventory> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'quantity', 'action'];
  selectedProduct: Inventory = new Inventory();
  errorMessage: string;
  infoMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  inventoryList: any;

  constructor(private adminService: ChefService) { }

  ngOnInit() {
    this.findAllInventories();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllInventories(){
    this.chefService.findAllInventories().subscribe(data => {
      this.inventoryList = data;
      this.dataSource.data = data;
    });
  }

  createNewInventoryRequest(){
    this.selectedInventory = new Inventory();
    $('#inventorytModal').modal('show');
  }

  editInventoryRequest(inventory: Inventory){
    this.selectedInventory = inventory;
    $('#inventoryModal').modal('show');
  }

  saveInventory(){
    if(!this.selectedInventory.id){
      this.createInventory();
    }else{
      this.updateInventory();
    }
  }

  createInventory(){
    this.adminService.createInventory(this.selectedInventory).subscribe(data => {
      this.inventoryList.push(data);
      this.dataSource = new MatTableDataSource(this.inventoryList);
      this.infoMessage = "Mission is completed";
      $('#inventoryModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateInventory(){
    this.adminService.updateInventory(this.selectedInventory).subscribe(data => {
      let itemIndex = this.inventoryList.findIndex(item => item.id == this.selectedInventory.id);
      this.inventoryList[itemIndex] = this.selectedInventory;
      this.dataSource = new MatTableDataSource(this.inventoryList);
      this.infoMessage = "Mission is completed";
      $('#inventoryModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteInventoryRequest(inventory: Inventory){
    this.selectedProduct = inventory;
    $('#deleteModal').modal('show');
  }

  deleteInventory(){
    this.adminService.deleteInventory(this.selectedInventory).subscribe(data => {
      let itemIndex = this.inventoryList.findIndex(item => item.id == this.selectedInventory.id);
      if(itemIndex !== -1){
        this.inventoryList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.inventoryList);
      this.infoMessage = "Mission is completed";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }
}
