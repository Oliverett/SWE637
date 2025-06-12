import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shoe } from '../models/shoe.model';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  shoe: Shoe;
  quantity: number;
  selectedSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next(this.cartItems);
      }
    }
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(shoe: Shoe, size: number = shoe.size[0]): void {
    const existingItem = this.cartItems.find(
      item => item.shoe.id === shoe.id && item.selectedSize === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        shoe,
        quantity: 1,
        selectedSize: size
      });
    }

    this.updateCart();
  }

  removeFromCart(shoeId: string, size: number): void {
    this.cartItems = this.cartItems.filter(
      item => !(item.shoe.id === shoeId && item.selectedSize === size)
    );
    this.updateCart();
  }

  updateQuantity(shoeId: string, size: number, quantity: number): void {
    const item = this.cartItems.find(
      item => item.shoe.id === shoeId && item.selectedSize === size
    );
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.shoe.price * item.quantity),
      0
    );
  }

  private updateCart(): void {
    this.cartSubject.next(this.cartItems);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }
} 