import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { __importDefault } from 'tslib';
import { Product } from "../Product.interface"
import { productService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  formGroup: FormGroup;
  @Input() product: Product;

  faHeart = faHeart;

  @Output() productSelected = new EventEmitter<Product>();
  @Output() productDeleted = new EventEmitter<number>();

  constructor(
    private productService: productService,
    private fb: FormBuilder
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

  }
}
