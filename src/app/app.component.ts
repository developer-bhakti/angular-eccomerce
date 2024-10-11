import { MasterService } from './service/master.service';
import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APIResponsModel, CartData, Customer, LoginModel } from './model/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angularecommerce';

  registerObj: Customer = new Customer();
  loginObj: LoginModel = new LoginModel();

  loggedUserData: Customer = new Customer();
  MasterService = inject(MasterService);

  @ViewChild("registerModel") registerModel: ElementRef | undefined;
  @ViewChild("loginModel") loginModel: ElementRef | undefined;
  isCartPopupOpen: boolean = false;
  cartData: CartData [] = []

  ngOnInit(): void {
      const isUser = localStorage.getItem('Constant.LOCAL_KEY');
      if(isUser != null){
        const parsObj = JSON.parse(isUser);
        this.loggedUserData = parsObj;
        this.getCartItems();
      }
      this.MasterService.onCartAdded.subscribe((res:boolean)=>{
        if(res){
          this.getCartItems();
        }
      })
  }

  onRemoveProduct(cartId: number){
    debugger;
    this.MasterService.deleteProductFromCartById(cartId).subscribe((res:APIResponsModel)=>{
     if(res.result){
      alert("Product Removeded From Cart");
      this.getCartItems();
     } else {
      alert(res.message)
     }
    })
  }

  getCartItems(){
    this.MasterService.getCartProductsByCustomerId(this.loggedUserData.custId).subscribe((res:APIResponsModel)=>{
     this.cartData = res.data;
    })
  }

  showCartPopup(){
    this.  isCartPopupOpen = !this.  isCartPopupOpen;
  }

  logOff(){
    localStorage.removeItem('Constant.LOCAL_KEY');
    this.loggedUserData = new Customer();
  }

  openRagisterModel(){
   if(this. registerModel){
    this. registerModel.nativeElement.style.display = "block"
   }
  }

  closeRagisterModel(){
    if(this.registerModel){
     this.registerModel.nativeElement.style.display = "none"
    }
   }

   openLoginModel(){
    if(this.loginModel){
     this.loginModel.nativeElement.style.display = "block"
    }
   }

   closeLoginModel(){
     if(this.loginModel){
      this.loginModel.nativeElement.style.display = "none"
     }
    }

   onRegister(){
    debugger;
     this.MasterService.registerNewCustomer(this.registerObj).subscribe((res:APIResponsModel)=>{
      if(res.result){
        alert("Registeration Successfull");
        this.  closeRagisterModel();
      } else{
        alert(res.message)
      }
     })
   }

   onLogin(){
    debugger;
     this.MasterService.onLogin(this.loginObj).subscribe((res:APIResponsModel)=>{
      if(res.result){
        this.loggedUserData = res.data;
        localStorage.setItem('Constant.LOCAL_KEY',JSON.stringify(res.data))
        this.closeLoginModel();
      } else{
        alert(res.message)
      }
     })
   }
}
