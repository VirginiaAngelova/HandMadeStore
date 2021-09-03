import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { categories } from '../categories.interface';
import { categoriesService } from '../categories.service';
import { Product } from '../Product.interface';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  @Input() categories: categories[];
  selectedCategory: categories;
  destroy$ = new Subject<boolean>();

  constructor(private categoriesService: categoriesService) { 
    this.selectedCategory = {
      categoryName: '',
      categoryPicture: ''
    };
  }

  ngOnInit(): void {
    this.getCategories();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getCategories(): void {
    this.categoriesService.getCategory().pipe(
      takeUntil(this.destroy$)
    ).subscribe((response: categories[]) => {
      this.categories = response;
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  onCategorySelect(category: categories): void {
    this.selectedCategory = category;
  }

}
