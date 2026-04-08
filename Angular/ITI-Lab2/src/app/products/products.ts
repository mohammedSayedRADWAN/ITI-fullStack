import { Component, Input, OnChanges, SimpleChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Store } from '../models/store';
import { IProduct } from '../models/Iproduct';
import { ICategory } from '../models/icategory'; 
import { ProductCardDirective } from '../directives/product-card.directive';
import { CreditCardFormatPipe } from '../pipes/credit-card-format.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsService } from '../services/products.service';
import { Observable, map } from 'rxjs';

/**
 * [Day 6 Task 1] Unified Products List
 * Integrates Real-time Platzi API fetching and dynamic rendering.
 */
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardDirective, CreditCardFormatPipe, ProductDetailComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsListComponent implements OnInit, OnChanges {
  // Store info for interpolation [Lab 3]
  storeInfo: Store = new Store('ITI Premium Store', ['Cairo', 'Smart Village'], 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=100&h=100&auto=format&fit=crop');
  storeOwner: string = 'Mohammed Sayed';
  currentDate: Date = new Date();
  ccNumber: string = '1234567812345678';
  
  // Selection state
  selectedProduct: any | null = null;
  
  // [Lab 6 Task 1] Real API products observable stream
  products$: Observable<any[]>;
  private productsService = inject(ProductsService);

  @Input() searchFilter: string = '';
  private _selectedCatID: number = 0;
  get selectedCatID(): number { return this._selectedCatID; }
  set selectedCatID(val: number) {
    this._selectedCatID = Number(val);
    this.refreshProducts();
  }

  constructor() {
    // Initial data stream setup
    this.products$ = this.productsService.getAllProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchFilter']) {
      this.refreshProducts();
    }
  }

  ngOnInit(): void {
    this.refreshProducts();
  }

  // [Lab 6 Task 1] Dynamic fetching logic
  private refreshProducts() {
    // We can filter locally for simplicity or use the search API if term is present.
    // For the "List" view, we keep it simple.
    this.products$ = this.productsService.getAllProducts().pipe(
      map(items => items.filter(item => 
        (this.selectedCatID === 0 || item.category.id === this.selectedCatID) &&
        (item.title.toLowerCase().includes(this.searchFilter.toLowerCase()))
      ))
    );
  }

  // [Lab 6 Task 1] Buying logic
  buy(prd: any) {
    this.productsService.buyProduct(prd);
  }

  showDetails(prd: any) {
    this.selectedProduct = prd;
  }

  hideDetails() {
    this.selectedProduct = null;
  }

  // Platzi API Category IDs (Examples mapped to our labels)
  categories: any[] = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Clothes' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Furniture' }
  ];
}
