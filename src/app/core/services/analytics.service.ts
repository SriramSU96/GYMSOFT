
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
    private apiUrl = `${environment.apiUrl}/dashboard/analytics`;

    getOverview(): Observable<GymKPIs> {
        return this.http.get<GymKPIs>(`${this.apiUrl}/overview`);
    }

    getRetention(): Observable<RetentionRate> {
        return this.http.get<RetentionRate>(`${this.apiUrl}/retention`);
    }

    getPeakHours(): Observable<PeakHours> {
        return this.http.get<PeakHours>(`${this.apiUrl}/peak-hours`);
    }

    getTrainerPerformance(): Observable<TrainerPerformance[]> {
        return this.http.get<TrainerPerformance[]>(`${this.apiUrl}/trainer-performance`);
    }

    getAdvancedAnalytics(filter?: string): Observable<AdvancedAnalytics> {
        let params = new HttpParams();
        if (filter) {
            params = params.set('period', filter);
        }
        return this.http.get<AdvancedAnalytics>(`${this.apiUrl}/advanced`, { params });
    }

    getFinancialReport(month: string): Observable<FinancialReport> {
        return this.http.get<FinancialReport>(`${this.apiUrl}/financial-report`, {
            params: new HttpParams().set('month', month)
        });
    }
}
