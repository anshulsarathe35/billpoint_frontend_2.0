import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent implements OnInit {
  activeTab = 'history'; // history, offers
  bills: any[] = [];
  offers: any[] = [];

  private apiUrl = 'http://localhost:8080/api/customer';

  constructor(public authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBills();
    this.loadOffers();
  }

  loadBills() {
    this.http.get<any[]>(`${this.apiUrl}/bills`).subscribe({
      next: (data) => this.bills = data,
      error: () => console.log('Notice: Customer mapping constraints on backend')
    });
  }

  loadOffers() {
    this.http.get<any[]>(`${this.apiUrl}/offers`).subscribe({
      next: (data) => this.offers = data,
      error: () => console.log('Notice: Customer mapping constraints on backend')
    });
  }

  logout() {
    this.authService.logout();
  }
}
