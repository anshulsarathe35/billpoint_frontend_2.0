import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  today = new Date();
  activeTab = 'requests'; // 'requests' | 'shops' | 'analytics'
  shopRequests: any[] = [];
  shops: any[] = [];
  
  approvalPlan = 'Premium Plan';
  validMonths = 12;

  private adminApiUrl = 'http://localhost:8080/api/admin';

  constructor(public authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadShops();
  }

  loadRequests() {
    this.http.get<any[]>(`${this.adminApiUrl}/requests`).subscribe(data => {
      this.shopRequests = data;
    });
  }

  loadShops() {
    this.http.get<any[]>(`${this.adminApiUrl}/shops`).subscribe(data => {
      this.shops = data;
    });
  }

  approveRequest(id: number) {
    const payload = { planName: this.approvalPlan, validMonths: this.validMonths };
    this.http.post(`${this.adminApiUrl}/requests/${id}/approve`, payload).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.loadRequests();
        this.loadShops();
      },
      error: (err) => alert('Error approving: ' + err.error?.message)
    });
  }

  rejectRequest(id: number) {
    if(confirm('Are you sure you want to reject this request?')) {
      this.http.post(`${this.adminApiUrl}/requests/${id}/reject`, {}).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.loadRequests();
        },
        error: (err) => alert('Error rejecting: ' + err.error?.message)
      });
    }
  }

  get pendingRequestsCount(): number {
    return this.shopRequests.filter(req => req.status === 'PENDING').length;
  }

  logout() {
    this.authService.logout();
  }
}
