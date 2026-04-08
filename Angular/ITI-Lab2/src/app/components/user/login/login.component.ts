import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

/**
 * [Day 5 Lab Task 2] User Login Component
 * Features: Reactive Forms, Bootstrap Validation, AuthService Integration
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // [Lab 5] Main form group for login
  loginForm: FormGroup;
  
  // UI States for handling login feedback
  loginSuccess: boolean = false;
  loginError: boolean = false;
  userData: any = null;

  // [Lab 5] Modern DI using inject()
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    // [Lab 5] Initializing the Login Form with reactive validators
    this.loginForm = this.fb.group({
      // i. Email: required, email validator
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      // ii. Password: required, min length 6
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // [Lab 5] Getter for convenient access to form controls in template
  get f() { return this.loginForm.controls; }

  // [Lab 6 Task 2] Handle Login Submission
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      // Perform API login and subscribe
      this.authService.login(email, password).subscribe({
        next: (res) => {
          this.loginSuccess = true;
          this.loginError = false;
          this.userData = { email };
          
          // Clear form and Redirect [Lab 6 Req]
          this.loginForm.reset();
          console.log('Login Successful!', res);
          
          // Navigate to products after a short delay to show success
          setTimeout(() => {
             this.router.navigate(['/products']);
          }, 1000);
        },
        error: (err) => {
          this.loginError = true;
          this.loginSuccess = false;
          this.userData = null;
          console.error('Login Error:', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // [Lab 5] Reset the form manually
  onReset() {
    this.loginForm.reset();
    this.loginSuccess = false;
    this.loginError = false;
    this.userData = null;
  }
}
