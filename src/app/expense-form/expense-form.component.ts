import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { Expense, ExpenseItem, Person } from '../models/expense.model';
import { HighlightDirective } from '../directives/highlight.directive';
import { CurrencySymbolPipe } from '../pipes/currency-symbol.pipe';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective, CurrencySymbolPipe],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent implements OnInit {
  expense = {
    title: '',
    totalAmount: 0,
    participants: [] as number[],
    items: [] as any[]
  };

  newItem = {
    description: '',
    amount: 0,
    paidBy: 0,
    shares: {} as { [key: number]: number }
  };

  people: Person[] = [];
  selectedPeople: { [key: number]: boolean } = {};

  // Make router public so template can access it
  constructor(
    private expenseService: ExpenseService,
    public router: Router  // Changed from private to public
  ) {}

  ngOnInit() {
    this.people = this.expenseService.getPeople();
    this.newItem.paidBy = this.people[0]?.id || 0;
  }

  onPersonSelectionChange(personId: number, event: any) {
    if (event.target.checked) {
      if (!this.expense.participants.includes(personId)) {
        this.expense.participants.push(personId);
      }
    } else {
      this.expense.participants = this.expense.participants.filter(id => id !== personId);
    }
    this.updateShares();
  }

  updateShares() {
    if (this.expense.participants.length === 0) {
      this.newItem.shares = {};
      return;
    }
    
    const sharePerPerson = this.newItem.amount / this.expense.participants.length;
    this.newItem.shares = {};
    
    this.expense.participants.forEach(personId => {
      this.newItem.shares[personId] = sharePerPerson;
    });
  }

  addItem() {
    if (this.newItem.description && this.newItem.amount > 0 && this.expense.participants.length > 0) {
      const item = {
        ...this.newItem,
        id: Date.now()
      };
      
      this.expense.items.push(item);
      this.expense.totalAmount += item.amount;
      
      // Reset new item form
      this.newItem = {
        description: '',
        amount: 0,
        paidBy: this.people[0]?.id || 0,
        shares: {}
      };
      
      this.updateShares();
    }
  }

  removeItem(index: number) {
    const removedItem = this.expense.items[index];
    this.expense.totalAmount -= removedItem.amount;
    this.expense.items.splice(index, 1);
  }

  submitExpense() {
    if (this.expense.title && this.expense.items.length > 0) {
      const newExpense: Omit<Expense, 'id'> = {
        title: this.expense.title,
        totalAmount: this.expense.totalAmount,
        date: new Date(),
        items: this.expense.items,
        participants: this.expense.participants,
        createdBy: this.expenseService.getCurrentUser().id
      };

      this.expenseService.addExpense(newExpense);
      this.router.navigate(['/dashboard']);
    }
  }

  getPersonName(personId: number): string {
  const person = this.expenseService.getPersonById(personId);
  return person ? person.name : `User ${personId}`;
}
  // Helper method to check if person is selected
  isPersonSelected(personId: number): boolean {
    return this.expense.participants.includes(personId);
  }
}