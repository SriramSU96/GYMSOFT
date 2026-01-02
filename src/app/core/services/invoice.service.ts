
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/payment.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/invoices`;

    createInvoice(invoice: Partial<Invoice>): Observable<Invoice> {
        return this.http.post<Invoice>(`${this.apiUrl}/`, invoice);
    }

    downloadInvoice(id: string): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/${id}/download`, { responseType: 'blob' });
    }
}
