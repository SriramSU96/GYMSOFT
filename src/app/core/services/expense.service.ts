import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, ExpenseCategory, ExpenseResponse, ExpenseStats, ExpenseFilter } from '../models/expense.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/expenses`;

    // Expense Operations
    addExpense(expense: Partial<Expense>): Observable<{ success: boolean; data: Expense }> {
        return this.http.post<{ success: boolean; data: Expense }>(this.apiUrl, expense);
    }

    getExpenses(filter: ExpenseFilter = {}): Observable<ExpenseResponse> {
        let params = new HttpParams();
        Object.keys(filter).forEach(key => {
            if (filter[key as keyof ExpenseFilter]) {
                params = params.set(key, filter[key as keyof ExpenseFilter] as string);
            }
        });
        return this.http.get<ExpenseResponse>(this.apiUrl, { params });
    }

    updateExpense(id: string, updates: Partial<Expense>): Observable<{ success: boolean; data: Expense }> {
        return this.http.patch<{ success: boolean; data: Expense }>(`${this.apiUrl}/${id}`, updates);
    }

    deleteExpense(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    getExpenseSummary(range: 'month' | 'year' = 'month'): Observable<{ success: boolean; data: ExpenseStats }> {
        return this.http.get<{ success: boolean; data: ExpenseStats }>(`${this.apiUrl}/summary`, {
            params: { range }
        });
    }

    // Category Operations
    getCategories(): Observable<{ success: boolean; data: ExpenseCategory[] }> {
        return this.http.get<{ success: boolean; data: ExpenseCategory[] }>(`${this.apiUrl}/categories`);
    }

    addCategory(category: Partial<ExpenseCategory>): Observable<{ success: boolean; data: ExpenseCategory }> {
        return this.http.post<{ success: boolean; data: ExpenseCategory }>(`${this.apiUrl}/categories`, category);
    }
}
