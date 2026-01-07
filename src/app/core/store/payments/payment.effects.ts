
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PaymentService } from '../../services/payment.service';
import * as PaymentActions from './payment.actions';

@Injectable()
export class PaymentEffects {
    private actions$ = inject(Actions);
    private paymentService = inject(PaymentService);

    loadPendingPayments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.loadPendingPayments),
            mergeMap(() =>
                this.paymentService.getPendingPayments().pipe(
                    map((payments) => PaymentActions.loadPendingPaymentsSuccess({ payments })),
                    catchError((error) => of(PaymentActions.loadPendingPaymentsFailure({ error })))
                )
            )
        )
    );

    sendReminder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.sendReminder),
            mergeMap(({ memberId }) =>
                this.paymentService.sendReminder(memberId).pipe(
                    map(() => PaymentActions.sendReminderSuccess()),
                    catchError((error) => of(PaymentActions.sendReminderFailure({ error })))
                )
            )
        )
    );

    recordPartialPayment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.recordPartialPayment),
            mergeMap(({ payment }) =>
                this.paymentService.recordPartialPayment(payment).pipe(
                    map((newPayment) => PaymentActions.recordPartialPaymentSuccess({ payment: newPayment })),
                    catchError((error) => of(PaymentActions.recordPartialPaymentFailure({ error })))
                )
            )
        )
    );

    loadInvoice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.loadInvoice),
            mergeMap(({ id }) =>
                this.paymentService.getInvoiceDownload(id).pipe(
                    map(() => PaymentActions.loadInvoiceSuccess({ invoice: {} as any })), // Placeholder if we just download
                    catchError((error) => of(PaymentActions.loadInvoiceFailure({ error })))
                )
            )
        )
    );
}
