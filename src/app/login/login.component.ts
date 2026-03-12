import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  selectedRole = 'CUSTOMER'; // Default role
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  selectRole(role: string) {
    this.selectedRole = role;
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        const role = response.role;
        
        switch(role) {
          case 'ADMIN':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'SHOP_OWNER':
            this.router.navigate(['/shop-owner-dashboard']);
            break;
          case 'STAFF':
            this.router.navigate(['/staff-dashboard']);
            break;
          case 'CUSTOMER':
            this.router.navigate(['/customer-dashboard']);
            break;
          default:
            this.errorMessage = 'Invalid role detected';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
