import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(protected authService: AuthService, private router :Router) {
  }

  handleLogout() {
    this.authService.logout()
  }
}
