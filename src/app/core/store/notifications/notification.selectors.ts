
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState } from './notification.reducer';

export const selectNotificationState = createFeatureSelector<NotificationState>('notifications');

export const selectNotifications = createSelector(
    selectNotificationState,
    (state) => state.notifications
);

export const selectUnreadCount = createSelector(
    selectNotifications,
    (notifications) => notifications.filter(n => !n.isRead).length
);
