import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.scss'
})
export class StaffDashboardComponent implements OnInit {
  activeTab = 'billing'; // billing, customers, attendance
  
  // Billing
  customerPhoneSearch = '';
  selectedCustomer: any = null;
  products: any[] = [];
  cart: any[] = [];
  paymentMode = 'CASH';
  discount = 0;

  // New Customer
  newCustomer: any = {};

  private apiUrl = 'http://localhost:8080/api';

  constructor(public authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    // In a real app, staff might need to fetch products. But products endpoint was mapped for shop-owner.
    // Need a public or staff-accessible endpoint for products. I'll mock products logic or call a generic one
    // Assuming staff can access shop products if we update Backend or use a workaround:
    this.http.get<any[]>(`${this.apiUrl}/shop-owner/products`).subscribe({
      next: (data) => this.products = data,
      error: () => console.log('Requires endpoint adjustment for staff product access.')
    });
  }

  // --- Attendance ---
  checkIn() {
    this.http.post(`${this.apiUrl}/staff/attendance/check-in`, {}).subscribe({
      next: (res: any) => alert(res.message),
      error: (err) => alert(err.error?.message)
    });
  }

  checkOut() {
    this.http.post(`${this.apiUrl}/staff/attendance/check-out`, {}).subscribe({
      next: (res: any) => alert(res.message),
      error: (err) => alert(err.error?.message)
    });
  }

  // --- Customers ---
  searchCustomer() {
    this.http.get<any>(`${this.apiUrl}/staff/customers/search?phone=${this.customerPhoneSearch}`).subscribe({
      next: (data) => {
        this.selectedCustomer = data;
        alert('Customer found: ' + data.name);
      },
      error: () => alert('Customer not found')
    });
  }

  addCustomer() {
    this.http.post<any>(`${this.apiUrl}/staff/customers`, this.newCustomer).subscribe({
      next: (data) => {
        alert('Customer registered successfully!');
        this.selectedCustomer = data;
        this.newCustomer = {};
        this.activeTab = 'billing'; // go back to billing
      },
      error: (err) => alert('Error: ' + err.error?.message)
    });
  }

  // --- Billing ---
  addToCart(product: any) {
    const item = this.cart.find(i => i.productId === product.id);
    if (item) {
      item.quantity += 1;
      item.totalPrice = item.quantity * item.pricePerUnit;
    } else {
      this.cart.push({
        productId: product.id,
        name: product.name,
        quantity: 1,
        pricePerUnit: product.price,
        totalPrice: product.price
      });
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  get cartTotal() {
    return this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  get finalAmount() {
    return this.cartTotal - this.discount;
  }

  generateBill() {
    if (!this.selectedCustomer) {
      alert('Please select or create a customer first.');
      return;
    }
    if (this.cart.length === 0) {
      alert('Cart is empty.');
      return;
    }

    const payload = {
      customerId: this.selectedCustomer.id,
      totalAmount: this.cartTotal,
      discount: this.discount,
      finalAmount: this.finalAmount,
      paymentMode: this.paymentMode,
      items: this.cart
    };

    this.http.post(`${this.apiUrl}/staff/bills`, payload).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.cart = [];
        this.selectedCustomer = null;
        this.customerPhoneSearch = '';
        this.discount = 0;
      },
      error: (err) => alert('Error creating bill: ' + err.error?.message)
    });
  }

  logout() {
    this.authService.logout();
  }
}
