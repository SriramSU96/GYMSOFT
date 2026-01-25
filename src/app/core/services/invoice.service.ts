import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceResponse, InvoiceFilter } from '../models/payment.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/invoices`;

    createInvoice(invoice: Partial<Invoice>): Observable<{ success: boolean; data: Invoice }> {
        return this.http.post<{ success: boolean; data: Invoice }>(this.apiUrl, invoice);
    }

    getInvoices(filter: InvoiceFilter = {}): Observable<InvoiceResponse> {
        let params = new HttpParams();
        Object.keys(filter).forEach(key => {
            if (filter[key as keyof InvoiceFilter]) {
                params = params.set(key, filter[key as keyof InvoiceFilter] as string);
            }
        });
        return this.http.get<InvoiceResponse>(this.apiUrl, { params });
    }

    getInvoiceById(id: string): Observable<{ success: boolean; data: Invoice }> {
        return this.http.get<{ success: boolean; data: Invoice }>(`${this.apiUrl}/${id}`);
    }

    downloadInvoice(id: string): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/${id}/download`, { responseType: 'blob' });
    }

    markAsResent(id: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/${id}/send`, {});
    }
}
