import { createAction, props } from '@ngrx/store';
import { Coupon } from '../../models/coupon.model';
import { Update } from '@ngrx/entity';

// Load
export const loadCoupons = createAction(
    '[Coupons] Load Coupons',
    props<{ activeOnly?: boolean }>()
);

export const loadCouponsSuccess = createAction(
    '[Coupons] Load Coupons Success',
    props<{ coupons: Coupon[] }>()
);

export const loadCouponsFailure = createAction(
    '[Coupons] Load Coupons Failure',
    props<{ error: any }>()
);

// Create
export const createCoupon = createAction(
    '[Coupons] Create Coupon',
    props<{ coupon: Partial<Coupon> }>()
);

export const createCouponSuccess = createAction(
    '[Coupons] Create Coupon Success',
    props<{ coupon: Coupon }>()
);

export const createCouponFailure = createAction(
    '[Coupons] Create Coupon Failure',
    props<{ error: any }>()
);

// Validate
export const validateCoupon = createAction(
    '[Coupons] Validate Coupon',
    props<{ code: string; amount: number }>()
);

export const validateCouponSuccess = createAction(
    '[Coupons] Validate Coupon Success',
    props<{ valid: boolean; discount: number; coupon: Coupon }>()
);

export const validateCouponFailure = createAction(
    '[Coupons] Validate Coupon Failure',
    props<{ error: any }>()
);

// Update
export const updateCoupon = createAction(
    '[Coupons] Update Coupon',
    props<{ id: string; updates: Partial<Coupon> }>()
);

export const updateCouponSuccess = createAction(
    '[Coupons] Update Coupon Success',
    props<{ update: Update<Coupon> }>()
);

export const updateCouponFailure = createAction(
    '[Coupons] Update Coupon Failure',
    props<{ error: any }>()
);

// Delete
export const deleteCoupon = createAction(
    '[Coupons] Delete Coupon',
    props<{ id: string }>()
);

export const deleteCouponSuccess = createAction(
    '[Coupons] Delete Coupon Success',
    props<{ id: string }>()
);

export const deleteCouponFailure = createAction(
    '[Coupons] Delete Coupon Failure',
    props<{ error: any }>()
);
