import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { HighlightDirective } from '../directives/highlight.directive';
import { CurrencySymbolPipe } from '../pipes/currency-symbol.pipe';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HighlightDirective, CurrencySymbolPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(
    private expenseService: ExpenseService,
    public router: Router
  ) {}

  ngOnInit() {
    this.expenses = this.expenseService.getExpenseHistory();
  }

  // FIXED: Use service method to ensure person exists
  getPersonName(personId: number): string {
    const person = this.expenseService.getPersonById(personId);
    return person ? person.name : `User ${personId}`;
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}