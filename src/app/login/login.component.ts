import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSubmit() {

  this.isLoading = true;
  this.errorMessage = '';

  console.log("Sending Credentials:", this.credentials);

  this.authService.login(this.credentials).subscribe({

    next: (res) => {

      console.log("Login success:", res);

      this.isLoading = false;
    },

    error: (err) => {

      console.error("Login Error:", err);

      this.isLoading = false;
      this.errorMessage = err.error?.message || 'Login failed. Please check credentials.';
    }

  });

}
}
