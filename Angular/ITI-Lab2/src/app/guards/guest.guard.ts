import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * [Lab 6 Task 3] Guest Guard (Reverse Guard)
 * Prevents logged-in users from accessing Login and Register pages.
 */
export const guestGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // If user is already logged in, redirect them to home/products
    if (authService.isLoggedIn()) {
        router.navigate(['/products']);
        return false;
    }
    
    // Allow access to guests (non-logged-in users)
    return true;
};
