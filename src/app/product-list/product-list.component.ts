import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { Shoe } from '../models/shoe.model';
import { ShoeService } from '../services/shoe.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CartComponent],
  providers: [CartService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  shoes: Shoe[] = [];
  filteredShoes: Shoe[] = [];
  categories: string[] = [];
  sizes: number[] = [];
  
  selectedCategory: string = '';
  selectedSize: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(
    private shoeService: ShoeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadShoes();
    this.categories = this.shoeService.getCategories();
    this.sizes = this.shoeService.getSizes();
  }

  loadShoes(): void {
    this.shoeService.getShoes().subscribe(shoes => {
      this.shoes = shoes;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredShoes = this.shoeService.filterShoes(
      this.selectedCategory,
      this.minPrice || undefined,
      this.maxPrice || undefined,
      this.selectedSize || undefined
    );
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSizeChange(size: number | null): void {
    this.selectedSize = size;
    this.applyFilters();
  }

  onPriceRangeChange(): void {
    this.applyFilters();
  }

  addToCart(shoe: Shoe, size: number): void {
    this.cartService.addToCart(shoe, size);
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedSize = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.applyFilters();
  }
}
