import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Observable, BehaviorSubject, switchMap, of, EMPTY } from 'rxjs';

/**
 * [Day 6 Task 5] Product Search / Filter Page
 * Features: Platzi API Dynamic Filtering, Async Data Rendering
 */
@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-products.html',
  styleUrl: './search-products.css'
})
export class SearchProductsComponent {
  // [Lab 6 Task 5] Search Input Binding
  searchTerm: string = '';
  
  // Results stream using BehaviorSubject for efficient search triggering
  private searchSubject = new BehaviorSubject<string>('');
  
  // Real products observable from Platzi API
  products$: Observable<any[]>;

  private productsService = inject(ProductsService);

  constructor() {
    // React to search term changes and fetch from API
    this.products$ = this.searchSubject.pipe(
      switchMap(term => {
        if (!term.trim()) return of([]); // empty results if no search
        return this.productsService.searchProducts(term);
      })
    );
  }

  // Handle button click for search
  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }
}
