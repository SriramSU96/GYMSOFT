import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import * as NotificationActions from './notification.actions';
import { NotificationService } from '../../services/notification.service';

@Injectable()
export class NotificationEffects {
    private actions$ = inject(Actions);
    private notificationService = inject(NotificationService);

    loadNotifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.loadNotifications),
            mergeMap(action =>
                this.notificationService.getNotifications(action.filter).pipe(
                    map(response => NotificationActions.loadNotificationsSuccess({ notifications: response.data })),
                    catchError(error => of(NotificationActions.loadNotificationsFailure({ error })))
                )
            )
        )
    );

    loadUnreadCount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.loadUnreadCount, NotificationActions.loadNotificationsSuccess), // Reload count on load success
            mergeMap(() =>
                this.notificationService.getUnreadCount().pipe(
                    map(response => NotificationActions.loadUnreadCountSuccess({ count: response.count })),
                    catchError(error => of(NotificationActions.loadUnreadCountFailure({ error })))
                )
            )
        )
    );

    markAsRead$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.markAsRead),
            mergeMap(action =>
                this.notificationService.markAsRead(action.id).pipe(
                    map(() => NotificationActions.markAsReadSuccess({ id: action.id })),
                    catchError(error => of(NotificationActions.markAsReadFailure({ error })))
                )
            )
        )
    );

    markAllAsRead$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.markAllAsRead),
            mergeMap(() =>
                this.notificationService.markAllAsRead().pipe(
                    map(() => NotificationActions.markAllAsReadSuccess()),
                    catchError(error => of(NotificationActions.markAllAsReadFailure({ error })))
                )
            )
        )
    );

    deleteNotification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.deleteNotification),
            mergeMap(action =>
                this.notificationService.deleteNotification(action.id).pipe(
                    map(() => NotificationActions.deleteNotificationSuccess({ id: action.id })),
                    catchError(error => of(NotificationActions.deleteNotificationFailure({ error })))
                )
            )
        )
    );

    loadPreferences$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.loadPreferences),
            switchMap(() =>
                this.notificationService.getPreferences().pipe(
                    map(response => NotificationActions.loadPreferencesSuccess({ preferences: response.data })),
                    catchError(error => of(NotificationActions.loadPreferencesFailure({ error })))
                )
            )
        )
    );

    updatePreferences$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.updatePreferences),
            mergeMap(action =>
                this.notificationService.updatePreferences(action.preferences).pipe(
                    map(response => NotificationActions.updatePreferencesSuccess({ preferences: response.data })),
                    catchError(error => of(NotificationActions.updatePreferencesFailure({ error })))
                )
            )
        )
    );
}
