import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appProductCard]',
  standalone: true
})
export class ProductCardDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Applying rounded border and shadow
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #e0e0e0');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '15px');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 8px 24px rgba(149, 157, 165, 0.2)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease, box-shadow 0.3s ease');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff');
  }
}
