import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GymSelectorComponent } from '../../shared/components/gym-selector/gym-selector.component';
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, GymSelectorComponent, NotificationCenterComponent],
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
    isSidebarOpen = true;

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
