import { Component, Input, OnInit } from '@angular/core';
import { categories } from '../categories.interface';
import { Product } from "../Product.interface";
import { productService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product-by-category',
  templateUrl: './view-product-by-category.component.html',
  styleUrls: ['./view-product-by-category.component.css']
})
export class ViewProductByCategoryComponent implements OnInit {
  searchCategory: categories;
  @Input() product: Product;

  constructor( private productService: productService,
     private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(data =>{
      this.searchCategory = data.id;

      this.productService.getProductCategory(this.searchCategory).subscribe(categoryData => this.product = categoryData);
    });
  }
  

}
