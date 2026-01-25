import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Payment } from '../../models/payment.model';
import * as PaymentActions from './payment.actions';

export interface PaymentState extends EntityState<Payment> {
    loading: boolean;
    error: any;
    total: number;
    selectedInvoice: any | null;
    pendingDues: Payment[];
}

export const adapter: EntityAdapter<Payment> = createEntityAdapter<Payment>({
    selectId: (p) => p._id || '',
    sortComparer: (a, b) => (b.paymentDate ? new Date(b.paymentDate).getTime() : 0) - (a.paymentDate ? new Date(a.paymentDate).getTime() : 0)
});

export const initialState: PaymentState = adapter.getInitialState({
    loading: false,
    error: null,
    total: 0,
    selectedInvoice: null,
    pendingDues: []
});

export const paymentReducer = createReducer(
    initialState,

    // Load
    on(PaymentActions.loadPayments, (state) => ({ ...state, loading: true, error: null })),
    on(PaymentActions.loadPaymentsSuccess, (state, { response }) =>
        adapter.setAll(response.data, { ...state, loading: false, total: response.count || 0 })
    ),
    on(PaymentActions.loadPaymentsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Process
    on(PaymentActions.processPayment, (state) => ({ ...state, loading: true, error: null })),
    on(PaymentActions.processPaymentSuccess, (state, { payment }) =>
        adapter.addOne(payment, { ...state, loading: false })
    ),
    on(PaymentActions.processPaymentFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Refund
    on(PaymentActions.refundPayment, (state) => ({ ...state, loading: true })),
    on(PaymentActions.refundPaymentSuccess, (state, { payment }) =>
        adapter.upsertOne(payment, { ...state, loading: false })
    ),
    on(PaymentActions.refundPaymentFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PaymentActions.clearPayments, (state) => adapter.removeAll({ ...state, total: 0 })),

    // Invoice
    on(PaymentActions.loadInvoice, (state) => ({ ...state, loading: true })),
    on(PaymentActions.loadInvoiceSuccess, (state, { invoice }) => ({ ...state, loading: false, selectedInvoice: invoice })),
    on(PaymentActions.loadInvoiceFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Pending Dues
    on(PaymentActions.loadPendingDues, (state) => ({ ...state, loading: true })),
    on(PaymentActions.loadPendingDuesSuccess, (state, { payments }) => ({ ...state, loading: false, pendingDues: payments })),
    on(PaymentActions.loadPendingDuesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Reminder
    on(PaymentActions.sendReminder, (state) => ({ ...state, loading: true })),
    on(PaymentActions.sendReminderSuccess, (state) => ({ ...state, loading: false })),
    on(PaymentActions.sendReminderFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
