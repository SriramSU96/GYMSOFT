
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CouponService } from '../../services/coupon.service';
import * as CouponActions from './coupon.actions';

@Injectable()
export class CouponEffects {
    private actions$ = inject(Actions);
    private couponService = inject(CouponService);

    loadCoupons$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CouponActions.loadCoupons),
            mergeMap(() =>
                this.couponService.getCoupons().pipe(
                    map((coupons) => CouponActions.loadCouponsSuccess({ coupons })),
                    catchError((error) => of(CouponActions.loadCouponsFailure({ error })))
                )
            )
        )
    );

    createCoupon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CouponActions.createCoupon),
            mergeMap(({ coupon }) =>
                this.couponService.createCoupon(coupon).pipe(
                    map((newCoupon) => CouponActions.createCouponSuccess({ coupon: newCoupon })),
                    catchError((error) => of(CouponActions.createCouponFailure({ error })))
                )
            )
        )
    );

    validateCoupon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CouponActions.validateCoupon),
            mergeMap(({ code }) =>
                this.couponService.validateCoupon(code).pipe(
                    map((result) => CouponActions.validateCouponSuccess({ result })),
                    catchError((error) => of(CouponActions.validateCouponFailure({ error })))
                )
            )
        )
    );

    applyCoupon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CouponActions.applyCoupon),
            mergeMap(({ code }) =>
                this.couponService.applyCoupon(code).pipe(
                    map((result) => CouponActions.applyCouponSuccess({ result })),
                    catchError((error) => of(CouponActions.applyCouponFailure({ error })))
                )
            )
        )
    );

    deleteCoupon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CouponActions.deleteCoupon),
            mergeMap(({ id }) =>
                this.couponService.deleteCoupon(id).pipe(
                    map(() => CouponActions.deleteCouponSuccess({ id })),
                    catchError((error) => of(CouponActions.deleteCouponFailure({ error })))
                )
            )
        )
    );
}
