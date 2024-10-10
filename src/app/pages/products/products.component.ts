import { ProductList, Category, CartModel, Customer, APIResponsModel } from './../../model/product';
// import { APIResponsModel } from '../../model/product';
import { MasterService } from './../../service/master.service';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy{

  // ProductList: ProductList [] = [];

ProductList = signal<ProductList []>([]);

CategoryList$: Observable<Category[]> = new Observable<Category[]>();
subscriptionList: Subscription[]= [];

MasterService = inject(MasterService);
loggedUserData: Customer = new Customer();

constructor() {
  const isUser = localStorage.getItem('Constant.LOCAL_KEY');
      if(isUser != null){
        const parsObj = JSON.parse(isUser);
        this.loggedUserData = parsObj;
      }
}

  ngOnInit(): void {
   this.loadAllProducts();
   this.CategoryList$ = this.MasterService.getAllCategory().pipe(
    map(item=> item.data)
   )
  }

  getProductByCategory(id:number){
   this.MasterService.getAllProductsByCategoryId(id).subscribe((res:APIResponsModel)=>{
    this.ProductList.set(res.data);
   })
  }

  loadAllProducts(){
    this.subscriptionList.push (this.MasterService.getAllProducts().subscribe((res:APIResponsModel)=>{
     this.ProductList.set(res.data);
    }))
  }

onAddToCart(id: number){
  debugger;
  const newObj : CartModel = new CartModel();
  newObj.ProductId = id;
  newObj.CustId = this.loggedUserData.custId;
  this.MasterService.addtocart(newObj).subscribe((res:APIResponsModel)=>{
   if(res.result){
    alert("Product Added to Cart")
   } else{
    alert(res.message)
   }
  })
}

  ngOnDestroy(): void {
   this.subscriptionList.forEach(element => {
    element.unsubscribe();
   })
  }
}
