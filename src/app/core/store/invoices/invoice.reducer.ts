import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Invoice } from '../../models/payment.model';
import * as InvoiceActions from './invoice.actions';

export interface InvoiceState extends EntityState<Invoice> {
    loading: boolean;
    error: any;
    total: number;
}

export const adapter: EntityAdapter<Invoice> = createEntityAdapter<Invoice>({
    selectId: (i) => i._id || '',
    sortComparer: (a, b) => (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0)
});

export const initialState: InvoiceState = adapter.getInitialState({
    loading: false,
    error: null,
    total: 0
});

export const invoiceReducer = createReducer(
    initialState,

    on(InvoiceActions.loadInvoices, (state) => ({ ...state, loading: true, error: null })),
    on(InvoiceActions.loadInvoicesSuccess, (state, { response }) =>
        adapter.setAll(response.data, { ...state, loading: false, total: response.count || 0 })
    ),
    on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(InvoiceActions.createInvoice, (state) => ({ ...state, loading: true, error: null })),
    on(InvoiceActions.createInvoiceSuccess, (state, { invoice }) =>
        adapter.addOne(invoice, { ...state, loading: false })
    ),
    on(InvoiceActions.createInvoiceFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
