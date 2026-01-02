import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-notification-center',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification-center.component.html',
    styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent {
    notifications = [
        { id: 1, title: 'New Member Joined', message: 'Sandeep just signed up for Gold Plan', type: 'info', time: '10 mins ago', read: false },
        { id: 2, title: 'Payment Failed', message: 'Recurring payment for Amit failed', type: 'error', time: '1 hour ago', read: false },
        { id: 3, title: 'Maintenance Alert', message: 'Treadmill #4 needs servicing', type: 'warning', time: '2 hours ago', read: true }
    ];

    filter = 'all';

    get filteredNotifications() {
        if (this.filter === 'unread') {
            return this.notifications.filter(n => !n.read);
        }
        return this.notifications;
    }

    markAsRead(id: number) {
        const notif = this.notifications.find(n => n.id === id);
        if (notif) notif.read = true;
    }

    deleteNotification(id: number) {
        this.notifications = this.notifications.filter(n => n.id !== id);
    }
}
