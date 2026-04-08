import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';

  // [Lab 6 Task 2] Login using Platzi API
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      tap((res: any) => {
        // [Lab 6 Task 2] Save returned token in localStorage
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
        }
      })
    );
  }

  // Helper to check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // [Lab 6 Task 4] Logout logic
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // [Lab 6 Task 1] Real API Registration using Platzi API
  register(userData: any): Observable<any> {
    const userPayload = {
      name: userData.fullName,
      email: userData.email,
      password: userData.password,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' // Mock avatar
    };
    return this.http.post('https://api.escuelajs.co/api/v1/users/', userPayload);
  }
}
