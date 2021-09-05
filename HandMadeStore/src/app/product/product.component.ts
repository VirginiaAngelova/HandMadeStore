import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { __importDefault } from 'tslib';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Product } from "../Product.interface";
import { productService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { categories } from '../categories.interface';
import { ShoppingCartService } from '../shopping.cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  formGroup: FormGroup;
  @Input() product: Product;
  isLoadingVisible: string;
  
  faHeart = faHeart;
  user: User
  searchCategory: categories;
  public isThisAdmin = false;

  @Output() productSelected = new EventEmitter<Product>();
  @Output() productDeleted = new EventEmitter<number>();

  constructor(
    private productService: productService,
    private authService: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cartService : ShoppingCartService
  ) {
    this.product = {
      title: '',
      description: '',
      picture: '',
      quantity: 0,
      price: 0,
      category: '',
    }
  }

  ngOnInit(): void {
    this.loggedAdmin();

    // this.activatedRoute.params.subscribe(data =>{
    //   this.searchCategory = data.id;

    //   this.productService.getProductCategory(this.searchCategory).subscribe(categoryData => this.product = categoryData);
    // });

  }
  loggedAdmin(): void {
    const user = this.authService.getLoggedUser();
    if (user.role === 'admin') {
      this.isThisAdmin = true;
    }
  }
  onAddCart(product: any){
    this.cartService.addtoCart(product);
  }
  onAddAsFavorite(product: any){
    this.cartService.addtoFavorite(product);
  }
  
}

