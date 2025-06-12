import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Shoe } from '../models/shoe.model';
import { ShoeService } from '../services/shoe.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  shoe: Shoe | null = null;
  selectedSize: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private shoeService: ShoeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const shoe = this.shoeService.getShoeById(id);
      if (shoe) {
        this.shoe = shoe;
      }
    }
  }

  addToCart(): void {
    if (this.shoe && this.selectedSize) {
      this.cartService.addToCart(this.shoe, this.selectedSize);
    }
  }
} 