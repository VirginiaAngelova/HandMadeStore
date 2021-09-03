import { Component, OnChanges, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping.cart.service';
import { faTrash, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  public products : any = [];
  public totalPrice : number;
  
  faShoppingBag = faShoppingBag;
  faTrash = faTrash;
  allTotal:number;
  dafualtQuantity:number=1;

  constructor(private cartService : ShoppingCartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.gettotaal();      
    })
  }
  
  removeItem(product: any){
    this.cartService.removeCartItem(product);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  gettotaal(): Observable<number> {
    this.totalPrice = 0;
    this.products.forEach((item, index) => {
      this.totalPrice += item.price;
    });
    console.log(this.totalPrice);
    return of(this.totalPrice);
  }
  
}
