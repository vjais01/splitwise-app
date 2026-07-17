import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense.service';
import { HighlightDirective } from '../directives/highlight.directive';
import { BalanceColorPipe } from '../pipes/balance-color.pipe';
import { CurrencySymbolPipe } from '../pipes/currency-symbol.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HighlightDirective, BalanceColorPipe, CurrencySymbolPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  balances: { person: any, balance: number }[] = [];
  recentExpenses: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.balances = this.expenseService.calculateBalances();
    this.recentExpenses = this.expenseService.getExpenses().slice(0, 10);
  }

  // FIXED: Use service method for person names
  getPersonName(personId: number): string {
    const person = this.expenseService.getPersonById(personId);
    return person ? person.name : `User ${personId}`;
  }

  onAddExpense() {
    this.router.navigate(['/add-expense']);
  }

  onViewHistory() {
    this.router.navigate(['/history']);
  }

  goToConcepts() {
    this.router.navigate(['/concepts']);
  }
}