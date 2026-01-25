import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as CouponActions from './coupon.actions';
import { CouponService } from '../../services/coupon.service';
import { ToastService } from '../../services/toast.service';
// Coupon import might not be explicit here if not used primarily, but good to check. 
// Actually, looking at the previous file view, it might not be imported directly if not used in a type context that requires it, 
// but often standard practices import models.

@Injectable()
export class CouponEffects {
    private actions$ = inject(Actions);
    private couponService = inject(CouponService);
    private toast = inject(ToastService);

    loadCoupons$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CouponActions.loadCoupons),
            mergeMap(action =>
                this.couponService.getCoupons(action.activeOnly).pipe(
                    map(response => CouponActions.loadCouponsSuccess({ coupons: response.data })),
                    catchError(error => of(CouponActions.loadCouponsFailure({ error })))
                )
            )
        )
    );

    createCoupon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CouponActions.createCoupon),
            mergeMap(action =>
                this.couponService.createCoupon(action.coupon).pipe(
                    map(response => {
                        this.toast.success('Coupon Created');
                        return CouponActions.createCouponSuccess({ coupon: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Failed to Create Coupon');
                        return of(CouponActions.createCouponFailure({ error }));
                    })
                )
            )
        )
    );

    validateCoupon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CouponActions.validateCoupon),
            mergeMap(action =>
                this.couponService.validateCoupon(action.code, action.amount).pipe(
                    map(response => {
                        if (response.valid) {
                            this.toast.success('Coupon Applied');
                        } else {
                            this.toast.error('Invalid Coupon');
                        }
                        return CouponActions.validateCouponSuccess(response);
                    }),
                    catchError(error => {
                        this.toast.error('Validation Error');
                        return of(CouponActions.validateCouponFailure({ error }));
                    })
                )
            )
        )
    );

    updateCoupon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CouponActions.updateCoupon),
            mergeMap(action =>
                this.couponService.updateCoupon(action.id, action.updates).pipe(
                    map(response => {
                        this.toast.success('Coupon Updated');
                        return CouponActions.updateCouponSuccess({ update: { id: action.id, changes: response.data } });
                    }),
                    catchError(error => {
                        this.toast.error('Update Failed');
                        return of(CouponActions.updateCouponFailure({ error }));
                    })
                )
            )
        )
    );
}
