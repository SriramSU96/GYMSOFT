import { createAction, props } from '@ngrx/store';
import { Notification } from '../../models/notification.model';

export const loadNotifications = createAction('[Notification] Load Notifications');
export const loadNotificationsSuccess = createAction('[Notification] Load Notifications Success', props<{ notifications: Notification[] }>());
export const loadNotificationsFailure = createAction('[Notification] Load Notifications Failure', props<{ error: any }>());

export const markAsRead = createAction('[Notification] Mark As Read', props<{ id: string }>());
export const markAsReadSuccess = createAction('[Notification] Mark As Read Success', props<{ id: string }>());
export const markAsReadFailure = createAction('[Notification] Mark As Read Failure', props<{ error: any }>());
