import { Injectable } from '@angular/core';
import { Expense, Person, ExpenseItem } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];
  
  // Make sure people array is consistent and accessible
 private people: Person[] = [
    { id: 1, name: 'Prathamesh', email: 'Prathamesh@example.com' },
    { id: 2, name: 'Sunil', email: 'Sunil@example.com' },
    { id: 3, name: 'Ganesh', email: 'Ganesh@example.com' },
    { id: 4, name: 'Atharva', email: 'Atharva@example.com' }
  ];

  private currentUser: Person = this.people[0];

  constructor() {
    this.loadFromStorage();
    this.initializeSampleData();
  }

  // Add this method to ensure sample data exists
  private initializeSampleData(): void {
    if (this.expenses.length === 0) {
      // Add some sample expenses for demonstration
      const sampleExpense: Omit<Expense, 'id'> = {
        title: 'Team Dinner',
        totalAmount: 120,
        date: new Date(),
        items: [
          {
            id: 1,
            description: 'Pizza',
            amount: 60,
            paidBy: 1, // John Doe
            shares: { 1: 20, 2: 20, 3: 20 } // Equal split
          },
          {
            id: 2,
            description: 'Drinks',
            amount: 60,
            paidBy: 2, // Jane Smith
            shares: { 1: 20, 2: 20, 3: 20 } // Equal split
          }
        ],
        participants: [1, 2, 3], // John, Jane, Bob
        createdBy: 1
      };
      this.addExpense(sampleExpense);
    }
  }

  getPeople(): Person[] {
    return this.people;
  }

  getCurrentUser(): Person {
    return this.currentUser;
  }

  getPersonById(personId: number): Person | undefined {
    return this.people.find(person => person.id === personId);
  }

  getExpenses(): Expense[] {
    return this.expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  addExpense(expense: Omit<Expense, 'id'>): void {
    const newExpense: Expense = {
      ...expense,
      id: Date.now()
    };
    this.expenses.push(newExpense);
    this.saveToStorage();
  }

  private loadFromStorage(): void {
    const saved = localStorage.getItem('splitwise-expenses');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        this.expenses = parsedData.map((exp: any) => ({
          ...exp,
          date: new Date(exp.date),
          // Ensure all person IDs exist in our people array
          items: exp.items.map((item: any) => ({
            ...item,
            // Validate that paidBy exists in people
            paidBy: this.validatePersonId(item.paidBy)
          })),
          participants: exp.participants.map((id: number) => this.validatePersonId(id)),
          createdBy: this.validatePersonId(exp.createdBy)
        }));
      } catch (error) {
        console.error('Error loading expenses from storage:', error);
        this.expenses = [];
      }
    }
  }

  // Helper method to validate person IDs
  private validatePersonId(personId: number): number {
    const validPerson = this.people.find(person => person.id === personId);
    return validPerson ? personId : this.people[0]?.id || 1;
  }

  private saveToStorage(): void {
    localStorage.setItem('splitwise-expenses', JSON.stringify(this.expenses));
  }

  calculateBalances(): { person: Person, balance: number }[] {
    const balances = new Map<number, number>();
    
    // Initialize all balances to 0
    this.people.forEach(person => balances.set(person.id, 0));
    
    // Calculate balances from expenses
    this.expenses.forEach(expense => {
      expense.items.forEach(item => {
        // Add to payer's balance (they paid)
        const currentPayerBalance = balances.get(item.paidBy) || 0;
        balances.set(item.paidBy, currentPayerBalance + item.amount);
        
        // Subtract from each person's share
        Object.entries(item.shares).forEach(([personId, share]) => {
          const pid = Number(personId);
          if (this.getPersonById(pid)) { // Only if person exists
            const currentBalance = balances.get(pid) || 0;
            balances.set(pid, currentBalance - (share as number));
          }
        });
      });
    });
    
    return this.people.map(person => ({
      person,
      balance: balances.get(person.id) || 0
    }));
  }

  getExpenseHistory(): Expense[] {
    return this.getExpenses();
  }
}