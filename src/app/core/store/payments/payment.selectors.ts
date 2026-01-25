import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentState, selectAll } from './payment.reducer';

export const selectPaymentState = createFeatureSelector<PaymentState>('payments');

export const selectAllPayments = createSelector(
    selectPaymentState,
    selectAll
);

export const selectPaymentLoading = createSelector(
    selectPaymentState,
    (state) => state.loading
);

export const selectPaymentError = createSelector(
    selectPaymentState,
    (state) => state.error
);

export const selectTotalPayments = createSelector(
    selectPaymentState,
    (state) => state.total
);

export const selectSelectedInvoice = createSelector(
    selectPaymentState,
    (state) => state.selectedInvoice
);

export const selectPendingDues = createSelector(
    selectPaymentState,
    (state) => state.pendingDues
);
