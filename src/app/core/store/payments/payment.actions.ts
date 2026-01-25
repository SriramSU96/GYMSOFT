import { createAction, props } from '@ngrx/store';
import { Payment, PaymentFilter, PaymentResponse } from '../../models/payment.model';
import { Update } from '@ngrx/entity';

// Load Payments
export const loadPayments = createAction(
    '[Payments] Load Payments',
    props<{ filter?: PaymentFilter }>()
);

export const loadPaymentsSuccess = createAction(
    '[Payments] Load Payments Success',
    props<{ response: PaymentResponse }>()
);

export const loadPaymentsFailure = createAction(
    '[Payments] Load Payments Failure',
    props<{ error: any }>()
);

// Process Payment
export const processPayment = createAction(
    '[Payments] Process Payment',
    props<{ payment: Partial<Payment> }>()
);

export const processPaymentSuccess = createAction(
    '[Payments] Process Payment Success',
    props<{ payment: Payment }>()
);

export const processPaymentFailure = createAction(
    '[Payments] Process Payment Failure',
    props<{ error: any }>()
);

// Refund
export const refundPayment = createAction(
    '[Payments] Refund Payment',
    props<{ id: string; reason: string }>()
);

export const refundPaymentSuccess = createAction(
    '[Payments] Refund Payment Success',
    props<{ payment: Payment }>()
);

export const refundPaymentFailure = createAction(
    '[Payments] Refund Payment Failure',
    props<{ error: any }>()
);

// Load Invoice
export const loadInvoice = createAction(
    '[Payments] Load Invoice',
    props<{ id: string }>()
);

export const loadInvoiceSuccess = createAction(
    '[Payments] Load Invoice Success',
    props<{ invoice: any }>() // Use proper type if available
);

export const loadInvoiceFailure = createAction(
    '[Payments] Load Invoice Failure',
    props<{ error: any }>()
);

// Pending Payments (Alias for load with status=Pending)
export const loadPendingPayments = createAction(
    '[Payments] Load Pending Payments'
);

// Pending Dues
export const loadPendingDues = createAction(
    '[Payments] Load Pending Dues'
);

export const loadPendingDuesSuccess = createAction(
    '[Payments] Load Pending Dues Success',
    props<{ payments: Payment[] }>()
);

export const loadPendingDuesFailure = createAction(
    '[Payments] Load Pending Dues Failure',
    props<{ error: any }>()
);

// Send Reminder
export const sendReminder = createAction(
    '[Payments] Send Reminder',
    props<{ paymentId: string }>()
);

export const sendReminderSuccess = createAction(
    '[Payments] Send Reminder Success',
    props<{ success: boolean }>()
);

export const sendReminderFailure = createAction(
    '[Payments] Send Reminder Failure',
    props<{ error: any }>()
);

// Clear Store
export const clearPayments = createAction('[Payments] Clear Payments');
