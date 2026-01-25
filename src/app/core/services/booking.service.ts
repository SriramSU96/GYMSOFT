import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymClass, Booking, ClassFilter, BookingFilter, ClassResponse, BookingResponse } from '../models/class.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookingService { // Kept name as BookingService to match file, but logic is ClassService
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/classes`;
    private membersUrl = `${environment.apiUrl}/members`;

    // Class Management
    getClasses(filter: ClassFilter = {}): Observable<ClassResponse> {
        let params = new HttpParams();
        Object.keys(filter).forEach(key => {
            if (filter[key as keyof ClassFilter]) {
                params = params.set(key, filter[key as keyof ClassFilter] as string);
            }
        });
        return this.http.get<ClassResponse>(this.apiUrl, { params });
    }

    getClass(id: string): Observable<{ success: boolean; data: GymClass }> {
        return this.http.get<{ success: boolean; data: GymClass }>(`${this.apiUrl}/${id}`);
    }

    createClass(classData: Partial<GymClass>): Observable<{ success: boolean; data: GymClass }> {
        return this.http.post<{ success: boolean; data: GymClass }>(this.apiUrl, classData);
    }

    updateClass(id: string, classData: Partial<GymClass>): Observable<{ success: boolean; data: GymClass }> {
        return this.http.patch<{ success: boolean; data: GymClass }>(`${this.apiUrl}/${id}`, classData);
    }

    deleteClass(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    // Booking Management
    bookClass(classId: string, memberId: string): Observable<{ success: boolean; data: Booking }> {
        return this.http.post<{ success: boolean; data: Booking }>(`${this.apiUrl}/${classId}/book`, { memberId });
    }

    cancelBooking(bookingId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/bookings/${bookingId}/cancel`, {});
    }

    // Member Bookings
    getMemberBookings(memberId: string): Observable<BookingResponse> {
        return this.http.get<BookingResponse>(`${this.membersUrl}/${memberId}/bookings`);
    }

    // Class Bookings (Trainer/Admin view)
    getClassBookings(classId: string): Observable<BookingResponse> {
        return this.http.get<BookingResponse>(`${this.apiUrl}/${classId}/bookings`);
    }
}
