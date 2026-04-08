import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

/**
 * [Day 5 Lab Task] User Registration Component
 * Features: Reactive Forms, Dynamic Form Arrays, Custom Validators, Bootstrap Validation
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  // [Lab 5] Main form group for registration
  registerForm: FormGroup;
  
  // Storage for displaying successfully submitted data in a card
  submittedData: any = null;

  // [Lab 5] Modern DI using inject()
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    // [Lab 5] Initializing the form with validations
    this.registerForm = this.fb.group({
      // i. Full Name: required, min length 5
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      // ii. Email: required, email validator, and regex pattern
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      // iii. Mobile Numbers: Dynamic Form Building using FormArray
      mobileNumbers: this.fb.array([
        this.fb.control('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
      ]),
      // iv. Password: required, min length 6
      password: ['', [Validators.required, Validators.minLength(6)]],
      // v. Confirm Password: required (Match validation handled at group level)
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // [Lab 5] Getter for convenient access to form controls in template
  get f() { return this.registerForm.controls; }

  // [Lab 5] Getter for the Dynamic Mobile Numbers array
  get mobileNumbers(): FormArray {
    return this.registerForm.get('mobileNumbers') as FormArray;
  }

  // [Lab 5] Method to add a new mobile input field dynamically
  addMobile() {
    this.mobileNumbers.push(this.fb.control('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]));
  }

  // [Lab 5] Method to remove a specific extra mobile input
  removeMobile(index: number) {
    if (this.mobileNumbers.length > 1) {
      this.mobileNumbers.removeAt(index);
    }
  }

  // [Lab 5] Custom Validator to ensure Password and ConfirmPassword match
  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      // Set error on the confirmPassword control itself for UI feedback
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  };

  // [Lab 6 Task 1] Handle Form Submission
  onSubmit() {
    if (this.registerForm.valid) {
      this.submittedData = { ...this.registerForm.value };
      
      // Call real API and subscribe
      this.authService.register(this.submittedData).subscribe({
        next: (res) => {
          console.log('API Registration Successful!', res);
          this.registerForm.reset();
        },
        error: (err) => console.error('Registration API Error:', err)
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // [Lab 5] Reset the form and clear the success display
  onReset() {
    // Reset basic fields
    this.registerForm.reset();
    
    // Clear the FormArray back to just one empty field (Requirement: start fresh)
    while (this.mobileNumbers.length > 1) {
      this.mobileNumbers.removeAt(1);
    }
    
    // Specifically clear the displayed submitted data if user manually resets
    if (this.registerForm.pristine) {
      // this.submittedData = null; // Decided to keep it for visual confirmation unless explicitly needed
    }
  }
}
