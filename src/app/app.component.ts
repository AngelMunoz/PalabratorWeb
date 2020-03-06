import { Component } from '@angular/core';
import { AuthService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Palabrator Web';
  isAuthenticated = false;
  isMenuOpen = false;

  constructor(private readonly auth: AuthService) {
    this.isAuthenticated = auth.isAuthenticated();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.auth.logout();
  }
}
