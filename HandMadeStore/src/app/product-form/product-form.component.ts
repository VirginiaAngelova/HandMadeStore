import { Component, OnDestroy, OnInit, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Product } from '../Product.interface';
import { productService } from '../product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  @Output() productSubmitted = new EventEmitter<Product>();
  formGroup: FormGroup;
  product: Product;
  destroy$ = new Subject<boolean>();
  picture:any;
  selectedImage: any = null;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: productService
    
  ) {
    this.product = {
      title: '',
      description: '',
      picture: '',
      price: '',
      quantity: 0,
      category: '',
     
    }
  }


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.product.id,
      title: this.product.title,
      description: this.product.description,
      picture: this.product.picture,
      price: this.product.price,
      qunatity: this.product.quantity,
      category: this.product.category,
    });
    
    this.productSubmitted.emit(this.formGroup.value);
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params.id;

      if (id) {
        this.getProduct(id)
      }
    })
    this.buildForm();
  }

//  onSelectedFile(event) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       this.formGroup.get('picture').setValue(file);
//     }
//   }
readUrl(event:any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      this.picture = (<FileReader>event.target).result;
    }

    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }
  else{
    this.picture = '';
    this.selectedImage = null;
  }
}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  onSubmit(): void {
    const product : Product = {
      title: this.formGroup.get('title').value,
      description: this.formGroup.get('description').value,
      picture:this.formGroup.get('picture').value,
      price:this.formGroup.get('price').value,
      quantity:this.formGroup.get('quantity').value,
      category:this.formGroup.get('category').value,
    }
    const formData = new FormData();
    formData.append('picture', this.formGroup.get('picture').value);
    // var  filePath = `${this.formGroup}/${this.selectedImage.name}`
 
    console.log(this.formGroup.value); 
    this.productSubmitted.emit(this.formGroup.value);
    if(!product.id){
      this.productService.addProduct({...product}).pipe(
        take(1)
      ).subscribe(()=>{
        this.router.navigate(['/products']);
      }, (error) => {
        console.log(error);
      });
      return;
  }

  this.productService.updateProduct(this.product).pipe(
    takeUntil(this.destroy$)
  ).subscribe( ()=>{
    this.router.navigate(['/products']);
  },(error) => {
    console.log(error);
  });
  }
  buildForm(): void {
    this.formGroup = this.fb.group({
      id: this.product.id,
      title: [this.product.title],
      description: [this.product.description],
      picture: [this.product.picture],
      price: [this.product.price],
      quantity: [this.product.quantity],
      category: [this.product.category],
    });
  }
  private getProduct(id: number): void {
    this.productService.getProductId(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.product = response;
      this.buildForm();
    });
  }
}
