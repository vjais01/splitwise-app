import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { HistoryComponent } from './history/history.component';
import { ConceptsComponent } from './concepts/concepts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-expense', component: ExpenseFormComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'concepts', component: ConceptsComponent },
  { path: '**', redirectTo: '/dashboard' }
];