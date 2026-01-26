import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductResponse, Sale, SaleResponse, StockAdjustment } from '../models/pos.model';
import { environment } from '../../../environments/environment';

export interface ProductFilter {
    category?: string;
    lowStock?: boolean;
    search?: string;
}

export interface SaleFilter {
    startDate?: string;
    endDate?: string;
    memberId?: string;
    staffId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PosService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/pos`;

    // Product Management
    getProducts(filter: ProductFilter = {}): Observable<ProductResponse> {
        let params = new HttpParams();
        if (filter.category) params = params.set('category', filter.category);
        if (filter.lowStock) params = params.set('lowStock', 'true');
        if (filter.search) params = params.set('search', filter.search);

        return this.http.get<ProductResponse>(`${this.apiUrl}/products`, { params });
    }

    getProduct(id: string): Observable<{ success: boolean; data: Product }> {
        return this.http.get<{ success: boolean; data: Product }>(`${this.apiUrl}/products/${id}`);
    }

    createProduct(product: Partial<Product>): Observable<{ success: boolean; data: Product }> {
        return this.http.post<{ success: boolean; data: Product }>(`${this.apiUrl}/products`, product);
    }

    updateProduct(id: string, updates: Partial<Product>): Observable<{ success: boolean; data: Product }> {
        return this.http.put<{ success: boolean; data: Product }>(`${this.apiUrl}/products/${id}`, updates);
    }

    deactivateProduct(id: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/products/${id}/deactivate`, {});
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/products/${id}`);
    }

    // Stock
    adjustStock(id: string, adjustment: Partial<StockAdjustment>): Observable<{ success: boolean; data: Product }> {
        return this.http.patch<{ success: boolean; data: Product }>(`${this.apiUrl}/products/${id}/stock`, adjustment);
    }

    getLowStockAlerts(): Observable<{ success: boolean; data: Product[] }> {
        return this.http.get<{ success: boolean; data: Product[] }>(`${this.apiUrl}/reports/low-stock`);
    }

    // Sales
    processSale(sale: Partial<Sale>): Observable<{ success: boolean; data: Sale }> {
        return this.http.post<{ success: boolean; data: Sale }>(`${this.apiUrl}/sales`, sale);
    }
    createSale(sale: Partial<Sale>) { return this.processSale(sale); }

    getSalesHistory(filter: SaleFilter = {}): Observable<SaleResponse> {
        let params = new HttpParams();
        Object.keys(filter).forEach(key => {
            if (filter[key as keyof SaleFilter]) {
                params = params.set(key, filter[key as keyof SaleFilter] as string);
            }
        });
        return this.http.get<SaleResponse>(`${this.apiUrl}/sales`, { params });
    }
    getSales(filter: SaleFilter = {}) { return this.getSalesHistory(filter); }

    refundSale(id: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/sales/${id}/refund`, {});
    }

    // Reports
    getDailyReport(): Observable<any> {
        return this.http.get(`${this.apiUrl}/reports/daily`);
    }

    getMonthlyReport(): Observable<any> {
        return this.http.get(`${this.apiUrl}/reports/monthly`);
    }

    getProductReport(): Observable<any> {
        return this.http.get(`${this.apiUrl}/reports/products`);
    }

    getStaffReport(): Observable<any> {
        return this.http.get(`${this.apiUrl}/reports/staff`);
    }
}
