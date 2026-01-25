import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification, NotificationPreferences, NotificationFilter } from '../models/notification.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/notifications`;

    // User Notifications
    getNotifications(filter: NotificationFilter = {}): Observable<{ success: boolean; data: Notification[] }> {
        let params = new HttpParams();
        Object.keys(filter).forEach(key => {
            if (filter[key as keyof NotificationFilter] !== undefined) {
                params = params.set(key, (filter[key as keyof NotificationFilter] as any).toString());
            }
        });
        return this.http.get<{ success: boolean; data: Notification[] }>(this.apiUrl, { params });
    }

    getUnreadCount(): Observable<{ success: boolean; count: number }> {
        return this.http.get<{ success: boolean; count: number }>(`${this.apiUrl}/unread-count`);
    }

    markAsRead(id: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}/read`, {});
    }

    markAllAsRead(): Observable<any> {
        return this.http.patch(`${this.apiUrl}/read-all`, {});
    }

    deleteNotification(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    // Preferences
    getPreferences(): Observable<{ success: boolean; data: NotificationPreferences }> {
        return this.http.get<{ success: boolean; data: NotificationPreferences }>(`${this.apiUrl}/preferences`);
    }

    updatePreferences(prefs: Partial<NotificationPreferences>): Observable<{ success: boolean; data: NotificationPreferences }> {
        return this.http.patch<{ success: boolean; data: NotificationPreferences }>(`${this.apiUrl}/preferences`, prefs);
    }

    // Admin
    sendNotification(notification: Partial<Notification>): Observable<any> {
        return this.http.post(`${this.apiUrl}/send`, notification);
    }
}
