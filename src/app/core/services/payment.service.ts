
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, Invoice } from '../models/payment.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/payments`;

    getPendingPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(`${this.apiUrl}/pending`);
    }

    sendReminder(memberId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/reminder`, { memberId });
    }

    recordPartialPayment(payment: Payment): Observable<Payment> {
        return this.http.post<Payment>(`${this.apiUrl}/partial`, payment);
    }

    getInvoiceDownload(id: string): Observable<Blob> {
        return this.http.get(`${environment.apiUrl}/invoices/${id}/download`, { responseType: 'blob' });
    }

    createInvoice(planId: string): Observable<Invoice> {
        return this.http.post<Invoice>(`${environment.apiUrl}/invoices`, { planId });
    }
}
