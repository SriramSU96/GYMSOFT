
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

    // Get all classes
    getClasses(): Observable<GymClass[]> {
        return this.http.get<GymClass[]>(this.apiUrl);
    }

    // Get single class details
    getClass(id: string): Observable<GymClass> {
        return this.http.get<GymClass>(`${this.apiUrl}/${id}`);
    }

    // Create a new class (Trainer/Admin)
    createClass(classData: GymClass): Observable<GymClass> {
        return this.http.post<GymClass>(this.apiUrl, classData);
    }

    // Update class
    updateClass(id: string, classData: Partial<GymClass>): Observable<GymClass> {
        return this.http.put<GymClass>(`${this.apiUrl}/${id}`, classData);
    }

    // Delete class
    deleteClass(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    // Book a class
    bookClass(classId: string, memberId: string, gymId: string): Observable<Booking> {
        return this.http.post<Booking>(`${this.apiUrl}/${classId}/book`, { memberId, gymId });
    }

    // Cancel booking
    cancelBooking(classId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${classId}/cancel`);
    }

    // Get bookings for a member
    getMemberBookings(memberId: string): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.membersUrl}/${memberId}/bookings`);
    }
}
