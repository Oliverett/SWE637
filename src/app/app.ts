import { Component, OnInit } from '@angular/core';
import { Shoe } from './models/shoe.model';
import { CartService } from './services/cart.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class AppComponent implements OnInit {
  public cartItemCount: number = 0;
  shoes: Shoe[] = [
    { 
      id: '1',
      name: 'Nike vomero 5', 
      price: 120, 
      size: [8,9,10,11], 
      category: 'Running', 
      imageUrl: 'assets/air-runner.jpg',
      description: 'Premium running shoes with advanced cushioning',
      brand: 'Nike',
      color: 'Black/White',
      inStock: true,
      rating: 4.5,
      reviews: 120
    },
    { 
      id: '2',
      name: 'Reebok Question', 
      price: 85, 
      size: [6,7,8,9], 
      category: 'Casual', 
      imageUrl: 'assets/street-sneak.jpg',
      description: 'Classic basketball-inspired casual shoes',
      brand: 'Reebok',
      color: 'White/Red',
      inStock: true,
      rating: 4.3,
      reviews: 85
    },
    { 
      id: '3',
      name: 'Adidas Crazy 8', 
      price: 95, 
      size: [9,10,11,12], 
      category: 'Basketball', 
      imageUrl: 'assets/court-pro.jpg',
      description: 'Professional basketball shoes with superior grip',
      brand: 'Adidas',
      color: 'Black/Gold',
      inStock: true,
      rating: 4.7,
      reviews: 150
    }
  ];

  filtered: Shoe[] = [...this.shoes];

  onFilterChange(filteredList: Shoe[]) {
    this.filtered = filteredList;
  }

  constructor(public cart: CartService) {}

  ngOnInit(): void {
    this.cart.getCart().subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }
}