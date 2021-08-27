import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage:string;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }
  onSubmit(): void{
    this.errorMessage = null;
    const email = this.formGroup.get('email').value;
    const password = this.formGroup.get('password').value;

    this.authService.login(email,password).pipe(
      take(1))
      .subscribe(response => {
        if(!response){
          this.errorMessage = "Грешен имейл или парола";
          return
        }
        this.authService.setLoggedUser(response);
        this.router.navigate(['products']);
      });
  }
  private buildForm(): void{
    this.formGroup = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
    })
  }

}
