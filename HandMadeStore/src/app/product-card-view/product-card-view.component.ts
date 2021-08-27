import { Component, EventEmitter, Input, OnInit, Output, Pipe } from '@angular/core';
import { Product } from "../Product.interface"
import { productService } from '../product.service';

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
  
  constructor(){}

  ngOnInit(): void {
  }

  onProductSelected(product: Product):void{
    this.selectedProduct = product;
  }

  onProductEdit(product: Product) : void {
  this.productSelected.emit({
    ...product
  });

  }

}

