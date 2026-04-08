import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ClockComponent } from './components/clock/clock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ClockComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'ITI Premium Tech Store';
  searchText: string = '';
  showClock: boolean = false;
  
  // [Lab 6 Task 4] Managing Auth State for Navbar
  authService = inject(AuthService);

  toggleClock() {
    this.showClock = !this.showClock;
  }

  // [Lab 6 Task 4] Navbar logout
  onLogout() {
    this.authService.logout();
  }
}