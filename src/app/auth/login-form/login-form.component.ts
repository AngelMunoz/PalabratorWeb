import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginPayload } from '../interfaces/AuthTypes';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() onLogin: EventEmitter<LoginPayload> = new EventEmitter();

  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }



  onSubmit() {
    const value = { ...this.loginForm.value }
    this.onLogin.emit(value);
  }
}
