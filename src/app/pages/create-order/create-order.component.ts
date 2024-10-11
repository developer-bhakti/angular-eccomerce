import { APIResponsModel, CartData } from './../../model/product';
import { MasterService } from './../../service/master.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit{

  MasterService = inject(MasterService);
  CartData: CartData [] = []

  ngOnInit(): void {
   this.getCartItems();
  }

  getCartItems(){
    this.MasterService.getCartProductsByCustomerId(this.MasterService.loggedUserData.custId).subscribe((res:APIResponsModel)=>{
     this.CartData = res.data;
    })
  }
}
