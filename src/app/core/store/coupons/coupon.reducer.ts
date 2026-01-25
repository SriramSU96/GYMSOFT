import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Coupon } from '../../models/coupon.model';
import * as CouponActions from './coupon.actions';

export interface CouponState extends EntityState<Coupon> {
    loading: boolean;
    error: any;
    validationResult: { valid: boolean; discount: number; coupon?: Coupon } | null;
}

export const adapter: EntityAdapter<Coupon> = createEntityAdapter<Coupon>({
    selectId: (c: Coupon) => c._id || '',
    sortComparer: (a: Coupon, b: Coupon) => (b.expiryDate ? new Date(b.expiryDate).getTime() : 0) - (a.expiryDate ? new Date(a.expiryDate).getTime() : 0)
});

export const initialState: CouponState = adapter.getInitialState({
    loading: false,
    error: null,
    validationResult: null
});

export const couponReducer = createReducer(
    initialState,

    on(CouponActions.loadCoupons, (state) => ({ ...state, loading: true, error: null })),
    on(CouponActions.loadCouponsSuccess, (state, { coupons }) =>
        adapter.setAll(coupons, { ...state, loading: false })
    ),
    on(CouponActions.loadCouponsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CouponActions.createCoupon, (state) => ({ ...state, loading: true, error: null })),
    on(CouponActions.createCouponSuccess, (state, { coupon }) =>
        adapter.addOne(coupon, { ...state, loading: false })
    ),
    on(CouponActions.createCouponFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CouponActions.validateCoupon, (state) => ({ ...state, loading: true, error: null, validationResult: null })),
    on(CouponActions.validateCouponSuccess, (state, { valid, discount, coupon }) => ({
        ...state,
        loading: false,
        validationResult: { valid, discount, coupon }
    })),
    on(CouponActions.validateCouponFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CouponActions.updateCoupon, (state) => ({ ...state, loading: true, error: null })),
    on(CouponActions.updateCouponSuccess, (state, { update }) =>
        adapter.updateOne(update, { ...state, loading: false })
    ),
    on(CouponActions.updateCouponFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
