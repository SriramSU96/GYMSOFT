
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

    // Get all products
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/products`);
    }

    // Get a single product by ID
    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
    }

    // Create a new product
    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.apiUrl}/products`, product);
    }

    // Update an existing product
    updateProduct(id: string, product: Partial<Product>): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
    }

    // Process a sale
    createSale(saleData: Sale): Observable<Sale> {
        return this.http.post<Sale>(`${this.apiUrl}/sale`, saleData);
    }

    // Get sales report (Daily Agg)
    getSales(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/sales`);
    }

    // Get low stock alerts
    getLowStock(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/low-stock`);
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/products/${id}`);
    }
}
