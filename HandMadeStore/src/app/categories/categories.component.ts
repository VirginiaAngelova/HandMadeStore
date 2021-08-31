import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { categories } from '../categories.interface';
import { categoriesService } from '../categories.service';
import { Product } from '../Product.interface';
import { productService } from '../product.service';
import { Router, Params, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  // category: categories
  products: Product[] = [];
  categories: categories;
  filteredProducts: Product[] = [];
  categories$: Observable<any>;
  category: string;
  products$: Observable<any>;

  result: any;

  constructor(
    private categoriesService: categoriesService,
    private productService: productService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
   
  }

  ngOnInit(): void {
    this.getProductCategory();

  }
  getProductCategory(): void {
    this.productService.getProduct().subscribe((res) => {
      this.result = res;
    })
  }


}
