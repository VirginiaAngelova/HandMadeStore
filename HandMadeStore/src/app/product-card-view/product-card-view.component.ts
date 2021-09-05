import { Component, EventEmitter, Input, OnInit, Output, Pipe } from '@angular/core';
import { Product } from "../Product.interface"
import { AuthService } from '../auth/auth.service';
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
  data: string;
  public isThisAdmin: boolean;

  products: Product[] = [];
  currentProduct?: Product;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 10];
  
  constructor(private AuthService: AuthService,
    private productService: productService){}

  ngOnInit(): void {
    this.loggedAdmin();
    this.retrieveProducts();
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

  
  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveProducts(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.productService.getAll(params)
    .subscribe(
      response => {
        const { products, totalItems } = response;
        this.products = products;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProducts();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveProducts();
  }

}

