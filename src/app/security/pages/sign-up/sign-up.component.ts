import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { matchpassword } from './matchpassword.validator';
import {SignUpService} from "../../../services/sign-up.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private customerService: SignUpService,
              private router:Router
              ) {
  }

  ngOnInit() {
  }

  signUpForm: FormGroup = this.formBuilder.group({
    name: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    dni: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cpassword: ['', [Validators.required]],
  },
  {
    validators:matchpassword
  })


  onRegister() {
    if (!this.signUpForm.valid) {
      console.log('Mal fomrulario');
      return ;
    }
    console.log(this.signUpForm.value);

    const customerData = this.signUpForm.value;

    // Realiza la solicitud POST para registrar al cliente
    this.customerService.registerCustomer(customerData).subscribe(
      (response) => {
        this.router.navigate(['sign-in']);
        console.log('Funciona registro:', response);
      },
      (error) => {
        console.error('Error en registro:', error);
      }
    );


  }

}
