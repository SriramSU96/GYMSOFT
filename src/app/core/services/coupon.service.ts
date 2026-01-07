
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../models/payment.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CouponService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/coupons`;

    createCoupon(coupon: Coupon): Observable<Coupon> {
        return this.http.post<Coupon>(this.apiUrl, coupon);
    }

    getCoupons(): Observable<Coupon[]> {
        return this.http.get<Coupon[]>(this.apiUrl);
    }

    validateCoupon(code: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/validate`, { code });
    }

    applyCoupon(code: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/apply`, { code });
    }

    deleteCoupon(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
