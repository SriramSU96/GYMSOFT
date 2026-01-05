import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/auth/auth.selectors';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html'
})
export class Sidebar {
  private store = inject(Store);

  @Input() isOpen = true;

  currentUser$ = this.store.select(selectUser);

  menuItems = [
    { label: 'Member Dashboard', route: '/members', icon: 'people' },
    { label: 'Profit & Loss', route: '/payments/profit-loss', icon: 'payments' },
    { label: 'Coupons & Discounts', route: '/coupons', icon: 'confirmation_number' },
    { label: 'Invoices', route: '/payments', icon: 'description' }, // Note: /payments/payment-list seems to be the baseline
    { label: 'Pending Dues', route: '/payments/pending', icon: 'event_busy' },
    { label: 'Staff & Operations', route: '/staff', icon: 'badge' },
    { label: 'Advanced Analytics', route: '/analytics/advanced', icon: 'insights' },
    { label: 'Community Feed', route: '/community', icon: 'forum' },
    { label: 'QR Check-in', route: '/attendance/qr', icon: 'qr_code_scanner' },
    { label: 'Settings & Security', route: '/settings/security', icon: 'security' },
  ];

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
