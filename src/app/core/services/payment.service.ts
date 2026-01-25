import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, PaymentResponse, PaymentFilter } from '../models/payment.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/payments`;

    // Process a new payment
    processPayment(payment: Partial<Payment>): Observable<{ success: boolean; data: Payment }> {
        return this.http.post<{ success: boolean; data: Payment }>(this.apiUrl, payment);
    }

    // Get Payment History with Filters
    getPayments(filter: PaymentFilter = {}): Observable<PaymentResponse> {
        let params = new HttpParams();
        Object.keys(filter).forEach(key => {
            if (filter[key as keyof PaymentFilter]) {
                params = params.set(key, filter[key as keyof PaymentFilter] as string);
            }
        });
        return this.http.get<PaymentResponse>(this.apiUrl, { params });
    }

    getPaymentById(id: string): Observable<{ success: boolean; data: Payment }> {
        return this.http.get<{ success: boolean; data: Payment }>(`${this.apiUrl}/${id}`);
    }

    refundPayment(id: string, reason: string): Observable<{ success: boolean; data: Payment }> {
        return this.http.post<{ success: boolean; data: Payment }>(`${this.apiUrl}/${id}/refund`, { reason });
    }

    // Get Pending Payments (Legacy wrapper or specific endpoint)
    getPendingPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(`${this.apiUrl}/pending`);
    }
}
