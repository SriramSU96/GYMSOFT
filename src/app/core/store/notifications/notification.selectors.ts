import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState, selectAll } from './notification.reducer';

export const selectNotificationState = createFeatureSelector<NotificationState>('notifications');

export const selectAllNotifications = createSelector(
    selectNotificationState,
    selectAll
);

export const selectUnreadCount = createSelector(
    selectNotificationState,
    (state) => state.unreadCount
);

export const selectNotificationPreferences = createSelector(
    selectNotificationState,
    (state) => state.preferences
);

export const selectNotificationsLoading = createSelector(
    selectNotificationState,
    (state) => state.loading
);
