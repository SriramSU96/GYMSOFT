
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
import * as NotificationActions from './notification.actions';

@Injectable()
export class NotificationEffects {
    private actions$ = inject(Actions);
    private notificationService = inject(NotificationService);

    loadNotifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.loadNotifications),
            mergeMap(() =>
                this.notificationService.getNotifications().pipe(
                    map((notifications) => NotificationActions.loadNotificationsSuccess({ notifications })),
                    catchError((error) => of(NotificationActions.loadNotificationsFailure({ error })))
                )
            )
        )
    );

    markAsRead$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.markAsRead),
            mergeMap(({ id }) =>
                this.notificationService.markAsRead(id).pipe(
                    map(() => NotificationActions.markAsReadSuccess({ id })),
                    catchError((error) => of(NotificationActions.markAsReadFailure({ error })))
                )
            )
        )
    );
}
