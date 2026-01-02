import { createReducer, on } from '@ngrx/store';
import * as NotificationActions from './notification.actions';
import { Notification } from '../../models/notification.model';

export interface NotificationState {
    notifications: Notification[];
    isLoading: boolean;
    error: any;
}

export const initialState: NotificationState = {
    notifications: [],
    isLoading: false,
    error: null
};

export const notificationReducer = createReducer(
    initialState,
    on(NotificationActions.loadNotifications, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(NotificationActions.loadNotificationsSuccess, (state, { notifications }) => ({
        ...state,
        notifications,
        isLoading: false
    })),
    on(NotificationActions.markAsReadSuccess, (state, { id }) => ({
        ...state,
        notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n),
        isLoading: false
    })),
    on(NotificationActions.loadNotificationsFailure, NotificationActions.markAsReadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);
