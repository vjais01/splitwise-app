import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../directives/highlight.directive';
import { CurrencySymbolPipe } from '../pipes/currency-symbol.pipe';
import { BalanceColorPipe } from '../pipes/balance-color.pipe';

// HOOKS EXAMPLE: Multiple lifecycle hooks
@Component({
  selector: 'app-concepts',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective, CurrencySymbolPipe, BalanceColorPipe],
  templateUrl: './concepts.component.html',
  styleUrl: './concepts.component.scss'
})
export class ConceptsComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() demoData: string = '';
  @ViewChild('demoElement') demoElement!: ElementRef;

  // BINDINGS EXAMPLE: Different types of properties
  title = 'Angular Concepts Demo';
  currentTime = new Date();
  inputText = 'Two-way binding demo';
  isVisible = true;
  items = ['Item 1', 'Item 2', 'Item 3'];
  selectedItem = '';
  price = 49.99;
  balance = -25.5;

  // HOOKS EXAMPLE: ngOnInit
  ngOnInit() {
    console.log('Component initialized');
    this.updateTime();
  }

  // HOOKS EXAMPLE: ngAfterViewInit
  ngAfterViewInit() {
    console.log('View initialized', this.demoElement);
  }

  // HOOKS EXAMPLE: ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    console.log('Input changes', changes);
  }

  // HOOKS EXAMPLE: ngOnDestroy
  ngOnDestroy() {
    console.log('Component destroyed');
  }

  updateTime() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  // BINDINGS EXAMPLE: Event binding methods
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  addItem() {
    this.items.push(`Item ${this.items.length + 1}`);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  // PIPES EXAMPLE: Method showing what pipes do
  getFormattedPrice(): string {
    return new CurrencySymbolPipe().transform(this.price, 'USD');
  }
}