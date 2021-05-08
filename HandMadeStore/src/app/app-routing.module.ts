import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "categories",
  component: CategoriesComponent
},
{
  path: "aboutUs",
  component: AboutUsComponent
},
{
  path: "login",
  component: LoginComponent
},
{
  path: "signUp",
  component: SignUpComponent
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
