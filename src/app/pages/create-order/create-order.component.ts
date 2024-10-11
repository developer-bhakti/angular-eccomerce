import { FormsModule } from '@angular/forms';
import { APIResponsModel, CartData, orderModel } from './../../model/product';
import { MasterService } from './../../service/master.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit{

  MasterService = inject(MasterService);
  CartData: CartData [] = [];
  totalAmount : number = 0;
  orderObj: orderModel = new orderModel()

  ngOnInit(): void {
   this.getCartItems();
  }

  getCartItems(){
    this.MasterService.getCartProductsByCustomerId(this.MasterService.loggedUserData.custId).subscribe((res:APIResponsModel)=>{
     this.CartData = res.data;
     this.CartData.forEach(element => {
      this.totalAmount = this.totalAmount + element.productPrice;
     })
    })
  }

  placeOrder(){
    debugger;
    this.orderObj.CustId = this.MasterService.loggedUserData.custId;
    this.orderObj.TotalInvoiceAmount = this.totalAmount;
    this.MasterService.onPlaceOrder(this.orderObj).subscribe((res:APIResponsModel)=>{
      if(res.result){
        alert("Order Placed Successfully");
        this.getCartItems();
        this.orderObj = new orderModel();
      } else {
        alert(res.message);
      }
    })
  }
}
