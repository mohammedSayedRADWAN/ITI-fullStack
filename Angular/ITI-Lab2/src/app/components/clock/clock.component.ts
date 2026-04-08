import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html'
})
export class ClockComponent implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  private intervalId: any;

  ngOnInit(): void {
    console.log('Clock component initialized!');
    this.intervalId = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    console.log('Clock stopped');
  }
}
