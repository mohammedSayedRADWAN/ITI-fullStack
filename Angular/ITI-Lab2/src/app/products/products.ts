import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // مهم عشان الـ Switch والـ For [cite: 28, 31]
import { FormsModule } from '@angular/forms'; // مهم عشان الـ Two-way binding [cite: 34]
import { Store } from '../models/store';
import { IProduct } from '../models/Iproduct';
import { ICategory } from '../models/icategory'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  // (1) Object of Store class [cite: 8]
  storeInfo: Store = new Store('ITI Tech Store', ['Cairo', 'Smart Village'], 'https://placehold.co/100x100?text=Logo');
  
  // (2) Property StoreOwner [cite: 9]
  storeOwner: string = 'Mohammed Sayed';

  // (3) Product List (Array of IProduct) [cite: 25]
  productList: IProduct[] = [
    { id: 1, name: 'iPhone 15', quantity: 10, price: 50000, img: 'https://placehold.co/200', categoryId: 1 },
    { id: 2, name: 'Samsung S24', quantity: 1, price: 45000, img: 'https://placehold.co/200', categoryId: 1 },
    { id: 3, name: 'Dell Laptop', quantity: 0, price: 35000, img: 'https://placehold.co/200', categoryId: 2 },
    { id: 4, name: 'HP Laptop', quantity: 2, price: 32000, img: 'https://placehold.co/200', categoryId: 2 }
  ];

  // (4) Search property for two-way binding [cite: 34]
  searchName: string = '';

  // (5) Buy button logic [cite: 32]
  buy(prd: IProduct) {
    if (prd.quantity > 0) {
      prd.quantity--;
    }
  }

  // (6) Details button logic [cite: 33]
  showDetails(prd: IProduct) {
    alert(`Product Name: ${prd.name}\nAvailable Quantity: ${prd.quantity}`);
  }
  categories: ICategory[] = [
  { id: 0, name: 'All' },
  { id: 1, name: 'Phones' },
  { id: 2, name: 'Laptops' }
];

selectedCatID: number = 0;
}


