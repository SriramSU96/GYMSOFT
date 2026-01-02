
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymClass, Booking } from '../models/gym-extensions.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private apiUrl = `${environment.apiUrl}/classes`;
    private membersUrl = `${environment.apiUrl}/members`;

    constructor(private http: HttpClient) { }

    // Get all classes (can filter by date, gymId)
    getClasses(gymId: string, date?: string): Observable<GymClass[]> {
        let params = new HttpParams().set('gymId', gymId);
        if (date) {
            params = params.set('date', date);
        }
        return this.http.get<GymClass[]>(this.apiUrl, { params });
    }

    // Get single class details
    getClassById(id: string): Observable<GymClass> {
        return this.http.get<GymClass>(`${this.apiUrl}/${id}`);
    }

    // Create a new class (Trainer/Admin)
    createClass(classData: Partial<GymClass>): Observable<GymClass> {
        return this.http.post<GymClass>(this.apiUrl, classData);
    }

    // Book a class
    bookClass(bookingData: { classId: string, memberId: string, gymId: string }): Observable<Booking> {
        return this.http.post<Booking>(`${this.apiUrl}/${bookingData.classId}/book`, {
            memberId: bookingData.memberId,
            gymId: bookingData.gymId
        });
    }

    // Get bookings for a member
    getMemberBookings(memberId: string): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.membersUrl}/${memberId}/bookings`);
    }

    // Cancel booking
    cancelBooking(classId: string, memberId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${classId}/cancel`, {
            body: { memberId }
        });
    }
}
