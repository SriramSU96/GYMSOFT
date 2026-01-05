import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectNotifications } from '../../../core/store/notifications/notification.selectors';
import * as NotificationActions from '../../../core/store/notifications/notification.actions';

@Component({
    selector: 'app-notification-center',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification-center.component.html',
    styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent implements OnInit {
    private store = inject(Store);

    // Data Observables
    allNotifications$ = this.store.select(selectNotifications);
    filter = 'all';

    // Filtered stream
    notifications$ = this.allNotifications$.pipe(
        map(notifications => {
            if (this.filter === 'unread') {
                return notifications.filter(n => !n.isRead);
            }
            return notifications;
        })
    );

    ngOnInit() {
        this.store.dispatch(NotificationActions.loadNotifications());
    }

    setFilter(filter: string) {
        this.filter = filter;
        // Re-assign notifications$ to trigger steam update (simpler for this case)
        this.notifications$ = this.allNotifications$.pipe(
            map(notifications => {
                if (this.filter === 'unread') {
                    return notifications.filter(n => !n.isRead);
                }
                return notifications;
            })
        );
    }

    markAsRead(id: string) {
        this.store.dispatch(NotificationActions.markAsRead({ id }));
    }

    // Dismiss functionality (if supported by backend, otherwise local filter)
    dismiss(id: string) {
        // Local dismiss if backend doesn't support specific delete
        this.notifications$ = this.notifications$.pipe(
            map(list => list.filter(n => n.id !== id))
        );
    }
}
