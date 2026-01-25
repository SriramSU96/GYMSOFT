import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfitLoss, YearlySummary, ReportFilter, MemberReport, AttendanceReport } from '../models/report.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/reports`;

    // Financial Summaries
    getProfitLoss(): Observable<{ success: boolean; data: ProfitLoss }> {
        return this.http.get<{ success: boolean; data: ProfitLoss }>(`${this.apiUrl}/finance/profit-loss`);
    }

    getYearlySummary(year?: number): Observable<{ success: boolean; data: YearlySummary }> {
        let params = new HttpParams();
        if (year) params = params.set('year', year.toString());
        return this.http.get<{ success: boolean; data: YearlySummary }>(`${this.apiUrl}/finance/yearly`, { params });
    }

    // Domain Specific Reports
    getMemberReport(filter: ReportFilter): Observable<{ success: boolean; data: MemberReport }> {
        let params = this.buildParams(filter);
        return this.http.get<{ success: boolean; data: MemberReport }>(`${this.apiUrl}/members/summary`, { params });
    }

    getAttendanceReport(filter: ReportFilter): Observable<{ success: boolean; data: AttendanceReport }> {
        let params = this.buildParams(filter);
        return this.http.get<{ success: boolean; data: AttendanceReport }>(`${this.apiUrl}/attendance/summary`, { params });
    }

    // Download
    downloadReport(type: 'Financial' | 'Attendance' | 'Member' | 'Inventory', filter: ReportFilter, format: 'PDF' | 'CSV' | 'Excel'): Observable<Blob> {
        let params = this.buildParams(filter).set('format', format);
        return this.http.get(`${this.apiUrl}/download/${type.toLowerCase()}`, {
            params,
            responseType: 'blob'
        });
    }

    private buildParams(filter: ReportFilter): HttpParams {
        let params = new HttpParams();
        Object.keys(filter).forEach(key => {
            if (filter[key as keyof ReportFilter]) {
                params = params.set(key, filter[key as keyof ReportFilter] as string);
            }
        });
        return params;
    }
}
