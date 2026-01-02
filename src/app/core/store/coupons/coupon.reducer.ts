
import { createReducer, on } from '@ngrx/store';
import * as CouponActions from './coupon.actions';
import { Coupon } from '../../models/payment.model';

export interface CouponState {
    coupons: Coupon[];
    validationResult: any | null;
    isLoading: boolean;
    error: any;
}

export const initialState: CouponState = {
    coupons: [],
    validationResult: null,
    isLoading: false,
    error: null
};

export const couponReducer = createReducer(
    initialState,
    on(CouponActions.loadCoupons, CouponActions.createCoupon, CouponActions.validateCoupon, CouponActions.applyCoupon, CouponActions.deleteCoupon, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(CouponActions.loadCouponsSuccess, (state, { coupons }) => ({
        ...state,
        coupons,
        isLoading: false
    })),
    on(CouponActions.createCouponSuccess, (state, { coupon }) => ({
        ...state,
        coupons: [coupon, ...state.coupons],
        isLoading: false
    })),
    on(CouponActions.deleteCouponSuccess, (state, { id }) => ({
        ...state,
        coupons: state.coupons.filter(c => c.id !== id),
        isLoading: false
    })),
    on(CouponActions.validateCouponSuccess, (state, { result }) => ({
        ...state,
        validationResult: result,
        isLoading: false
    })),
    on(CouponActions.applyCouponSuccess, (state) => ({
        ...state,
        isLoading: false
    })),
    on(CouponActions.loadCouponsFailure, CouponActions.createCouponFailure, CouponActions.validateCouponFailure, CouponActions.applyCouponFailure, CouponActions.deleteCouponFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);
