
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Sale } from '../models/gym-extensions.model'; // Adjust path if needed
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PosService {
    private apiUrl = `${environment.apiUrl}/pos`;

    constructor(private http: HttpClient) { }

    // Get all products (optionally filter by gymId and stock)
    getProducts(gymId: string, lowStock?: boolean): Observable<Product[]> {
        let params = new HttpParams().set('gymId', gymId);
        if (lowStock) {
            params = params.set('lowStock', 'true');
        }
        return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
    }

    // Get a single product by ID
    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
    }

    // Create a new product
    createProduct(product: Partial<Product>): Observable<Product> {
        return this.http.post<Product>(`${this.apiUrl}/products`, product);
    }

    // Update an existing product
    updateProduct(id: string, product: Partial<Product>): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
    }

    // Process a sale
    processSale(saleData: any): Observable<Sale> {
        return this.http.post<Sale>(`${this.apiUrl}/sale`, saleData);
    }

    // Get daily sales report
    getSalesReport(gymId: string, date?: string): Observable<any> {
        let params = new HttpParams().set('gymId', gymId);
        if (date) {
            params = params.set('date', date);
        }
        return this.http.get<any>(`${this.apiUrl}/sales`, { params });
    }

    // Get low stock alerts
    getLowStockProducts(gymId: string): Observable<Product[]> {
        const params = new HttpParams().set('gymId', gymId);
        return this.http.get<Product[]>(`${this.apiUrl}/low-stock`, { params });
    }
}
