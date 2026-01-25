import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Staff, StaffResponse, StaffListResponse, StaffAttendance, StaffSalaryConfig, StaffSalaryRecord } from '../models/staff.model';

@Injectable({
    providedIn: 'root'
})
export class StaffService {
    private apiUrl = `${environment.apiUrl}/staff`;

    constructor(private http: HttpClient) { }

    // Staff CRUD
    getStaff(params: any = {}): Observable<StaffListResponse> {
        let httpParams = new HttpParams();
        if (params.role) httpParams = httpParams.append('role', params.role);
        if (params.isActive !== undefined) httpParams = httpParams.append('isActive', params.isActive);

        return this.http.get<StaffListResponse>(this.apiUrl, { params: httpParams });
    }

    getStaffById(id: string): Observable<StaffResponse> {
        return this.http.get<StaffResponse>(`${this.apiUrl}/${id}`);
    }

    createStaff(staff: Partial<Staff>): Observable<StaffResponse> {
        return this.http.post<StaffResponse>(this.apiUrl, staff);
    }

    updateStaff(id: string, staff: Partial<Staff>): Observable<StaffResponse> {
        return this.http.put<StaffResponse>(`${this.apiUrl}/${id}`, staff);
    }

    deleteStaff(id: string): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
    }

    // Attendance
    markAttendance(attendance: Partial<StaffAttendance>): Observable<{ success: boolean; attendance: StaffAttendance }> {
        return this.http.post<{ success: boolean; attendance: StaffAttendance }>(`${this.apiUrl}/attendance`, attendance);
    }

    getAttendance(date: string): Observable<{ success: boolean; attendance: StaffAttendance[] }> {
        return this.http.get<{ success: boolean; attendance: StaffAttendance[] }>(`${this.apiUrl}/attendance`, {
            params: new HttpParams().set('date', date)
        });
    }

    getStaffAttendanceHistory(staffId: string, startDate?: string, endDate?: string): Observable<any> {
        let params = new HttpParams();
        if (startDate) params = params.append('startDate', startDate);
        if (endDate) params = params.append('endDate', endDate);
        return this.http.get<any>(`${this.apiUrl}/${staffId}/attendance`, { params });
    }

    // Salary
    saveSalaryConfig(config: Partial<StaffSalaryConfig>): Observable<{ success: boolean; config: StaffSalaryConfig }> {
        return this.http.post<{ success: boolean; config: StaffSalaryConfig }>(`${this.apiUrl}/salary/config`, config);
    }

    generateSalary(month: number, year: number, staffIds?: string[]): Observable<{ success: boolean; records: StaffSalaryRecord[] }> {
        return this.http.post<{ success: boolean; records: StaffSalaryRecord[] }>(`${this.apiUrl}/salary/generate`, { month, year, staffIds });
    }

    getSalaryRecords(params: { month?: number; year?: number; status?: string }): Observable<{ success: boolean; records: StaffSalaryRecord[] }> {
        let httpParams = new HttpParams();
        if (params.month) httpParams = httpParams.append('month', params.month.toString());
        if (params.year) httpParams = httpParams.append('year', params.year.toString());
        if (params.status) httpParams = httpParams.append('status', params.status);

        return this.http.get<{ success: boolean; records: StaffSalaryRecord[] }>(`${this.apiUrl}/salary`, { params: httpParams });
    }

    paySalary(recordId: string): Observable<{ success: boolean; record: StaffSalaryRecord }> {
        return this.http.patch<{ success: boolean; record: StaffSalaryRecord }>(`${this.apiUrl}/salary/${recordId}/pay`, {});
    }
}
