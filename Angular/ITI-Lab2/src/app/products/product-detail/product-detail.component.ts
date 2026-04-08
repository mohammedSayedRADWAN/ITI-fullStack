import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/Iproduct';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  // [Lab 4] Day 4 Task: Use inject() function for ProductsService (Modern DI approach)
  private productsService = inject(ProductsService);

  // [Lab 3] Receive product data from Parent component (ProductsListComponent)
  @Input() product: IProduct | null = null;
  
  // [Lab 3] Notify Parent when user clicks "Close Details" to hide component
  @Output() close = new EventEmitter<void>();

  // [Lab 6 Task 1] Helper to robustly handle Platzi API image paths
  // Some public entries have stringified arrays like '["https://img.com"]'
  getImageUrl(images: string[] | undefined): string {
    if (!images || images.length === 0) return 'assets/placeholder.png';
    const firstImg = images[0];
    
    // Check if the image string starts with brackets (common in public test data)
    if (firstImg.startsWith('[') && firstImg.endsWith(']')) {
      try {
        const parsed = JSON.parse(firstImg);
        return Array.isArray(parsed) ? parsed[0] : firstImg;
      } catch {
        return firstImg.replace(/[\[\]"]/g, ''); // Crude fallback
      }
    }
    return firstImg;
  }

  // [Lab 3] Event method to trigger @Output notification to parent
  onClose() {
    this.close.emit();
  }

  // [Lab 4] Day 4 Task: Use moved buy logic from service
  buy() {
    if (this.product) {
      this.productsService.buyProduct(this.product);
    }
  }
}
