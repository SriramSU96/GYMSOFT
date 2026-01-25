import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as PaymentActions from './payment.actions';
import { PaymentService } from '../../services/payment.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class PaymentEffects {
    private actions$ = inject(Actions);
    private paymentService = inject(PaymentService);
    private toast = inject(ToastService);

    loadPayments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.loadPayments),
            mergeMap(action =>
                this.paymentService.getPayments(action.filter).pipe(
                    map(response => PaymentActions.loadPaymentsSuccess({ response })),
                    catchError(error => of(PaymentActions.loadPaymentsFailure({ error })))
                )
            )
        )
    );

    processPayment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.processPayment),
            mergeMap(action =>
                this.paymentService.processPayment(action.payment).pipe(
                    map(response => {
                        this.toast.success('Payment Processed Successfully');
                        return PaymentActions.processPaymentSuccess({ payment: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Payment Failed');
                        return of(PaymentActions.processPaymentFailure({ error }));
                    })
                )
            )
        )
    );

    refundPayment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.refundPayment),
            mergeMap(action =>
                this.paymentService.refundPayment(action.id, action.reason).pipe(
                    map(response => {
                        this.toast.success('Refund Processed');
                        return PaymentActions.refundPaymentSuccess({ payment: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Refund Failed');
                        return of(PaymentActions.refundPaymentFailure({ error }));
                    })
                )
            )
        )
    );
}
