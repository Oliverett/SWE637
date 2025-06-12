import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shoe } from '../models/shoe.model';
import { NotificationService } from '../services/notification.service';

export interface CartItem extends Shoe {
  selectedSize: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private items$ = new BehaviorSubject<CartItem[]>([]);

  constructor(private notificationService: NotificationService) {
    console.log('CartService initialized');
  }

  get cartItems(): Observable<CartItem[]> {
    return this.items$.asObservable();
  }

  addItem(item: CartItem): void {
    console.log('Adding item to cart:', item);
    try {
      if (!item || !item.selectedSize) {
        throw new Error('Invalid item or size');
      }
      this.items = [...this.items, item];
      this.items$.next(this.items);
      console.log('Current cart items:', this.items);
      this.notificationService.show(`${item.name} (Size ${item.selectedSize}) added to cart`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      this.notificationService.show('Failed to add item to cart', 'error');
    }
  }

  removeItem(index: number): void {
    console.log('Removing item at index:', index);
    try {
      if (index < 0 || index >= this.items.length) {
        throw new Error('Invalid index');
      }
      const removedItem = this.items[index];
      this.items = this.items.filter((_, i) => i !== index);
      this.items$.next(this.items);
      console.log('Current cart items after removal:', this.items);
      this.notificationService.show(`${removedItem.name} removed from cart`);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      this.notificationService.show('Failed to remove item from cart', 'error');
    }
  }

  clearCart(): void {
    this.items = [];
    this.items$.next([]);
    this.notificationService.show('Cart cleared');
  }
}