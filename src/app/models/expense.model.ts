export interface Person {
  id: number;
  name: string;
  email: string;
}

export interface ExpenseItem {
  id: number;
  description: string;
  amount: number;
  paidBy: number; // person id
  shares: { [personId: number]: number }; // person id -> share amount
}

export interface Expense {
  id: number;
  title: string;
  totalAmount: number;
  date: Date;
  items: ExpenseItem[];
  participants: number[]; // person ids
  createdBy: number;
}