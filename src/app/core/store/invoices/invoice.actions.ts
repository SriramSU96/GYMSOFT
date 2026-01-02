
import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../models/payment.model';

export const createInvoice = createAction('[Invoice] Create Invoice', props<{ invoice: Partial<Invoice> }>());
export const createInvoiceSuccess = createAction('[Invoice] Create Invoice Success', props<{ invoice: Invoice }>());
export const createInvoiceFailure = createAction('[Invoice] Create Invoice Failure', props<{ error: any }>());

export const downloadInvoice = createAction('[Invoice] Download Invoice', props<{ id: string }>());
export const downloadInvoiceSuccess = createAction('[Invoice] Download Invoice Success'); // We usually handle blob separately
export const downloadInvoiceFailure = createAction('[Invoice] Download Invoice Failure', props<{ error: any }>());
