import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState, selectAll } from './invoice.reducer';

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoices');

export const selectAllInvoices = createSelector(
    selectInvoiceState,
    selectAll
);

export const selectInvoiceLoading = createSelector(
    selectInvoiceState,
    (state) => state.loading
);

export const selectInvoiceError = createSelector(
    selectInvoiceState,
    (state) => state.error
);
