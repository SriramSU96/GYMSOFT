
import { createAction, props } from '@ngrx/store';
import { Coupon } from '../../models/payment.model';

export const loadCoupons = createAction('[Coupon] Load Coupons');
export const loadCouponsSuccess = createAction('[Coupon] Load Coupons Success', props<{ coupons: Coupon[] }>());
export const loadCouponsFailure = createAction('[Coupon] Load Coupons Failure', props<{ error: any }>());

export const createCoupon = createAction('[Coupon] Create Coupon', props<{ coupon: Partial<Coupon> }>());
export const createCouponSuccess = createAction('[Coupon] Create Coupon Success', props<{ coupon: Coupon }>());
export const createCouponFailure = createAction('[Coupon] Create Coupon Failure', props<{ error: any }>());

export const validateCoupon = createAction('[Coupon] Validate Coupon', props<{ code: string }>());
export const validateCouponSuccess = createAction('[Coupon] Validate Coupon Success', props<{ result: any }>());
export const validateCouponFailure = createAction('[Coupon] Validate Coupon Failure', props<{ error: any }>());

export const applyCoupon = createAction('[Coupon] Apply Coupon', props<{ code: string }>());
export const applyCouponSuccess = createAction('[Coupon] Apply Coupon Success', props<{ result: any }>());
export const applyCouponFailure = createAction('[Coupon] Apply Coupon Failure', props<{ error: any }>());

export const deleteCoupon = createAction('[Coupon] Delete Coupon', props<{ id: string }>());
export const deleteCouponSuccess = createAction('[Coupon] Delete Coupon Success', props<{ id: string }>());
export const deleteCouponFailure = createAction('[Coupon] Delete Coupon Failure', props<{ error: any }>());
