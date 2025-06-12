import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(item.shoe.id, item.selectedSize, quantity);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.shoe.id, item.selectedSize);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getDiscountedPrice(item: CartItem): number {
    if (item.shoe.discount) {
      return item.shoe.price * (1 - item.shoe.discount / 100);
    }
    return item.shoe.price;
  }
}
