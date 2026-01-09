import { Routes } from '@angular/router';
import { MainLayoutComponent as MainLayout } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { Dashboard } from './pages/dashboard/dashboard';
import { MemberDashboardComponent } from './pages/members/dashboard/member-dashboard.component';
import { MemberList } from './pages/members/member-list/member-list';
import { MemberAdd } from './pages/members/member-add/member-add';
import { MemberDetail } from './pages/members/member-detail/member-detail';
import { AssignedWorkoutsComponent } from './pages/members/assigned-workouts/assigned-workouts.component';
import { MemberDietPlansComponent } from './pages/members/member-diet-plans/member-diet-plans.component';
import { MemberProgressComponent } from './pages/members/member-progress/member-progress.component';
import { StaffList } from './pages/staff/staff-list/staff-list';
import { StaffAdd } from './pages/staff/staff-add/staff-add';
import { StaffAttendance } from './pages/staff/staff-attendance/staff-attendance';
import { SalaryManagement } from './pages/staff/salary-management/salary-management';
import { PaymentList } from './pages/payments/payment-list/payment-list';
import { PendingDuesComponent } from './pages/payments/pending-dues/pending-dues.component';
import { InvoiceGenerator } from './pages/payments/invoice-generator/invoice-generator';
import { CouponComponent } from './pages/payments/coupons/coupon.component';
import { InvoiceComponent } from './pages/payments/invoice/invoice.component';
import { ProfitLossComponent } from './pages/payments/profit-loss/profit-loss.component';
import { QrCheckinComponent } from './pages/attendance/qr-checkin/qr-checkin.component';
import { AttendanceLog } from './pages/attendance/attendance-log/attendance-log';
import { Reports } from './pages/reports/reports/reports';
import { AnalyticsDashboard } from './pages/analytics/analytics-dashboard/analytics-dashboard';
import { AdvancedAnalyticsComponent } from './pages/analytics/advanced/advanced-analytics.component';
import { CommunityFeed } from './pages/community/community-feed/community-feed';
import { ChallengeList } from './pages/community/challenge-list/challenge-list';
import { AuditLog } from './pages/security/audit-log/audit-log';
import { RoleManagement } from './pages/security/role-management/role-management';
import { SecurityComponent } from './pages/settings/security/security.component';

// Workouts & Diets
import { WorkoutBuilder } from './pages/workouts/workout-builder/workout-builder.component';
import { DietBuilder } from './pages/workouts/diet-builder/diet-builder.component';
import { PlanAssignment } from './pages/workouts/plan-assignment/plan-assignment.component';
import { MyWorkout } from './pages/members/my-workout/my-workout.component';
import { MyDiet } from './pages/members/my-diet/my-diet.component';

// Inventory & POS
import { ProductList } from './pages/inventory/product-list/product-list.component';
import { PosTerminal } from './pages/inventory/pos-terminal/pos-terminal.component';
import { SalesReport } from './pages/inventory/sales-report/sales-report.component';

// Classes
import { ClassList } from './pages/classes/class-list/class-list.component';
import { ClassCalendar } from './pages/classes/class-calendar/class-calendar.component';
import { MyBookings } from './pages/classes/my-bookings/my-bookings.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },

            // Members
            { path: 'members', component: MemberList },
            { path: 'members/add', component: MemberAdd },
            { path: 'members/workouts', component: AssignedWorkoutsComponent },
            { path: 'members/diet-plans', component: MemberDietPlansComponent },
            { path: 'members/progress', component: MemberProgressComponent },
            { path: 'members/:id', component: MemberDetail },
            { path: 'my-dashboard', component: MemberDashboardComponent },

            // Staff
            { path: 'staff', component: StaffList },
            { path: 'staff/add', component: StaffAdd },
            { path: 'staff/attendance', component: StaffAttendance },
            { path: 'staff/salary', component: SalaryManagement },

            // Payments & Invoices
            { path: 'payments', component: PaymentList },
            { path: 'payments/pending', component: PendingDuesComponent },
            { path: 'payments/profit-loss', component: ProfitLossComponent },
            { path: 'invoices/create', component: InvoiceGenerator },
            { path: 'invoices/:id', component: InvoiceComponent },
            { path: 'coupons', component: CouponComponent },

            // Attendance
            { path: 'attendance/qr', component: QrCheckinComponent },
            { path: 'attendance/logs', component: AttendanceLog },

            // Reports & Analytics
            { path: 'reports', component: Reports },
            { path: 'analytics', component: AnalyticsDashboard },
            { path: 'analytics/advanced', component: AdvancedAnalyticsComponent },

            // Community
            { path: 'community', component: CommunityFeed },
            { path: 'community/challenges', component: ChallengeList },

            // Security
            { path: 'security/logs', component: AuditLog },
            { path: 'security/roles', component: RoleManagement },

            // User Settings
            { path: 'settings/security', component: SecurityComponent },

            // Workouts & Diets
            { path: 'workouts/builder', component: WorkoutBuilder },
            { path: 'workouts/builder/:id', component: WorkoutBuilder },
            { path: 'diets/builder', component: DietBuilder },
            { path: 'diets/builder/:id', component: DietBuilder },
            { path: 'plans/assign', component: PlanAssignment },
            { path: 'my-workout', component: MyWorkout },
            { path: 'my-diet', component: MyDiet },

            // Inventory & POS
            { path: 'inventory/products', component: ProductList },
            { path: 'inventory/pos', component: PosTerminal },
            { path: 'inventory/sales', component: SalesReport },

            // Classes
            { path: 'classes/list', component: ClassList },
            { path: 'classes/calendar', component: ClassCalendar },
            { path: 'my-bookings', component: MyBookings }
        ]
    },
    { path: '**', redirectTo: '' }
];
