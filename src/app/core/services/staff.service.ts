
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff, Salary } from '../models/staff.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StaffService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/staff`;

    getStaff(): Observable<Staff[]> {
        return this.http.get<Staff[]>(this.apiUrl);
    }

    addStaff(staff: Staff): Observable<Staff> {
        return this.http.post<Staff>(this.apiUrl, staff);
    }

    updateStaff(id: string, staff: Partial<Staff>): Observable<Staff> {
        return this.http.put<Staff>(`${this.apiUrl}/${id}`, staff);
    }

    deleteStaff(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    markAttendance(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/attendance`, data);
    }

    paySalary(data: any): Observable<Salary> {
        return this.http.post<Salary>(`${this.apiUrl}/salary`, data);
    }
}
