import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { SignupPayload, LoginPayload } from '../auth/interfaces/AuthTypes';
import { Router } from '@angular/router';

type AuthViewState = 'Login' | 'Signup';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  viewState: AuthViewState = "Login"

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/perfiles']);
    }
  }

  setView(view: AuthViewState) {
    this.viewState = view;
  }

  async trySignup(payload: SignupPayload) {
    try {
      await this.auth.signup(payload)
      window.location.reload();
    } catch (err) {
      console.warn(err.message);
    }
  }

  async tryLogin(payload: LoginPayload) {
    try {
      await this.auth.login(payload)
      window.location.reload();
    } catch (err) {
      console.warn(err.message);
    }
  }

}
