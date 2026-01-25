import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Coupon } from '../../../core/models/coupon.model';
import { loadCoupons, createCoupon, deleteCoupon } from '../../../core/store/coupons/coupon.actions';
import { selectAllCoupons, selectCouponLoading, selectCouponError } from '../../../core/store/coupons/coupon.selectors';

@Component({
    selector: 'app-coupon',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './coupon.component.html'
})
export class CouponComponent implements OnInit {
    private store = inject(Store);

    coupons$: Observable<Coupon[]> = this.store.select(selectAllCoupons);
    isLoading$: Observable<boolean> = this.store.select(selectCouponLoading);
    error$: Observable<any> = this.store.select(selectCouponError);

    newCoupon: Partial<Coupon> = {
        code: '',
        discountValue: 0,
        discountType: 'percentage',
        expiryDate: new Date('2026-12-31')
    };

    ngOnInit() {
        this.store.dispatch(loadCoupons({}));
    }

    createCoupon() {
        if (this.newCoupon.code && (this.newCoupon.discountValue ?? 0) > 0) {
            this.store.dispatch(createCoupon({
                coupon: {
                    ...this.newCoupon,
                    code: this.newCoupon.code.toUpperCase()
                }
            }));
            this.newCoupon = {
                code: '',
                discountValue: 0,
                discountType: 'percentage',
                expiryDate: new Date('2026-12-31')
            };
        }
    }

    deleteCoupon(id: string) {
        if (confirm('Are you sure you want to delete this coupon?')) {
            this.store.dispatch(deleteCoupon({ id }));
        }
    }
}
