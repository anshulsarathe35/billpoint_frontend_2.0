import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShopOwnerDashboardComponent } from './shop-owner-dashboard/shop-owner-dashboard.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
  path: 'register',
  loadComponent: () => import('./register/register.component')
    .then(m => m.RegisterComponent)
},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'shop-owner-dashboard', component: ShopOwnerDashboardComponent },
  { path: 'staff-dashboard', component: StaffDashboardComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: '**', redirectTo: '' }
  
];
