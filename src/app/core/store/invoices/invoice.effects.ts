import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as InvoiceActions from './invoice.actions';
import { InvoiceService } from '../../services/invoice.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class InvoiceEffects {
    private actions$ = inject(Actions);
    private invoiceService = inject(InvoiceService);
    private toast = inject(ToastService);

    loadInvoices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InvoiceActions.loadInvoices),
            mergeMap(action =>
                this.invoiceService.getInvoices(action.filter).pipe(
                    map(response => InvoiceActions.loadInvoicesSuccess({ response })),
                    catchError(error => of(InvoiceActions.loadInvoicesFailure({ error })))
                )
            )
        )
    );

    createInvoice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InvoiceActions.createInvoice),
            mergeMap(action =>
                this.invoiceService.createInvoice(action.invoice).pipe(
                    map(response => {
                        this.toast.success('Invoice Created');
                        return InvoiceActions.createInvoiceSuccess({ invoice: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Failed to Create Invoice');
                        return of(InvoiceActions.createInvoiceFailure({ error }));
                    })
                )
            )
        )
    );

    downloadInvoice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InvoiceActions.downloadInvoice),
            mergeMap(action =>
                this.invoiceService.downloadInvoice(action.id).pipe(
                    tap(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `invoice-${action.id}.pdf`;
                        link.click();
                        window.URL.revokeObjectURL(url);
                    }),
                    map(() => ({ type: '[Invoices] Download Success' })), // No state change needed
                    catchError(() => {
                        this.toast.error('Download Failed');
                        return of({ type: '[Invoices] Download Failure' });
                    })
                )
            )
        ),
        { dispatch: false }
    );
}
