import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================
// ACCOUNT SECURITY COMPONENT
// Bank-Grade Security Management
// ============================================

@Component({
    selector: 'app-account-security',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './account-security.component.html',
    styleUrls: ['./account-security.component.css']
})
export class AccountSecurityComponent implements OnInit {
    // ============================================
    // CURRENT USER INFO
    // ============================================
    currentUser = {
        name: 'Admin User',
        email: 'admin@gymsoft.com',
        role: 'Super Admin',
        accountStatus: 'active' as 'active' | 'suspended'
    };

    // ============================================
    // SECTION 1: ACCOUNT OVERVIEW
    // ============================================
    accountOverview = {
        activeSessions: 3,
        lastLogin: '2026-01-23T16:30:00',
        accountStatus: 'active' as 'active' | 'suspended',
        role: 'Super Admin'
    };

    // ============================================
    // SECTION 2: ACTIVE SESSIONS
    // ============================================
    activeSessions = [
        {
            id: 'sess_001',
            device: 'Chrome on Windows 11',
            location: '192.168.1.100',
            city: 'Mumbai, India',
            lastActive: '2026-01-23T17:00:00',
            isCurrent: true
        },
        {
            id: 'sess_002',
            device: 'Safari on iPhone 14',
            location: '192.168.1.105',
            city: 'Mumbai, India',
            lastActive: '2026-01-23T14:30:00',
            isCurrent: false
        },
        {
            id: 'sess_003',
            device: 'Chrome on MacBook Pro',
            location: '192.168.1.110',
            city: 'Mumbai, India',
            lastActive: '2026-01-22T18:45:00',
            isCurrent: false
        }
    ];

    // ============================================
    // SECTION 3: LOGIN ACTIVITY
    // ============================================
    loginActivity = [
        {
            id: 'log_001',
            action: 'Login Successful',
            timestamp: '2026-01-23T16:30:00',
            ip: '192.168.1.100',
            device: 'Chrome on Windows 11',
            status: 'success' as 'success' | 'failed' | 'warning'
        },
        {
            id: 'log_002',
            action: 'Login Successful',
            timestamp: '2026-01-23T08:15:00',
            ip: '192.168.1.105',
            device: 'Safari on iPhone 14',
            status: 'success' as 'success' | 'failed' | 'warning'
        },
        {
            id: 'log_003',
            action: 'Failed Login Attempt',
            timestamp: '2026-01-22T22:30:00',
            ip: '203.45.67.89',
            device: 'Unknown',
            status: 'failed' as 'success' | 'failed' | 'warning'
        },
        {
            id: 'log_004',
            action: 'Password Changed',
            timestamp: '2026-01-22T18:45:00',
            ip: '192.168.1.110',
            device: 'Chrome on MacBook Pro',
            status: 'warning' as 'success' | 'failed' | 'warning'
        },
        {
            id: 'log_005',
            action: 'Login Successful',
            timestamp: '2026-01-22T09:00:00',
            ip: '192.168.1.100',
            device: 'Chrome on Windows 11',
            status: 'success' as 'success' | 'failed' | 'warning'
        }
    ];

    // ============================================
    // SECTION 4: PASSWORD & AUTH SETTINGS
    // ============================================
    passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    passwordStrength = 0;
    twoFactorEnabled = false;

    // ============================================
    // SECTION 5: ROLE & PERMISSIONS
    // ============================================
    availableRoles = ['Super Admin', 'Admin', 'Manager', 'Trainer', 'Receptionist'];
    selectedRole = 'Super Admin';

    permissions = [
        { module: 'Members', view: true, create: true, edit: true, delete: true },
        { module: 'Payments', view: true, create: true, edit: true, delete: false },
        { module: 'Reports', view: true, create: false, edit: false, delete: false },
        { module: 'Staff', view: true, create: true, edit: true, delete: true },
        { module: 'Settings', view: true, create: false, edit: true, delete: false }
    ];

    // ============================================
    // SECTION 6: AUDIT LOG
    // ============================================
    auditLogs = [
        {
            id: 'audit_001',
            user: 'Admin User',
            action: 'Updated member profile',
            module: 'Members',
            timestamp: '2026-01-23T16:45:00',
            details: 'Modified Rajesh Kumar (M1001)'
        },
        {
            id: 'audit_002',
            user: 'Manager User',
            action: 'Created payment',
            module: 'Payments',
            timestamp: '2026-01-23T15:30:00',
            details: 'Payment ID: PAY12345'
        },
        {
            id: 'audit_003',
            user: 'Admin User',
            action: 'Changed user role',
            module: 'Settings',
            timestamp: '2026-01-23T14:15:00',
            details: 'Changed Trainer role to Senior Trainer'
        },
        {
            id: 'audit_004',
            user: 'Receptionist User',
            action: 'Checked in member',
            module: 'Attendance',
            timestamp: '2026-01-23T12:00:00',
            details: 'Member: Priya Sharma (M1002)'
        },
        {
            id: 'audit_005',
            user: 'Admin User',
            action: 'Exported report',
            module: 'Reports',
            timestamp: '2026-01-23T10:30:00',
            details: 'Finance Report - January 2026'
        }
    ];

    auditFilters = {
        dateFrom: '',
        dateTo: '',
        actionType: 'all',
        user: 'all'
    };

    // ============================================
    // LIFECYCLE HOOKS
    // ============================================
    ngOnInit(): void {
        this.loadSecurityData();
    }

    // ============================================
    // DATA LOADING
    // ============================================
    loadSecurityData(): void {
        // TODO: Replace with actual API call
        console.log('Loading security data...');
    }

    // ============================================
    // SESSION MANAGEMENT
    // ============================================
    logoutSession(sessionId: string): void {
        if (confirm('Are you sure you want to logout this session?')) {
            this.activeSessions = this.activeSessions.filter(s => s.id !== sessionId);
            console.log(`Logged out session: ${sessionId}`);
            // TODO: API call to invalidate session
        }
    }

    logoutAllDevices(): void {
        if (confirm('Are you sure you want to logout from all devices except this one?')) {
            this.activeSessions = this.activeSessions.filter(s => s.isCurrent);
            console.log('Logged out all other sessions');
            // TODO: API call to invalidate all sessions
        }
    }

    // ============================================
    // PASSWORD MANAGEMENT
    // ============================================
    calculatePasswordStrength(): void {
        const password = this.passwordForm.newPassword;
        let strength = 0;

        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 10;

        this.passwordStrength = Math.min(strength, 100);
    }

    changePassword(): void {
        if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (this.passwordStrength < 50) {
            alert('Password is too weak. Please choose a stronger password.');
            return;
        }

        console.log('Changing password...');
        // TODO: API call to change password
        alert('Password changed successfully!');
        this.passwordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
        this.passwordStrength = 0;
    }

    toggle2FA(): void {
        this.twoFactorEnabled = !this.twoFactorEnabled;
        console.log(`2FA ${this.twoFactorEnabled ? 'enabled' : 'disabled'}`);
        // TODO: API call to enable/disable 2FA
    }

    // ============================================
    // ROLE & PERMISSIONS
    // ============================================
    onRoleChange(): void {
        console.log(`Role changed to: ${this.selectedRole}`);
        // TODO: Load permissions for selected role
    }

    togglePermission(module: string, permission: 'view' | 'create' | 'edit' | 'delete'): void {
        const perm = this.permissions.find(p => p.module === module);
        if (perm) {
            perm[permission] = !perm[permission];
        }
    }

    savePermissions(): void {
        if (confirm('Are you sure you want to save these permission changes? This action will be audited.')) {
            console.log('Saving permissions:', this.permissions);
            // TODO: API call to save permissions
            alert('Permissions saved successfully!');
        }
    }

    // ============================================
    // AUDIT LOG
    // ============================================
    applyAuditFilters(): void {
        console.log('Applying audit filters:', this.auditFilters);
        // TODO: API call to filter audit logs
    }

    clearAuditFilters(): void {
        this.auditFilters = {
            dateFrom: '',
            dateTo: '',
            actionType: 'all',
            user: 'all'
        };
        this.applyAuditFilters();
    }

    // ============================================
    // ACCOUNT CONTROL
    // ============================================
    suspendAccount(): void {
        if (confirm('Are you sure you want to suspend this account? This action will be audited.')) {
            this.accountOverview.accountStatus = 'suspended';
            console.log('Account suspended');
            // TODO: API call to suspend account
            alert('Account suspended successfully!');
        }
    }

    reactivateAccount(): void {
        if (confirm('Are you sure you want to reactivate this account?')) {
            this.accountOverview.accountStatus = 'active';
            console.log('Account reactivated');
            // TODO: API call to reactivate account
            alert('Account reactivated successfully!');
        }
    }

    // ============================================
    // HELPER METHODS
    // ============================================
    getStatusClass(status: 'active' | 'suspended'): string {
        return status === 'active' ? 'status-active' : 'status-suspended';
    }

    getStatusLabel(status: 'active' | 'suspended'): string {
        return status === 'active' ? 'Active' : 'Suspended';
    }

    getActivityStatusClass(status: 'success' | 'failed' | 'warning'): string {
        return `activity-${status}`;
    }

    getActivityIcon(status: 'success' | 'failed' | 'warning'): string {
        const icons = {
            success: 'check_circle',
            failed: 'error',
            warning: 'warning'
        };
        return icons[status];
    }

    getPasswordStrengthClass(): string {
        if (this.passwordStrength >= 75) return 'strength-strong';
        if (this.passwordStrength >= 50) return 'strength-medium';
        return 'strength-weak';
    }

    getPasswordStrengthLabel(): string {
        if (this.passwordStrength >= 75) return 'Strong';
        if (this.passwordStrength >= 50) return 'Medium';
        if (this.passwordStrength > 0) return 'Weak';
        return '';
    }

    formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
    }
}
