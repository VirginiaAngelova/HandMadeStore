import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShoppingCartService } from '../shopping.cart.service';
import { faTrash, faShoppingBag } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
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
    })
  }
  
  removeFromFavorite(product: any){
    this.cartService.removeCartItem(product);
  }
  clearFavorite(){
    this.cartService.removeAllCart();
  }
  onAddCartFromFavorite(product: any){
    this.cartService.addtoFavorite(product);
  }
}
