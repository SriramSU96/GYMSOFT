
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.reducer';

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoices');

export const selectInvoiceIsLoading = createSelector(
    selectInvoiceState,
    (state) => state.isLoading
);

export const selectInvoiceError = createSelector(
    selectInvoiceState,
    (state) => state.error
);
