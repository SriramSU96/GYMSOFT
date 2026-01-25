import { createAction, props } from '@ngrx/store';
import { Notification, NotificationPreferences, NotificationFilter } from '../../models/notification.model';
import { Update } from '@ngrx/entity';

// Notifications
export const loadNotifications = createAction(
    '[Notification] Load Notifications',
    props<{ filter?: NotificationFilter }>()
);

export const loadNotificationsSuccess = createAction(
    '[Notification] Load Notifications Success',
    props<{ notifications: Notification[] }>()
);

export const loadNotificationsFailure = createAction(
    '[Notification] Load Notifications Failure',
    props<{ error: any }>()
);

export const loadUnreadCount = createAction('[Notification] Load Unread Count');
export const loadUnreadCountSuccess = createAction(
    '[Notification] Load Unread Count Success',
    props<{ count: number }>()
);
export const loadUnreadCountFailure = createAction(
    '[Notification] Load Unread Count Failure',
    props<{ error: any }>()
);

export const markAsRead = createAction(
    '[Notification] Mark As Read',
    props<{ id: string }>()
);

export const markAsReadSuccess = createAction(
    '[Notification] Mark As Read Success',
    props<{ id: string }>()
);

export const markAsReadFailure = createAction(
    '[Notification] Mark As Read Failure',
    props<{ error: any }>()
);

export const markAllAsRead = createAction('[Notification] Mark All As Read');
export const markAllAsReadSuccess = createAction('[Notification] Mark All As Read Success');
export const markAllAsReadFailure = createAction(
    '[Notification] Mark All As Read Failure',
    props<{ error: any }>()
);

export const deleteNotification = createAction(
    '[Notification] Delete Notification',
    props<{ id: string }>()
);

export const deleteNotificationSuccess = createAction(
    '[Notification] Delete Notification Success',
    props<{ id: string }>()
);

export const deleteNotificationFailure = createAction(
    '[Notification] Delete Notification Failure',
    props<{ error: any }>()
);

export const addNotification = createAction(
    '[Notification] Add Notification',
    props<{ notification: Notification }>()
);

// Preferences
export const loadPreferences = createAction('[Notification] Load Preferences');
export const loadPreferencesSuccess = createAction(
    '[Notification] Load Preferences Success',
    props<{ preferences: NotificationPreferences }>()
);
export const loadPreferencesFailure = createAction(
    '[Notification] Load Preferences Failure',
    props<{ error: any }>()
);

export const updatePreferences = createAction(
    '[Notification] Update Preferences',
    props<{ preferences: Partial<NotificationPreferences> }>()
);
export const updatePreferencesSuccess = createAction(
    '[Notification] Update Preferences Success',
    props<{ preferences: NotificationPreferences }>()
);
export const updatePreferencesFailure = createAction(
    '[Notification] Update Preferences Failure',
    props<{ error: any }>()
);
