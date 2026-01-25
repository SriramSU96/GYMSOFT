import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as ClassActions from './class.actions';
import { BookingService } from '../../services/booking.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class ClassEffects {
    private actions$ = inject(Actions);
    private bookingService = inject(BookingService);
    private toast = inject(ToastService);

    loadClasses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClassActions.loadClasses),
            mergeMap(action =>
                this.bookingService.getClasses(action.filter).pipe(
                    map(response => ClassActions.loadClassesSuccess({ response })),
                    catchError(error => of(ClassActions.loadClassesFailure({ error })))
                )
            )
        )
    );

    createClass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClassActions.createClass),
            mergeMap(action =>
                this.bookingService.createClass(action.classData).pipe(
                    map(response => {
                        this.toast.success('Class Created');
                        return ClassActions.createClassSuccess({ classData: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Creation Failed');
                        return of(ClassActions.createClassFailure({ error }));
                    })
                )
            )
        )
    );

    updateClass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClassActions.updateClass),
            mergeMap(action =>
                this.bookingService.updateClass(action.id, action.changes).pipe(
                    map(response => {
                        this.toast.success('Class Updated');
                        return ClassActions.updateClassSuccess({ update: { id: action.id, changes: response.data } });
                    }),
                    catchError(error => {
                        this.toast.error('Update Failed');
                        return of(ClassActions.updateClassFailure({ error }));
                    })
                )
            )
        )
    );

    deleteClass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClassActions.deleteClass),
            mergeMap(action =>
                this.bookingService.deleteClass(action.id).pipe(
                    map(() => {
                        this.toast.success('Class Deleted');
                        return ClassActions.deleteClassSuccess({ id: action.id });
                    }),
                    catchError(error => {
                        this.toast.error('Deletion Failed');
                        return of(ClassActions.deleteClassFailure({ error }));
                    })
                )
            )
        )
    );

    bookClass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClassActions.bookClass),
            mergeMap(action =>
                this.bookingService.bookClass(action.classId, action.memberId).pipe(
                    map(response => {
                        this.toast.success('Class Booked');
                        return ClassActions.bookClassSuccess({ booking: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Booking Failed');
                        return of(ClassActions.bookClassFailure({ error }));
                    })
                )
            )
        )
    );

    cancelBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClassActions.cancelBooking),
            mergeMap(action =>
                this.bookingService.cancelBooking(action.bookingId).pipe(
                    map(() => {
                        this.toast.success('Booking Cancelled');
                        return ClassActions.cancelBookingSuccess({ bookingId: action.bookingId });
                    }),
                    catchError(error => {
                        this.toast.error('Cancellation Failed');
                        return of(ClassActions.cancelBookingFailure({ error }));
                    })
                )
            )
        )
    );

    loadMemberBookings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClassActions.loadMemberBookings),
            mergeMap(action =>
                this.bookingService.getMemberBookings(action.memberId).pipe(
                    map(response => ClassActions.loadMemberBookingsSuccess({ response })),
                    catchError(error => of(ClassActions.loadMemberBookingsFailure({ error })))
                )
            )
        )
    );
}
