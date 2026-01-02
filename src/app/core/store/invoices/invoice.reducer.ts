
import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './invoice.actions';
import { Invoice } from '../../models/payment.model';

export interface InvoiceState {
    invoices: Invoice[]; // Assuming we store created ones or list
    isLoading: boolean;
    error: any;
}

export const initialState: InvoiceState = {
    invoices: [],
    isLoading: false,
    error: null
};

export const invoiceReducer = createReducer(
    initialState,
    on(InvoiceActions.createInvoice, InvoiceActions.downloadInvoice, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(InvoiceActions.createInvoiceSuccess, (state, { invoice }) => ({
        ...state,
        invoices: [...state.invoices, invoice],
        isLoading: false
    })),
    on(InvoiceActions.downloadInvoiceSuccess, (state) => ({
        ...state,
        isLoading: false
    })),
    on(InvoiceActions.createInvoiceFailure, InvoiceActions.downloadInvoiceFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);
