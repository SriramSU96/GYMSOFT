
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CouponState } from './coupon.reducer';

export const selectCouponState = createFeatureSelector<CouponState>('coupons');

export const selectCoupons = createSelector(
    selectCouponState,
    (state) => state.coupons
);

export const selectValidationResult = createSelector(
    selectCouponState,
    (state) => state.validationResult
);

export const selectCouponIsLoading = createSelector(
    selectCouponState,
    (state) => state.isLoading
);

export const selectCouponError = createSelector(
    selectCouponState,
    (state) => state.error
);
