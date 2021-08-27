import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  errorMessage: string;
  formGroup: FormGroup;
  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router:Router) {

               }

  ngOnInit(): void {
    this.buildForm();
  }
onSubmit():void{
  const formValue = this.formGroup.value;

  if(formValue.password !== formValue.rePassword){
    
    this.errorMessage = "Паролите не съвпадат.";
    this.formGroup.reset({
      username: formValue.username,
      email: formValue.email,
      password:'',
      rePassword:''
    });
    return;
  }
  
  this.authService.getUsers().pipe(
    map((stream: User[])=> stream.find(user => user.email === formValue.email)),
    take(1)
  ).subscribe(response =>{
    if(response){
      this.errorMessage = "Посоченият имейл вече се използва.";
      return;
    }
   this.authService.register(formValue).pipe(
     take(1)
   ).subscribe(() =>{
    this.router.navigate(['login']);
   });
  })
}
  private buildForm():void{
this.formGroup = this.fb.group({
  name: ['', Validators.required],
  username: ['', Validators.required],
  email: ['', Validators.required],
  password: ['',[ Validators.required, Validators.minLength(5)]],
  rePassword: ['', [Validators.required,Validators.minLength(5)]],
});
}
}
