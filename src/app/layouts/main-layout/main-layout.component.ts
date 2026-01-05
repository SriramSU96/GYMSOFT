import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { GymSelectorComponent } from '../../shared/components/gym-selector/gym-selector.component';
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component';
import { Sidebar } from '../../core/components/layout/sidebar/sidebar';
import { selectNotifications, selectUnreadCount } from '../../core/store/notifications/notification.selectors';
import { filter, skip, take } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, GymSelectorComponent, NotificationCenterComponent, Sidebar],
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
    private store = inject(Store);
    isSidebarOpen = true;
    showNotifications = false;

    // Notifications Logic
    unreadCount$ = this.store.select(selectUnreadCount);
    private notificationsSub?: Subscription;
    private autoCloseTimeout?: any;

    ngOnInit() {
        // Auto-show notifications for 10s when new data arrives
        this.notificationsSub = this.store.select(selectNotifications).pipe(
            skip(1), // Skip initial load
            filter(notifs => notifs.length > 0)
        ).subscribe(() => {
            this.triggerNotificationFlash();
        });
    }

    ngOnDestroy() {
        this.notificationsSub?.unsubscribe();
        if (this.autoCloseTimeout) clearTimeout(this.autoCloseTimeout);
    }

    triggerNotificationFlash() {
        this.showNotifications = true;
        if (this.autoCloseTimeout) clearTimeout(this.autoCloseTimeout);
        this.autoCloseTimeout = setTimeout(() => {
            this.showNotifications = false;
        }, 10000);
    }

    toggleNotifications() {
        this.showNotifications = !this.showNotifications;
        if (this.showNotifications && this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
        }
    }

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    onLogout() {
        this.store.dispatch(AuthActions.logout());
    }
}
