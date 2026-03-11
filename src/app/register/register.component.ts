import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form = {
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'CUSTOMER'
  };

  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    this.authService.register(this.form).subscribe({

      next: (res:any) => {
        this.message = res.message || "Registered successfully";
        this.router.navigate(['/login']);
      },

      error: (err) => {
        this.error = err.error.message;
      }

    });

  }

}