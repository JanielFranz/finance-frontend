import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import {SignInServiceService} from "../../../services/sign-in-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{

  hide: boolean = true;
  loginForm: FormGroup;
  result:any;

  constructor(
    private formBuilder: FormBuilder,
    private signInService: SignInServiceService,
    private router:Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.signInService.login(email, password).subscribe(
      (response) => {
        this.result=response;
        console.log(response);
        if(this.result){
          sessionStorage.setItem('userid', this.result.id);
          console.log('funciono')
          this.router.navigate(['home']);

        }
      },
      (error) => {

        console.error(error);
      }
    );
  }


}
