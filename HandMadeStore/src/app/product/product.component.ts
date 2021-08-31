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

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  formGroup: FormGroup;
  @Input() product: Product;

  faHeart = faHeart;
  user: User
  id: number;
  searchCategory: categories;
  public isThisAdmin = false;

  @Output() productSelected = new EventEmitter<Product>();
  @Output() productDeleted = new EventEmitter<number>();

  constructor(
    private productService: productService,
    private authService: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.product = {
      title: '',
      description: '',
      picture: '',
      quantity: 0,
      price: '',
      category: '',
    }
  }

  ngOnInit(): void {
    this.loggedAdmin();

    // this.activatedRoute.queryParamMap.subscribe(data =>{
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
  
}

