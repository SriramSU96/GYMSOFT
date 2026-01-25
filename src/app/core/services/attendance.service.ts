import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance, AttendanceStats, AttendanceResponse, CheckInPayload, AttendanceFilter } from '../models/attendance.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/attendance/members`;

    // Manual Add (Backdated or Admin override)
    markAttendance(data: Partial<Attendance>): Observable<{ success: boolean; data: Attendance }> {
        return this.http.post<{ success: boolean; data: Attendance }>(this.apiUrl, data);
    }

    // List Attendance with Filters
    getAttendance(filter: AttendanceFilter = {}): Observable<AttendanceResponse> {
        let params = new HttpParams();
        Object.keys(filter).forEach(key => {
            if (filter[key as keyof AttendanceFilter]) {
                params = params.set(key, filter[key as keyof AttendanceFilter] as string);
            }
        });
        return this.http.get<AttendanceResponse>(this.apiUrl, { params });
    }

    // Manual Check-In (Real-time)
    checkIn(data: CheckInPayload): Observable<{ success: boolean; data: Attendance }> {
        return this.http.post<{ success: boolean; data: Attendance }>(`${this.apiUrl}/check-in`, data);
    }

    // QR Check-In
    qrCheckIn(token: string): Observable<{ success: boolean; data: Attendance }> {
        return this.http.post<{ success: boolean; data: Attendance }>(`${this.apiUrl}/qr-checkin`, { token });
    }

    // Check-Out
    checkOut(id: string, checkOutTime: Date = new Date()): Observable<{ success: boolean; data: Attendance }> {
        return this.http.patch<{ success: boolean; data: Attendance }>(`${this.apiUrl}/${id}/check-out`, { checkOutTime });
    }

    // Get Summary/Stats
    getAttendanceSummary(date: string): Observable<{ success: boolean; data: AttendanceStats }> {
        const params = new HttpParams().set('date', date);
        return this.http.get<{ success: boolean; data: AttendanceStats }>(`${this.apiUrl}/summary`, { params });
    }

    // Legacy sync method if still needed, or remove if deprecated by new API
    syncAttendance(records: Attendance[]): Observable<any> {
        return this.http.post(`${environment.apiUrl}/attendance/sync`, { records });
    }
}
