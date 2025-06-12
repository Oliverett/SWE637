import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Shoe } from '../models/shoe.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class FilterPanelComponent implements OnInit, OnDestroy {
  @Input() items: Shoe[] = [];
  @Output() filterChange = new EventEmitter<Shoe[]>();

  form: FormGroup;

  categories: string[] = [];
  sizes: number[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      category: [''],
      size: ['']
    });
  }

  ngOnInit() {
    this.categories = Array.from(new Set(this.items.map(i => i.category)));
    this.sizes = Array.from(new Set(this.items.flatMap(i => i.size))).sort();
    this.subscription = this.form.valueChanges.subscribe(() => this.applyFilter());
  }

  applyFilter() {
    let filtered = this.items;
    const { category, size } = this.form.value;
    
    if (category) {
      filtered = filtered.filter(i => i.category === category);
    }
    if (size) {
      filtered = filtered.filter(i => i.size.includes(+size));
    }
    this.filterChange.emit(filtered);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}