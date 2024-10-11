import { CartModel, Category, Customer, LoginModel } from './../model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APIResponsModel } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';

  onCartAdded: Subject<boolean> = new Subject<boolean>();
  loggedUserData: Customer = new Customer();

  constructor(private http: HttpClient) {
    const isUser = localStorage.getItem('Constant.LOCAL_KEY');
      if(isUser != null){
        const parsObj = JSON.parse(isUser);
        this.loggedUserData = parsObj;
      }
   }

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

  getCartProductsByCustomerId(loggedUserId: number): Observable<APIResponsModel>{
    const url = `${this.apiUrl}GetCartProductsByCustomerId?id=${loggedUserId}`;
    return this.http.get<APIResponsModel>(url)
  }

  deleteProductFromCartById(cartId: number): Observable<APIResponsModel>{
    const url = `${this.apiUrl}DeleteProductFromCartById?id=${cartId}`;
    return this.http.get<APIResponsModel>(url)
  }

}

