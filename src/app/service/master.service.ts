import { CartModel, Category, Customer, LoginModel } from './../model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponsModel } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<APIResponsModel>{
    return this.http.get<APIResponsModel>(this.apiUrl + "GetAllProducts")
  }

  getAllCategory(): Observable<APIResponsModel>{
    return this.http.get<APIResponsModel>(this.apiUrl + "GetAllCategory")
  }

  getAllProductsByCategoryId(categoryId: number): Observable<APIResponsModel>{
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`;
    return this.http.get<APIResponsModel>(url)
  }

  registerNewCustomer(obj: Customer): Observable<APIResponsModel>{
    debugger;
    const url = `${this.apiUrl}RegisterCustomer`;
    return this.http.post<APIResponsModel>(url, obj)
  }

  addtocart(obj: CartModel): Observable<APIResponsModel>{
    debugger;
    const url = `${this.apiUrl}AddToCart`;
    return this.http.post<APIResponsModel>(url, obj)
  }

  onLogin(obj: LoginModel): Observable<APIResponsModel>{
    debugger;
    const url = `${this.apiUrl}Login`;
    return this.http.post<APIResponsModel>(url, obj)
  }
}
