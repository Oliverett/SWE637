import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shoe } from '../models/shoe.model';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {
  private shoes: Shoe[] = [
    {
      id: '1',
      name: 'Nike Air Max 270',
      price: 150,
      size: [7, 8, 9, 10, 11],
      category: 'Running',
      imageUrl: 'assets/images/nike-air-max-270.jpg',
      description: 'The Nike Air Max 270 delivers visible cushioning under every step with a large window and fresh color.',
      brand: 'Nike',
      color: 'Black/White',
      inStock: true,
      rating: 4.5,
      reviews: 128,
      discount: 10
    },
    {
      id: '2',
      name: 'Adidas Ultraboost 22',
      price: 180,
      size: [7, 8, 9, 10, 11, 12],
      category: 'Running',
      imageUrl: 'assets/images/adidas-ultraboost-22.jpg',
      description: 'The Ultraboost 22 features a responsive Boost midsole and a Primeknit upper that adapts to your foot.',
      brand: 'Adidas',
      color: 'White/Blue',
      inStock: true,
      rating: 4.8,
      reviews: 256
    },
    {
      id: '3',
      name: 'New Balance 574',
      price: 100,
      size: [7, 8, 9, 10],
      category: 'Casual',
      imageUrl: 'assets/images/new-balance-574.jpg',
      description: 'A classic sneaker with premium suede and mesh upper, ENCAP midsole technology.',
      brand: 'New Balance',
      color: 'Grey/Red',
      inStock: true,
      rating: 4.3,
      reviews: 89
    }
  ];

  private shoesSubject = new BehaviorSubject<Shoe[]>(this.shoes);

  constructor() { }

  getShoes(): Observable<Shoe[]> {
    return this.shoesSubject.asObservable();
  }

  getShoeById(id: string): Shoe | undefined {
    return this.shoes.find(shoe => shoe.id === id);
  }

  filterShoes(category?: string, minPrice?: number, maxPrice?: number, size?: number): Shoe[] {
    return this.shoes.filter(shoe => {
      let matches = true;
      
      if (category) {
        matches = matches && shoe.category.toLowerCase() === category.toLowerCase();
      }
      
      if (minPrice) {
        matches = matches && shoe.price >= minPrice;
      }
      
      if (maxPrice) {
        matches = matches && shoe.price <= maxPrice;
      }
      
      if (size) {
        matches = matches && shoe.size.includes(size);
      }
      
      return matches;
    });
  }

  getCategories(): string[] {
    return [...new Set(this.shoes.map(shoe => shoe.category))];
  }

  getSizes(): number[] {
    return [...new Set(this.shoes.flatMap(shoe => shoe.size))].sort((a, b) => a - b);
  }
} 