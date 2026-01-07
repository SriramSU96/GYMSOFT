
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfitLoss, YearlySummary, Expense } from '../models/report.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/reports`;

    getProfitLoss(): Observable<ProfitLoss> {
        return this.http.get<ProfitLoss>(`${this.apiUrl}/profit-loss`);
    }

    getYearlySummary(): Observable<YearlySummary> {
        return this.http.get<YearlySummary>(`${this.apiUrl}/yearly`);
    }

    addExpense(expense: Expense): Observable<Expense> {
        return this.http.post<Expense>(`${this.apiUrl}/expenses`, expense);
    }
}
