import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public cartItemList : any =[];
  public favoriteItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public favoriteProductList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }
  getProductsAsFavorite(){
    return this.favoriteProductList.asObservable();
  }


  setProduct(product : any){
    this.cartItemList.push(...product);
    this.favoriteItemList.push(...product);
    this.productList.next(product);
    this.favoriteProductList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    console.log(this.cartItemList)
  }
  addtoFavorite(product : any){
    this.favoriteItemList.push(product);
    this.favoriteProductList.next(this.favoriteItemList);
    console.log(this.favoriteItemList)
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}