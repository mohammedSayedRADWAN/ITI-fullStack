import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/products';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SearchProductsComponent } from './components/products/search-products/search-products';
import { guestGuard } from './guards/guest.guard';

/**
 * [Lab 6 Task 2/3] Routing Configuration
 * Includes API-driven login, registration, and guest guards.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'search-products', component: SearchProductsComponent },
  // [Lab 6 Task 3] Secure login/register with guest guard
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { path: '**', redirectTo: 'products' }
];
