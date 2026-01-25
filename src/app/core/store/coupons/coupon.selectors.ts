import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CouponState, selectAll } from './coupon.reducer';

export const selectCouponState = createFeatureSelector<CouponState>('coupons');

export const selectAllCoupons = createSelector(
    selectCouponState,
    selectAll
);

export const selectCouponLoading = createSelector(
    selectCouponState,
    (state) => state.loading
);

export const selectCouponError = createSelector(
    selectCouponState,
    (state) => state.error
);

export const selectCouponValidationResult = createSelector(
    selectCouponState,
    (state) => state.validationResult
);
