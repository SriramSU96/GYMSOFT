import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
    label: string;
    icon: string;
    route?: string;
    children?: MenuItem[];
    expanded?: boolean;
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Input() isOpen: boolean = true;

    private router = inject(Router);
    activeRoute: string = '';

    menuItems: MenuItem[] = [
        {
            label: 'Dashboard',
            icon: 'dashboard',
            route: '/dashboard'
        },
        {
            label: 'Members',
            icon: 'people',
            expanded: false,
            children: [
                { label: 'All Members', icon: 'person', route: '/members' },
                { label: 'Assigned Workouts', icon: 'fitness_center', route: '/members/workouts' },
                { label: 'Assigned Diet Plans', icon: 'restaurant_menu', route: '/members/diet-plans' },
                { label: 'Member Progress', icon: 'trending_up', route: '/members/progress' }
            ]
        },
        {
            label: 'Workout & Diet',
            icon: 'restaurant',
            expanded: false,
            children: [
                { label: 'Exercise Library', icon: 'fitness_center', route: '/workouts' },
                { label: 'Workout Plans', icon: 'assignment', route: '/workouts/plans' },
                { label: 'Diet Meals', icon: 'lunch_dining', route: '/diets' },
                { label: 'Diet Plans', icon: 'menu_book', route: '/diets/plans' }
            ]
        },
        {
            label: 'Staff',
            icon: 'badge',
            expanded: false,
            children: [
                { label: 'Staff List', icon: 'group', route: '/staff' },
                { label: 'Staff Attendance', icon: 'event_available', route: '/staff/attendance' },
                { label: 'Payroll', icon: 'payments', route: '/staff/salary' }
            ]
        },
        {
            label: 'Attendance',
            icon: 'how_to_reg',
            expanded: false,
            children: [
                { label: 'Member Attendance', icon: 'fact_check', route: '/attendance/members' },
                { label: 'QR Check-In', icon: 'qr_code_scanner', route: '/attendance/qr' }
            ]
        },
        {
            label: 'Payments',
            icon: 'account_balance_wallet',
            expanded: false,
            children: [
                { label: 'All Payments', icon: 'payment', route: '/payments' },
                { label: 'Invoices', icon: 'receipt_long', route: '/payments/invoices' },
                { label: 'Pending Dues', icon: 'pending_actions', route: '/payments/pending' },
                { label: 'Profit & Loss', icon: 'analytics', route: '/payments/profit-loss' }
            ]
        },
        {
            label: 'POS',
            icon: 'point_of_sale',
            expanded: false,
            children: [
                { label: 'Products', icon: 'inventory_2', route: '/pos/products' },
                { label: 'Sales', icon: 'shopping_cart', route: '/pos/sales' },
                { label: 'POS Reports', icon: 'assessment', route: '/pos/reports' }
            ]
        },
        {
            label: 'Analytics',
            icon: 'insights',
            expanded: false,
            children: [
                { label: 'Overview', icon: 'pie_chart', route: '/analytics/overview' },
                { label: 'Advanced', icon: 'bar_chart', route: '/analytics/advanced' }
            ]
        },
        {
            label: 'Reports',
            icon: 'summarize',
            expanded: false,
            children: [
                { label: 'Member Reports', icon: 'description', route: '/reports/members' },
                { label: 'Finance Reports', icon: 'account_balance', route: '/reports/finance' },
                { label: 'Attendance Reports', icon: 'event_note', route: '/reports/attendance' }
            ]
        },
        {
            label: 'Gym Management',
            icon: 'admin_panel_settings',
            expanded: false,
            children: [
                { label: 'Gym Branches', icon: 'store', route: '/gyms' },
                { label: 'Roles & Permissions', icon: 'security', route: '/settings/roles' },
                { label: 'Security Settings', icon: 'shield', route: '/settings/security' }
            ]
        }
    ];

    ngOnInit() {
        // Track active route
        this.activeRoute = this.router.url;

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.activeRoute = event.url;
                this.autoExpandActiveMenu();
            });

        // Auto-expand menu containing active route
        this.autoExpandActiveMenu();
    }

    toggleSubmenu(item: MenuItem) {
        if (item.children) {
            item.expanded = !item.expanded;
        }
    }

    isActive(route?: string): boolean {
        if (!route) return false;
        return this.activeRoute === route || this.activeRoute.startsWith(route + '/');
    }

    isParentActive(item: MenuItem): boolean {
        if (!item.children) return false;
        return item.children.some(child => this.isActive(child.route));
    }

    private autoExpandActiveMenu() {
        this.menuItems.forEach(item => {
            if (item.children) {
                const hasActiveChild = item.children.some(child => this.isActive(child.route));
                if (hasActiveChild) {
                    item.expanded = true;
                }
            }
        });
    }
}
