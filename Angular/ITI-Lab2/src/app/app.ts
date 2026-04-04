import { Component, signal } from '@angular/core';
// 1. استيراد مكون المنتجات
import { Products } from './products/products'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. إضافة المكون هنا
  imports: [Products], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ITI-Lab2');
}