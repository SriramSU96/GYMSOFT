import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymKPIs, RetentionRate, PeakHours, TrainerPerformance, AdvancedAnalytics, FinancialReport } from '../models/analytics.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/analytics`; // Updated to /analytics base

    // Dashboard Overview
    getOverview(): Observable<{ success: boolean; data: GymKPIs }> {
        return this.http.get<{ success: boolean; data: GymKPIs }>(`${this.apiUrl}/overview`);
    }

    // Specific Widgets
    getRetention(): Observable<{ success: boolean; data: RetentionRate }> {
        return this.http.get<{ success: boolean; data: RetentionRate }>(`${this.apiUrl}/retention`);
    }

    getPeakHours(): Observable<{ success: boolean; data: PeakHours }> {
        return this.http.get<{ success: boolean; data: PeakHours }>(`${this.apiUrl}/peak-hours`);
    }

    getTrainerPerformance(): Observable<{ success: boolean; data: TrainerPerformance[] }> {
        return this.http.get<{ success: boolean; data: TrainerPerformance[] }>(`${this.apiUrl}/trainer-performance`);
    }

    // Advanced / Detailed Analytics
    getAdvancedAnalytics(period: 'week' | 'month' | 'year' = 'month'): Observable<{ success: boolean; data: AdvancedAnalytics }> {
        const params = new HttpParams().set('period', period);
        return this.http.get<{ success: boolean; data: AdvancedAnalytics }>(`${this.apiUrl}/advanced`, { params });
    }

    // Financial (Mapping to General Finance/Profit-Loss)
    getFinancialReport(month: string, year: number): Observable<{ success: boolean; data: FinancialReport }> {
        const params = new HttpParams()
            .set('month', month)
            .set('year', year.toString());
        return this.http.get<{ success: boolean; data: FinancialReport }>(`${environment.apiUrl}/finance/profit-loss`, { params });
    }

    // New Backend 2.0 Methods
    getPredictions(type: 'churn' | 'attendance' | 'revenue'): Observable<{ success: boolean; data: any }> {
        return this.http.get<{ success: boolean; data: any }>(`${this.apiUrl}/predictions/${type}`);
    }

    getAlerts(): Observable<{ success: boolean; data: any[] }> {
        return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}/alerts`);
    }
}
