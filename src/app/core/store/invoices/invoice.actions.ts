import { createAction, props } from '@ngrx/store';
import { Invoice, InvoiceFilter, InvoiceResponse } from '../../models/payment.model';

// Load
export const loadInvoices = createAction(
    '[Invoices] Load Invoices',
    props<{ filter?: InvoiceFilter }>()
);

export const loadInvoicesSuccess = createAction(
    '[Invoices] Load Invoices Success',
    props<{ response: InvoiceResponse }>()
);

export const loadInvoicesFailure = createAction(
    '[Invoices] Load Invoices Failure',
    props<{ error: any }>()
);

// Create
export const createInvoice = createAction(
    '[Invoices] Create Invoice',
    props<{ invoice: Partial<Invoice> }>()
);

export const createInvoiceSuccess = createAction(
    '[Invoices] Create Invoice Success',
    props<{ invoice: Invoice }>()
);

export const createInvoiceFailure = createAction(
    '[Invoices] Create Invoice Failure',
    props<{ error: any }>()
);

// Download
export const downloadInvoice = createAction(
    '[Invoices] Download Invoice',
    props<{ id: string }>()
);
