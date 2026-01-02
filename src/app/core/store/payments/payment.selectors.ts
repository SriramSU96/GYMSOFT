
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentState } from './payment.reducer';

export const selectPaymentState = createFeatureSelector<PaymentState>('payments');

export const selectPayments = createSelector(
    selectPaymentState,
    (state) => state.pendingPayments
);

export const selectPendingPayments = createSelector(
    selectPaymentState,
    (state) => state.pendingPayments
);

export const selectPaymentIsLoading = createSelector(
    selectPaymentState,
    (state) => state.isLoading
);

export const selectPaymentError = createSelector(
    selectPaymentState,
    (state) => state.error
);

export const selectSelectedInvoice = createSelector(
    selectPaymentState,
    (state) => state.selectedInvoice
);

export const selectPendingDues = createSelector(
    selectPaymentState,
    (state) => state.pendingDues
);
