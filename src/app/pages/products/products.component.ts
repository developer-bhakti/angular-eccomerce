import { ProductList } from './../../model/product';
import { APIResponsModel } from '../../model/product';
import { MasterService } from './../../service/master.service';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  // ProductList: ProductList [] = [];

ProductList = signal<ProductList []>([]);


MasterService = inject(MasterService);

  ngOnInit(): void {
   this.loadAllProducts();
  }

  loadAllProducts(){
    this.MasterService.getAllProducts().subscribe((res:APIResponsModel)=>{
     this.ProductList.set(res.data);
    })
  }
}
