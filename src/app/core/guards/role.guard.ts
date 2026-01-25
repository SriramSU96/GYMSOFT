import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
    return (route, state) => {
        const authService = inject(AuthService);
        const router = inject(Router);
        const toastService = inject(ToastService);

        const currentUser = authService.currentUserValue;

        if (!currentUser) {
            router.navigate(['/login']);
            return false;
        }

        if (allowedRoles.includes(currentUser.role)) {
            return true;
        } else {
            toastService.error('You do not have permission to access this page');
            router.navigate(['/dashboard']);
            return false;
        }
    };
}
