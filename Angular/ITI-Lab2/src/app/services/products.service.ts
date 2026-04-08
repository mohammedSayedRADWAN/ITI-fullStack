import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  // [Lab 6 Task 1] Real data from Platzi Fake Store API
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  
  // Storage for list and single product fetching
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // [Lab 6 Task 1] For Details view
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // [Lab 6 Task 5] Product Search using Platzi API filtering
  searchProducts(title: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/?title=${title}`);
  }

  // Filtering by category if needed
  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/?categoryId=${categoryId}`);
  }

  // Buy logic (still handled locally or via service state)
  buyProduct(prd: any): void {
     console.log('Buying product (Platzi API Integration):', prd.title);
  }
}
