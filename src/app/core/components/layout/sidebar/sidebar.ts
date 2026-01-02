import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-sidebar',
  standalone: true, // Auto-scaffolded usually, but ensuring
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html'
})
export class Sidebar {
  private authService = inject(AuthService);
  private router = inject(Router);
  store = inject(Store);

  currentUser$ = this.store.select(selectUser);

  menuItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Members', route: '/members', icon: 'people' },
    { label: 'Staff', route: '/staff', icon: 'badge' },
    { label: 'Payments', route: '/payments', icon: 'payments' },
    { label: 'Invoices', route: '/invoices', icon: 'receipt' },
    { label: 'Attendance', route: '/attendance', icon: 'qr_code_scanner' },
    { label: 'Reports', route: '/reports', icon: 'analytics' },
    { label: 'Community', route: '/community', icon: 'forum' },
    { label: 'Security', route: '/security', icon: 'security' },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
