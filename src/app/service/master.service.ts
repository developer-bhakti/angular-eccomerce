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
}
