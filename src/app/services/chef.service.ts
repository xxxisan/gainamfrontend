import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import { Inventory } from '../model/inventory';

let API_URL = "http://localhost:8080/api/admin/";

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  
  

  //inventory
  createInventory(inventory: Inventory): Observable<any> {
    return this.http.post(API_URL + "inventory-create", JSON.stringify(inventory),
  {headers: this.headers});
  }

  updateInventory(inventory: Inventory): Observable<any> {
    return this.http.put(API_URL + "inventory-update", JSON.stringify(inventory),
  {headers: this.headers});
  }

  deleteInventory(inventory: Inventory): Observable<any> {
    return this.http.post(API_URL + "inventory-delete", JSON.stringify(inventory),
  {headers: this.headers});
  }

  findAllInventories(): Observable<any> {
    return this.http.get(API_URL + "inventory-all",
  {headers: this.headers});
  }

  
}
