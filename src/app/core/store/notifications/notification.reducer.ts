import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Notification, NotificationPreferences } from '../../models/notification.model';
import * as NotificationActions from './notification.actions';

export interface NotificationState extends EntityState<Notification> {
    unreadCount: number;
    preferences: NotificationPreferences | null;
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Notification> = createEntityAdapter<Notification>({
    selectId: (n) => n._id, // Ensure using new _id field
    sortComparer: (a, b) => new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime()
});

export const initialState: NotificationState = adapter.getInitialState({
    unreadCount: 0,
    preferences: null,
    loading: false,
    error: null
});

export const notificationReducer = createReducer(
    initialState,

    // Load
    on(NotificationActions.loadNotifications, (state) => ({ ...state, loading: true, error: null })),
    on(NotificationActions.loadNotificationsSuccess, (state, { notifications }) =>
        adapter.setAll(notifications, { ...state, loading: false })
    ),
    on(NotificationActions.loadNotificationsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Unread Count
    on(NotificationActions.loadUnreadCountSuccess, (state, { count }) => ({ ...state, unreadCount: count })),

    // Add (Real-time)
    on(NotificationActions.addNotification, (state, { notification }) => {
        const newState = adapter.addOne(notification, state);
        return { ...newState, unreadCount: state.unreadCount + 1 };
    }),

    // Read / Delete
    on(NotificationActions.markAsReadSuccess, (state, { id }) => {
        const newState = adapter.updateOne({ id, changes: { isRead: true } }, state);
        return { ...newState, unreadCount: Math.max(0, state.unreadCount - 1) };
    }),
    on(NotificationActions.markAllAsReadSuccess, (state) => {
        const updates = state.ids.map(id => ({ id: id as string, changes: { isRead: true } }));
        return adapter.updateMany(updates, { ...state, unreadCount: 0 });
    }),
    on(NotificationActions.deleteNotificationSuccess, (state, { id }) =>
        adapter.removeOne(id, state)
    ),

    // Preferences
    on(NotificationActions.loadPreferences, NotificationActions.updatePreferences, (state) => ({
        ...state, loading: true, error: null
    })),
    on(NotificationActions.loadPreferencesSuccess, NotificationActions.updatePreferencesSuccess, (state, { preferences }) => ({
        ...state, preferences, loading: false
    })),
    on(NotificationActions.loadPreferencesFailure, NotificationActions.updatePreferencesFailure, (state, { error }) => ({
        ...state, loading: false, error
    }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
