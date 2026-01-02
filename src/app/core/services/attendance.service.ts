
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance.model';
import { environment } from '../../../environments/environment';

export interface CheckInPayload {
    memberId: string;
    checkInTime?: string; // Optional, backend handles time if missing usually, but we send it
}

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/attendance`;

    qrCheckIn(data: CheckInPayload): Observable<Attendance> {
        return this.http.post<Attendance>(`${this.apiUrl}/qr`, data);
    }

    syncAttendance(records: Attendance[]): Observable<any> {
        return this.http.post(`${this.apiUrl}/sync`, { records });
    }

    getMemberAttendance(memberId: string): Observable<Attendance[]> {
        return this.http.get<Attendance[]>(`${this.apiUrl}/member/${memberId}`);
    }
}
