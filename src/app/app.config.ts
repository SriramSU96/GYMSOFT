import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './core/store/auth/auth.reducer';
import { AuthEffects } from './core/store/auth/auth.effects';
import { memberReducer } from './core/store/members/member.reducer';
import { MemberEffects } from './core/store/members/member.effects';
import { reportReducer } from './core/store/reports/report.reducer';
import { ReportEffects } from './core/store/reports/report.effects';
import { couponReducer } from './core/store/coupons/coupon.reducer';
import { CouponEffects } from './core/store/coupons/coupon.effects';
import { invoiceReducer } from './core/store/invoices/invoice.reducer';
import { InvoiceEffects } from './core/store/invoices/invoice.effects';
import { paymentReducer } from './core/store/payments/payment.reducer';
import { PaymentEffects } from './core/store/payments/payment.effects';
import { attendanceReducer } from './core/store/attendance/attendance.reducer';
import { AttendanceEffects } from './core/store/attendance/attendance.effects';
import { notificationReducer } from './core/store/notifications/notification.reducer';
import { NotificationEffects } from './core/store/notifications/notification.effects';
import { staffReducer } from './core/store/staff/staff.reducer';
import { StaffEffects } from './core/store/staff/staff.effects';
import { analyticsReducer } from './core/store/analytics/analytics.reducer';
import { AnalyticsEffects } from './core/store/analytics/analytics.effects';
import { securityReducer } from './core/store/security/security.reducer';
import { SecurityEffects } from './core/store/security/security.effects';
import { communityReducer } from './core/store/community/community.reducer';
import { CommunityEffects } from './core/store/community/community.effects';
import { gymReducer } from './core/store/gyms/gym.reducer';
import { GymEffects } from './core/store/gyms/gym.effects';
import { exerciseReducer } from './core/store/exercises/exercise.reducer';
import { ExerciseEffects } from './core/store/exercises/exercise.effects';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: authReducer,
      members: memberReducer,
      reports: reportReducer,
      coupons: couponReducer,
      invoices: invoiceReducer,
      payments: paymentReducer,
      attendance: attendanceReducer,
      notifications: notificationReducer,
      staff: staffReducer,
      analytics: analyticsReducer,
      security: securityReducer,
      community: communityReducer,
      gyms: gymReducer,
      exercises: exerciseReducer
    }),
    provideEffects(
      AuthEffects,
      MemberEffects,
      ReportEffects,
      CouponEffects,
      InvoiceEffects,
      PaymentEffects,
      AttendanceEffects,
      NotificationEffects,
      StaffEffects,
      AnalyticsEffects,
      SecurityEffects,
      CommunityEffects,
      GymEffects,
      ExerciseEffects
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
