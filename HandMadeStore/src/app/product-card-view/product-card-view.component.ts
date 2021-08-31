import { Component, EventEmitter, Input, OnInit, Output, Pipe } from '@angular/core';
import { Product } from "../Product.interface"
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product-card-view',
  templateUrl: './product-card-view.component.html',
  styleUrls: ['./product-card-view.component.css']
})

export class ProductCardViewComponent implements OnInit {
  @Input() product: Product[];

  @Output() productSelected = new EventEmitter<Product>();
  @Output() productDeleted = new EventEmitter<number>();
  

  selectedProduct: Product;
  data: string;
  public isThisAdmin: boolean;
  
  constructor(private AuthService: AuthService){}

  ngOnInit(): void {
    this.loggedAdmin();
  }

  onProductSelected(product: Product):void{
    this.selectedProduct = product;
  }

  onProductEdit(product: Product) : void {
  this.productSelected.emit({
    ...product
  });
  }
  loggedAdmin(): void {
    const user = this.AuthService.getLoggedUser();
    if (user.role === 'admin') {
      this.isThisAdmin = true;
    }
  }

}

