import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { passwordValidation } from '../../directives/validations/password.directive';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  public animation: boolean = false;

  get email() { return this.loginForm.get('email') };
  get pass() { return this.loginForm.get('pass') };

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, passwordValidation()])
  })

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.animation = true;
    console.log('submit -->', this.loginForm.value);
    this.firebaseService.login(this.loginForm.value.email, this.loginForm.value.pass).then(resp => {
      console.log('response login -->', resp);
      this.animation = false;
    }).catch(error => {
      console.error('error login -->', error);
      this.animation = false;
    })
  }

}
