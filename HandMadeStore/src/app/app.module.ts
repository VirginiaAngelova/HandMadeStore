import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesComponent } from './categories/categories.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product/product.component';
import { ProductCardViewComponent } from './product-card-view/product-card-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NonAuthGuard } from './auth/guards/non-auth.guard';

const routers: Routes = [{
  path: "",
  component: HomeComponent,
  canActivate: [NonAuthGuard]
},
{
  path: "categories",
  component: CategoriesComponent,
  canActivate: [NonAuthGuard]
},
{
  path: "aboutUs",
  component: AboutUsComponent,
  canActivate: [NonAuthGuard]
},
{
  path: "login",
  component: LoginComponent,
  canActivate: [NonAuthGuard]
  
},
{
  path: "signUp",
  component: SignUpComponent,
  canActivate: [NonAuthGuard]

},
{
  path: "products",
  component: ProductListComponent,
  canActivate: [AuthGuard]
},
{
  path: "productForm",
  component: ProductFormComponent,
  canActivate: [AuthGuard]

},
{
  path: 'products/add',
  component:ProductFormComponent,
  canActivate: [AuthGuard]
},
{
  path: 'products/edit/:id',
  component: ProductFormComponent,
  canActivate: [AuthGuard]
}
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    AboutUsComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    FooterComponent,
    SignUpComponent,
    ProductFormComponent,
    ProductComponent,
    ProductCardViewComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
