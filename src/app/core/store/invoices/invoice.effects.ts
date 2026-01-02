
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { InvoiceService } from '../../services/invoice.service';
import * as InvoiceActions from './invoice.actions';

@Injectable()
export class InvoiceEffects {
    private actions$ = inject(Actions);
    private invoiceService = inject(InvoiceService);

    createInvoice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InvoiceActions.createInvoice),
            mergeMap(({ invoice }) =>
                this.invoiceService.createInvoice(invoice).pipe(
                    map((newInvoice) => InvoiceActions.createInvoiceSuccess({ invoice: newInvoice })),
                    catchError((error) => of(InvoiceActions.createInvoiceFailure({ error })))
                )
            )
        )
    );

    downloadInvoice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InvoiceActions.downloadInvoice),
            mergeMap(({ id }) =>
                this.invoiceService.downloadInvoice(id).pipe(
                    map((blob) => {
                        // Handle blob download logic here or just success
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `invoice-${id}.pdf`;
                        link.click();
                        return InvoiceActions.downloadInvoiceSuccess();
                    }),
                    catchError((error) => of(InvoiceActions.downloadInvoiceFailure({ error })))
                )
            )
        )
    );
}
