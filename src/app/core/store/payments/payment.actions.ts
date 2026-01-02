
import { createAction, props } from '@ngrx/store';
import { Payment, Invoice } from '../../models/payment.model';

export const loadPendingPayments = createAction('[Payment] Load Pending Payments');
export const loadPendingPaymentsSuccess = createAction('[Payment] Load Pending Payments Success', props<{ payments: Payment[] }>());
export const loadPendingPaymentsFailure = createAction('[Payment] Load Pending Payments Failure', props<{ error: any }>());

export const sendReminder = createAction('[Payment] Send Reminder', props<{ memberId: string }>());
export const sendReminderSuccess = createAction('[Payment] Send Reminder Success');
export const sendReminderFailure = createAction('[Payment] Send Reminder Failure', props<{ error: any }>());

export const recordPartialPayment = createAction('[Payment] Record Partial Payment', props<{ payment: Partial<Payment> }>());
export const recordPartialPaymentSuccess = createAction('[Payment] Record Partial Payment Success', props<{ payment: Payment }>());
export const recordPartialPaymentFailure = createAction('[Payment] Record Partial Payment Failure', props<{ error: any }>());

// Invoice Actions
export const loadInvoice = createAction('[Payment] Load Invoice', props<{ id: string }>());
export const loadInvoiceSuccess = createAction('[Payment] Load Invoice Success', props<{ invoice: Invoice }>());
export const loadInvoiceFailure = createAction('[Payment] Load Invoice Failure', props<{ error: any }>());

// Pending Dues Actions
export const loadPendingDues = createAction('[Payment] Load Pending Dues');
export const loadPendingDuesSuccess = createAction('[Payment] Load Pending Dues Success', props<{ dues: any[] }>()); // Using any[] for now as it's a specific report
export const loadPendingDuesFailure = createAction('[Payment] Load Pending Dues Failure', props<{ error: any }>());
