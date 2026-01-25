import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as PosActions from './pos.actions';
import { PosService } from '../../services/pos.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class PosEffects {
    private actions$ = inject(Actions);
    private posService = inject(PosService);
    private toast = inject(ToastService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PosActions.loadProducts),
            mergeMap(action =>
                this.posService.getProducts(action.filter).pipe(
                    map(response => PosActions.loadProductsSuccess({ response })),
                    catchError(error => of(PosActions.loadProductsFailure({ error })))
                )
            )
        )
    );

    createProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PosActions.createProduct),
            mergeMap(action =>
                this.posService.createProduct(action.product).pipe(
                    map(response => {
                        this.toast.success('Product Created');
                        return PosActions.createProductSuccess({ product: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Creation Failed');
                        return of(PosActions.createProductFailure({ error }));
                    })
                )
            )
        )
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PosActions.updateProduct),
            mergeMap(action =>
                this.posService.updateProduct(action.id, action.updates).pipe(
                    map(response => {
                        this.toast.success('Product Updated');
                        return PosActions.updateProductSuccess({ update: { id: action.id, changes: response.data } });
                    }),
                    catchError(error => {
                        this.toast.error('Update Failed');
                        return of(PosActions.updateProductFailure({ error }));
                    })
                )
            )
        )
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PosActions.deleteProduct),
            mergeMap(action =>
                this.posService.deleteProduct(action.id).pipe(
                    map(() => {
                        this.toast.success('Product Deleted');
                        return PosActions.deleteProductSuccess({ id: action.id });
                    }),
                    catchError(error => {
                        this.toast.error('Deletion Failed');
                        return of(PosActions.deleteProductFailure({ error }));
                    })
                )
            )
        )
    );

    adjustStock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PosActions.adjustStock),
            mergeMap(action =>
                this.posService.adjustStock(action.id, action.adjustment).pipe(
                    map(response => {
                        this.toast.success('Stock Adjusted');
                        return PosActions.adjustStockSuccess({ product: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Stock Adjustment Failed');
                        return of(PosActions.adjustStockFailure({ error }));
                    })
                )
            )
        )
    );

    processSale$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PosActions.processSale),
            mergeMap(action =>
                this.posService.processSale(action.sale).pipe(
                    map(response => {
                        this.toast.success('Sale Processed');
                        return PosActions.processSaleSuccess({ sale: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Sale Failed');
                        return of(PosActions.processSaleFailure({ error }));
                    })
                )
            )
        )
    );

    loadSalesHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PosActions.loadSalesHistory),
            mergeMap(action =>
                this.posService.getSalesHistory(action.filter).pipe(
                    map(response => PosActions.loadSalesHistorySuccess({ response })),
                    catchError(error => of(PosActions.loadSalesHistoryFailure({ error })))
                )
            )
        )
    );
}
