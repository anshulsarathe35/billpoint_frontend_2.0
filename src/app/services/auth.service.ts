// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:8080/api/auth';
  
//   constructor(private http: HttpClient, private router: Router) {}

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/signin`, credentials).pipe(
//       tap((res: any) => {
//         if (res.accessToken) {
//           localStorage.setItem('token', res.accessToken);
//           localStorage.setItem('userRole', res.role);
//           localStorage.setItem('user', JSON.stringify(res));
//           this.redirectBasedOnRole(res.role);
//         }
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('user');
//     this.router.navigate(['/login']);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getRole(): string | null {
//     return localStorage.getItem('userRole');
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   private redirectBasedOnRole(role: string): void {
//     switch (role) {
//       case 'ADMIN':
//         this.router.navigate(['/admin-dashboard']);
//         break;
//       case 'SHOP_OWNER':
//         this.router.navigate(['/shop-owner-dashboard']);
//         break;
//       case 'STAFF':
//         this.router.navigate(['/staff-dashboard']);
//         break;
//       case 'CUSTOMER':
//         this.router.navigate(['/customer-dashboard']);
//         break;
//       default:
//         this.router.navigate(['/login']);
//     }
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, credentials).pipe(
      tap(res => {

        console.log("Login Response:", res);   // 🔴 DEBUG

        if (res && res.accessToken) {

          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('userRole', res.role);
          localStorage.setItem('user', JSON.stringify(res));

          this.redirectBasedOnRole(res.role);
        } else {
          console.error("Token not found in response");
        }
      })
    );
  }

  register(userData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/signup`, userData);
}
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private redirectBasedOnRole(role: string): void {

    if(role === 'ADMIN'){
      this.router.navigate(['/admin-dashboard']);
    }
    else if(role === 'SHOP_OWNER'){
      this.router.navigate(['/shop-owner-dashboard']);
    }
    else if(role === 'STAFF'){
      this.router.navigate(['/staff-dashboard']);
    }
    else if(role === 'CUSTOMER'){
      this.router.navigate(['/customer-dashboard']);
    }
    else{
      this.router.navigate(['/login']);
    }

  }
}