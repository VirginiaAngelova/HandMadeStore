import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../Product.interface';
import { productService } from '../product.service';
import { takeUntil } from 'rxjs/operators';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() product: Product[];

  selectedProduct: Product;
  destroy$ = new Subject<boolean>();
  user: User

  constructor(private productService: productService) {
    this.selectedProduct = {
      title: '',
      description: '',
      picture: '',
      quantity: 0,
      price: '',
      category: '',
    };
  }
  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getProducts(): void {
    this.productService.getProduct().pipe(
      takeUntil(this.destroy$)
    ).subscribe((response: Product[]) => {
      this.product = response;
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  onProductSelect(product: Product): void {
    this.selectedProduct = product;
  }
  onProductDelete(id: number): void {
    this.productService.deleteProduct(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getProducts();
    }, (error) => {
      console.log(error);
    });
  }
}