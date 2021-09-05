import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  public shippingInformation : any = [];
  formGroup: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.shippingInformation.id,
      title: this.shippingInformation.name,
      description: this.shippingInformation.familyName,
      picture: this.shippingInformation.phone,
      price: this.shippingInformation.address,
      qunatity: this.shippingInformation.message
  });
}
  // onSubmit(): void {
  //   const shippingInformation: shippingInformation = {
  //     ...this.formGroup.value,
  //     name: this.formGroup.get('name').value,
  //     familyName: this.formGroup.get('familyName').value,
  //     phone: this.formGroup.get('phone').value,
  //     address: this.formGroup.get('address').value,
  //     message: this.formGroup.get('message').value,
  //   }
  // }

}
