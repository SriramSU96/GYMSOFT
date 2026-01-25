import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CouponService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/coupons`;

    createCoupon(coupon: Partial<Coupon>): Observable<{ success: boolean; data: Coupon }> {
        return this.http.post<{ success: boolean; data: Coupon }>(this.apiUrl, coupon);
    }

    getCoupons(activeOnly: boolean = false): Observable<{ success: boolean; data: Coupon[] }> {
        return this.http.get<{ success: boolean; data: Coupon[] }>(this.apiUrl, {
            params: { isActive: activeOnly.toString() }
        });
    }

    validateCoupon(code: string, amount: number): Observable<{ success: boolean; valid: boolean; discount: number; coupon: Coupon }> {
        return this.http.post<{ success: boolean; valid: boolean; discount: number; coupon: Coupon }>(
            `${this.apiUrl}/validate`,
            { code, amount }
        );
    }

    updateCoupon(id: string, updates: Partial<Coupon>): Observable<{ success: boolean; data: Coupon }> {
        return this.http.patch<{ success: boolean; data: Coupon }>(`${this.apiUrl}/${id}`, updates);
    }

    deleteCoupon(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
