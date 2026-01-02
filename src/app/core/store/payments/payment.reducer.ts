import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';
import { Payment, Invoice } from '../../models/payment.model';

export interface PaymentState {
    pendingPayments: Payment[];
    pendingDues: any[];
    selectedInvoice: Invoice | null;
    isLoading: boolean;
    error: any;
}

export const initialState: PaymentState = {
    pendingPayments: [],
    pendingDues: [],
    selectedInvoice: null,
    isLoading: false,
    error: null
};

export const paymentReducer = createReducer(
    initialState,
    on(PaymentActions.loadPendingPayments,
        PaymentActions.sendReminder,
        PaymentActions.recordPartialPayment,
        PaymentActions.loadInvoice,
        PaymentActions.loadPendingDues, (state) => ({
            ...state,
            isLoading: true,
            error: null
        })),
    on(PaymentActions.loadPendingPaymentsSuccess, (state, { payments }) => ({
        ...state,
        pendingPayments: payments,
        isLoading: false
    })),
    on(PaymentActions.loadInvoiceSuccess, (state, { invoice }) => ({
        ...state,
        selectedInvoice: invoice,
        isLoading: false
    })),
    on(PaymentActions.loadPendingDuesSuccess, (state, { dues }) => ({
        ...state,
        pendingDues: dues,
        isLoading: false
    })),
    on(PaymentActions.recordPartialPaymentSuccess, (state, { payment }) => ({
        ...state,
        isLoading: false
    })),
    on(PaymentActions.sendReminderSuccess, (state) => ({
        ...state,
        isLoading: false
    })),
    on(PaymentActions.loadPendingPaymentsFailure,
        PaymentActions.sendReminderFailure,
        PaymentActions.recordPartialPaymentFailure,
        PaymentActions.loadInvoiceFailure,
        PaymentActions.loadPendingDuesFailure, (state, { error }) => ({
            ...state,
            isLoading: false,
            error
        }))
);
