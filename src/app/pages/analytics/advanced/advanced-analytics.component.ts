import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../core/pipes/filter.pipe';

// ============================================
// ADVANCED ANALYTICS COMPONENT
// Enterprise Business Intelligence Dashboard
// ============================================

@Component({
    selector: 'app-advanced-analytics',
    standalone: true,
    imports: [CommonModule, FormsModule, FilterPipe],
    templateUrl: './advanced-analytics.component.html',
    styleUrls: ['./advanced-analytics.component.css']
})
export class AdvancedAnalyticsComponent implements OnInit {
    protected Math = Math;
    // ============================================
    // TIME RANGE SELECTION
    // ============================================
    selectedRange: '30d' | '3m' | '6m' | '1y' = '3m';

    timeRanges = [
        { value: '30d', label: 'Last 30 Days' },
        { value: '3m', label: 'Last 3 Months' },
        { value: '6m', label: 'Last 6 Months' },
        { value: '1y', label: 'Last Year' }
    ];

    // ============================================
    // SECTION 1: CHURN & RETENTION
    // ============================================
    churnRetentionData = {
        churnRate: {
            value: 8.5,
            change: -2.3,
            trend: 'down' as 'up' | 'down',
            severity: 'warning' as 'success' | 'warning' | 'danger'
        },
        retentionRate: {
            value: 91.5,
            change: 2.3,
            trend: 'up' as 'up' | 'down',
            severity: 'success' as 'success' | 'warning' | 'danger'
        },
        highRiskMembers: [
            {
                id: 'M1234',
                name: 'Amit Sharma',
                lastVisit: '2026-01-10',
                daysInactive: 13,
                membershipValue: 15000,
                riskScore: 85,
                severity: 'danger' as 'warning' | 'danger'
            },
            {
                id: 'M2456',
                name: 'Priya Patel',
                lastVisit: '2026-01-15',
                daysInactive: 8,
                membershipValue: 12000,
                riskScore: 72,
                severity: 'danger' as 'warning' | 'danger'
            },
            {
                id: 'M3789',
                name: 'Rahul Verma',
                lastVisit: '2026-01-17',
                daysInactive: 6,
                membershipValue: 18000,
                riskScore: 58,
                severity: 'warning' as 'warning' | 'danger'
            },
            {
                id: 'M4512',
                name: 'Sneha Reddy',
                lastVisit: '2026-01-18',
                daysInactive: 5,
                membershipValue: 10000,
                riskScore: 54,
                severity: 'warning' as 'warning' | 'danger'
            }
        ]
    };

    // ============================================
    // SECTION 2: COHORT ANALYSIS
    // ============================================
    cohortData = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        cohorts: [
            { month: 'Jan 2026', m0: 100, m1: 92, m2: 87, m3: 83, m4: 80, m5: 78 },
            { month: 'Feb 2026', m0: 100, m1: 94, m2: 89, m3: 85, m4: 82, m5: null },
            { month: 'Mar 2026', m0: 100, m1: 91, m2: 86, m3: 82, m4: null, m5: null },
            { month: 'Apr 2026', m0: 100, m1: 93, m2: 88, m3: null, m4: null, m5: null },
            { month: 'May 2026', m0: 100, m1: 95, m2: null, m3: null, m4: null, m5: null },
            { month: 'Jun 2026', m0: 100, m1: null, m2: null, m3: null, m4: null, m5: null }
        ]
    };

    // ============================================
    // SECTION 3: ATTENDANCE INTELLIGENCE
    // ============================================
    attendanceIntelligence = {
        peakHours: [
            { hour: '6 AM', count: 145, percentage: 18.5 },
            { hour: '7 AM', count: 189, percentage: 24.1 },
            { hour: '8 AM', count: 156, percentage: 19.9 },
            { hour: '6 PM', count: 198, percentage: 25.3 },
            { hour: '7 PM', count: 167, percentage: 21.3 },
            { hour: '8 PM', count: 123, percentage: 15.7 }
        ],
        weeklyHeatmap: [
            { day: 'Mon', morning: 85, afternoon: 45, evening: 92 },
            { day: 'Tue', morning: 88, afternoon: 42, evening: 95 },
            { day: 'Wed', morning: 82, afternoon: 48, evening: 89 },
            { day: 'Thu', morning: 90, afternoon: 50, evening: 98 },
            { day: 'Fri', morning: 78, afternoon: 52, evening: 85 },
            { day: 'Sat', morning: 65, afternoon: 58, evening: 62 },
            { day: 'Sun', morning: 48, afternoon: 45, evening: 50 }
        ],
        lowTrafficAlerts: [
            { period: 'Weekday Afternoons', avgAttendance: 47, capacity: 150, utilization: 31.3 },
            { period: 'Sunday Mornings', avgAttendance: 48, capacity: 150, utilization: 32.0 }
        ]
    };

    // ============================================
    // SECTION 4: PLAN PERFORMANCE
    // ============================================
    planPerformance = {
        workoutPlans: [
            { name: 'Strength Training', effectiveness: 87, retention: 92, members: 345 },
            { name: 'Weight Loss', effectiveness: 82, retention: 88, members: 289 },
            { name: 'Cardio Focus', effectiveness: 78, retention: 85, members: 198 },
            { name: 'Muscle Building', effectiveness: 85, retention: 90, members: 267 }
        ],
        dietPlans: [
            { name: 'High Protein', compliance: 76, retention: 89, members: 412 },
            { name: 'Keto', compliance: 68, retention: 82, members: 156 },
            { name: 'Balanced', compliance: 82, retention: 91, members: 298 },
            { name: 'Vegan', compliance: 71, retention: 85, members: 134 }
        ]
    };

    // ============================================
    // SECTION 5: REVENUE INTELLIGENCE
    // ============================================
    revenueIntelligence = {
        ltvPerMember: {
            value: 45600,
            change: 12.8,
            trend: 'up' as 'up' | 'down'
        },
        revenueBreakdown: [
            { source: 'Membership Fees', amount: 1847500, percentage: 64.9 },
            { source: 'POS Sales', amount: 685000, percentage: 24.1 },
            { source: 'Personal Training', amount: 315000, percentage: 11.0 }
        ],
        topRevenueMembers: [
            { id: 'M7891', name: 'Vikram Singh', totalSpent: 125000, avgMonthly: 15625, tier: 'Platinum' },
            { id: 'M5623', name: 'Anjali Mehta', totalSpent: 98000, avgMonthly: 12250, tier: 'Gold' },
            { id: 'M8934', name: 'Karthik Iyer', totalSpent: 87500, avgMonthly: 10937, tier: 'Gold' },
            { id: 'M4567', name: 'Neha Gupta', totalSpent: 76000, avgMonthly: 9500, tier: 'Silver' }
        ]
    };

    // ============================================
    // SECTION 6: STAFF PERFORMANCE
    // ============================================
    staffPerformance = {
        staffMetrics: [
            {
                name: 'Rajesh Kumar',
                role: 'Senior Trainer',
                attendance: 96.5,
                salesContribution: 285000,
                rating: 4.9,
                rank: 1
            },
            {
                name: 'Priya Sharma',
                role: 'Trainer',
                attendance: 94.2,
                salesContribution: 245000,
                rating: 4.7,
                rank: 2
            },
            {
                name: 'Amit Patel',
                role: 'Trainer',
                attendance: 92.8,
                salesContribution: 198000,
                rating: 4.6,
                rank: 3
            },
            {
                name: 'Sneha Reddy',
                role: 'Nutritionist',
                attendance: 91.5,
                salesContribution: 167000,
                rating: 4.5,
                rank: 4
            }
        ]
    };

    // ============================================
    // SECTION 7: ACTIONABLE INSIGHTS
    // ============================================
    actionableInsights = [
        {
            severity: 'danger' as 'success' | 'warning' | 'danger',
            title: 'High Churn Risk Detected',
            description: '4 high-value members inactive for 5+ days',
            action: 'Send personalized re-engagement campaign',
            impact: 'Potential revenue loss: ₹55,000'
        },
        {
            severity: 'warning' as 'success' | 'warning' | 'danger',
            title: 'Low Afternoon Utilization',
            description: 'Only 31% capacity during weekday afternoons',
            action: 'Launch afternoon discount promotion',
            impact: 'Potential 40% increase in off-peak revenue'
        },
        {
            severity: 'success' as 'success' | 'warning' | 'danger',
            title: 'Strong Retention in Strength Training',
            description: '92% retention rate, highest among all plans',
            action: 'Promote as flagship program in marketing',
            impact: 'Leverage success to attract new members'
        },
        {
            severity: 'warning' as 'success' | 'warning' | 'danger',
            title: 'Diet Plan Compliance Below Target',
            description: 'Average compliance at 74%, target is 80%',
            action: 'Implement weekly check-ins and meal prep workshops',
            impact: 'Improve retention by estimated 5-7%'
        }
    ];

    // ============================================
    // SECTION 8: AI PREDICTIONS (Churn Risk)
    // ============================================
    aiPredictions = {
        churnRiskMembers: [
            {
                id: 'M8821',
                name: 'Rohit Malhotra',
                riskScore: 92,
                riskLevel: 'high' as 'low' | 'medium' | 'high',
                reason: 'No attendance for 14 days, membership expires in 10 days',
                suggestedAction: 'Call immediately with renewal offer + 1 free PT session',
                membershipValue: 18000,
                daysInactive: 14
            },
            {
                id: 'M7654',
                name: 'Kavita Desai',
                riskScore: 78,
                riskLevel: 'high' as 'low' | 'medium' | 'high',
                reason: 'Attendance dropped 60% in last 2 weeks',
                suggestedAction: 'Send personalized workout plan + check-in call',
                membershipValue: 15000,
                daysInactive: 8
            },
            {
                id: 'M9123',
                name: 'Arjun Nair',
                riskScore: 65,
                riskLevel: 'medium' as 'low' | 'medium' | 'high',
                reason: 'Skipped 3 scheduled PT sessions',
                suggestedAction: 'Trainer to reach out and reschedule',
                membershipValue: 22000,
                daysInactive: 5
            },
            {
                id: 'M5432',
                name: 'Meera Kapoor',
                riskScore: 58,
                riskLevel: 'medium' as 'low' | 'medium' | 'high',
                reason: 'Only using gym during off-peak hours',
                suggestedAction: 'Offer group class trial during preferred time',
                membershipValue: 12000,
                daysInactive: 3
            },
            {
                id: 'M6789',
                name: 'Sanjay Rao',
                riskScore: 42,
                riskLevel: 'low' as 'low' | 'medium' | 'high',
                reason: 'Consistent attendance but no diet plan',
                suggestedAction: 'Upsell nutrition consultation',
                membershipValue: 10000,
                daysInactive: 0
            }
        ]
    };

    // ============================================
    // SECTION 9: FORECASTING
    // ============================================
    forecasting = {
        attendanceForecast: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            actual: [245, 289, 312, 298, 276, null, null],
            predicted: [null, null, null, null, null, 198, 156],
            trend: [245, 289, 312, 298, 276, 198, 156],
            maxValue: 350
        },
        revenueForecast: {
            currentMonth: 2847500,
            predictedMonthEnd: 3125000,
            confidence: 87,
            trend: 'up' as 'up' | 'down',
            change: 9.7
        }
    };

    // ============================================
    // SECTION 10: AUTOMATED ALERTS
    // ============================================
    automatedAlerts = [
        {
            id: 'ALT001',
            severity: 'critical' as 'critical' | 'warning' | 'info',
            title: 'High-Value Member Inactive',
            message: 'Rohit Malhotra (₹18K/year) has not visited in 14 days',
            timestamp: '2026-01-23T10:30:00',
            status: 'sent' as 'sent' | 'pending',
            action: 'Renewal call scheduled',
            emoji: '🔴'
        },
        {
            id: 'ALT002',
            severity: 'critical' as 'critical' | 'warning' | 'info',
            title: 'Equipment Maintenance Due',
            message: 'Treadmill #3 requires servicing (2000+ hours)',
            timestamp: '2026-01-23T09:15:00',
            status: 'pending' as 'sent' | 'pending',
            action: 'Schedule technician visit',
            emoji: '🔴'
        },
        {
            id: 'ALT003',
            severity: 'warning' as 'critical' | 'warning' | 'info',
            title: 'Low Afternoon Attendance',
            message: 'Only 32% capacity during 2-5 PM this week',
            timestamp: '2026-01-23T08:00:00',
            status: 'sent' as 'sent' | 'pending',
            action: 'Launch afternoon discount campaign',
            emoji: '🟠'
        },
        {
            id: 'ALT004',
            severity: 'warning' as 'critical' | 'warning' | 'info',
            title: 'Staff Attendance Below Target',
            message: 'Amit Patel missed 2 shifts this week',
            timestamp: '2026-01-22T18:45:00',
            status: 'sent' as 'sent' | 'pending',
            action: 'HR follow-up completed',
            emoji: '🟠'
        },
        {
            id: 'ALT005',
            severity: 'info' as 'critical' | 'warning' | 'info',
            title: 'Membership Renewals Due',
            message: '12 memberships expiring in next 7 days',
            timestamp: '2026-01-22T07:00:00',
            status: 'sent' as 'sent' | 'pending',
            action: 'Renewal reminders sent',
            emoji: '🔵'
        },
        {
            id: 'ALT006',
            severity: 'info' as 'critical' | 'warning' | 'info',
            title: 'Revenue Milestone Achieved',
            message: 'Monthly revenue crossed ₹28L target',
            timestamp: '2026-01-21T16:30:00',
            status: 'sent' as 'sent' | 'pending',
            action: 'Team celebration planned',
            emoji: '🔵'
        }
    ];

    // ============================================
    // SECTION 11: MULTI-GYM COMPARISON
    // ============================================
    multiGymComparison = {
        gyms: [
            {
                id: 'GYM001',
                name: 'Downtown Branch',
                members: 1247,
                revenue: 2847500,
                attendanceRate: 87.3,
                churnRate: 8.5,
                performance: 'best' as 'best' | 'good' | 'weak'
            },
            {
                id: 'GYM002',
                name: 'Suburb Branch',
                members: 892,
                revenue: 1985000,
                attendanceRate: 82.1,
                churnRate: 9.8,
                performance: 'good' as 'best' | 'good' | 'weak'
            },
            {
                id: 'GYM003',
                name: 'North Branch',
                members: 1105,
                revenue: 2456000,
                attendanceRate: 85.7,
                churnRate: 7.2,
                performance: 'good' as 'best' | 'good' | 'weak'
            },
            {
                id: 'GYM004',
                name: 'East Branch',
                members: 654,
                revenue: 1423000,
                attendanceRate: 74.5,
                churnRate: 12.3,
                performance: 'weak' as 'best' | 'good' | 'weak'
            }
        ],
        totals: {
            members: 3898,
            revenue: 8711500,
            avgAttendance: 82.4,
            avgChurn: 9.5
        }
    };


    // ============================================
    // LIFECYCLE HOOKS
    // ============================================
    ngOnInit(): void {
        this.loadAdvancedAnalytics();
    }

    // ============================================
    // TIME RANGE FILTER
    // ============================================
    onRangeChange(range: any): void {
        this.selectedRange = range;
        this.loadAdvancedAnalytics();
    }

    // ============================================
    // DATA LOADING (API-Ready Structure)
    // ============================================
    loadAdvancedAnalytics(): void {
        // TODO: Replace with actual API call
        // Example: this.analyticsService.getAdvanced(this.selectedRange).subscribe(data => {...})

        console.log(`Loading advanced analytics for range: ${this.selectedRange}`);
    }

    // ============================================
    // COHORT HEATMAP HELPERS
    // ============================================
    getCohortValue(cohort: any, monthIndex: number): number | null {
        const key = `m${monthIndex}` as keyof typeof cohort;
        return cohort[key] as number | null;
    }

    getCohortColor(value: number | null): string {
        if (value === null) return 'transparent';
        if (value >= 90) return '#10B981'; // Green
        if (value >= 80) return '#F59E0B'; // Orange
        if (value >= 70) return '#EF4444'; // Red
        return '#7F1D1D'; // Dark red
    }

    getCohortIntensity(value: number | null): number {
        if (value === null) return 0;
        return value / 100;
    }

    // ============================================
    // PEAK HOURS HELPERS
    // ============================================
    getPeakHourHeight(percentage: number): number {
        return percentage;
    }

    getMaxPeakHour(): number {
        return Math.max(...this.attendanceIntelligence.peakHours.map(h => h.count));
    }

    // ============================================
    // HEATMAP HELPERS
    // ============================================
    getHeatmapColor(value: number): string {
        if (value >= 90) return 'rgba(16, 185, 129, 0.8)'; // Strong green
        if (value >= 75) return 'rgba(16, 185, 129, 0.5)'; // Medium green
        if (value >= 60) return 'rgba(245, 158, 11, 0.5)'; // Orange
        if (value >= 45) return 'rgba(239, 68, 68, 0.4)'; // Light red
        return 'rgba(239, 68, 68, 0.6)'; // Red
    }

    // ============================================
    // NUMBER FORMATTING
    // ============================================
    formatCurrency(value: number): string {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2)}Cr`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)}L`;
        } else if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }
        return `₹${value.toLocaleString('en-IN')}`;
    }

    formatNumber(value: number): string {
        return value.toLocaleString('en-IN');
    }

    formatPercentage(value: number): string {
        return `${value.toFixed(1)}%`;
    }

    // ============================================
    // SEVERITY & TREND HELPERS
    // ============================================
    getSeverityClass(severity: 'success' | 'warning' | 'danger'): string {
        return `severity-${severity}`;
    }

    getSeverityIcon(severity: 'success' | 'warning' | 'danger'): string {
        const icons = {
            success: 'check_circle',
            warning: 'warning',
            danger: 'error'
        };
        return icons[severity];
    }

    getTrendClass(trend: 'up' | 'down'): string {
        return trend === 'up' ? 'text-success' : 'text-danger';
    }

    getTrendIcon(trend: 'up' | 'down'): string {
        return trend === 'up' ? 'trending_up' : 'trending_down';
    }

    // ============================================
    // TIER BADGE HELPERS
    // ============================================
    getTierClass(tier: string): string {
        return `tier-${tier.toLowerCase()}`;
    }

    // ============================================
    // RANK BADGE HELPERS
    // ============================================
    getRankBadge(rank: number): string {
        const badges = ['🥇', '🥈', '🥉'];
        return badges[rank - 1] || `#${rank}`;
    }

    // ============================================
    // AI PREDICTIONS HELPERS
    // ============================================
    getRiskLevelClass(level: 'low' | 'medium' | 'high'): string {
        return `risk-${level}`;
    }

    getRiskLevelBadge(level: 'low' | 'medium' | 'high'): string {
        const badges = {
            low: 'Low Risk',
            medium: 'Medium Risk',
            high: 'High Risk'
        };
        return badges[level];
    }

    // ============================================
    // FORECASTING HELPERS
    // ============================================
    getForecastLineChartPath(data: (number | null)[], maxValue: number, width: number, height: number): string {
        const validPoints = data.map((value, index) => ({
            x: (index / (data.length - 1)) * width,
            y: value !== null ? height - (value / maxValue) * height : null,
            index
        })).filter(p => p.y !== null);

        if (validPoints.length === 0) return '';

        const points = validPoints.map(p => `${p.x},${p.y}`);
        return `M ${points.join(' L ')}`;
    }

    // ============================================
    // ALERTS HELPERS
    // ============================================
    getAlertSeverityClass(severity: 'critical' | 'warning' | 'info'): string {
        return `alert-${severity}`;
    }

    getAlertStatusClass(status: 'sent' | 'pending'): string {
        return `status-${status}`;
    }

    formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    }

    // ============================================
    // MULTI-GYM COMPARISON HELPERS
    // ============================================
    getPerformanceClass(performance: 'best' | 'good' | 'weak'): string {
        return `performance-${performance}`;
    }

    getPerformanceBadge(performance: 'best' | 'good' | 'weak'): string {
        const badges = {
            best: '🏆 Best',
            good: '✓ Good',
            weak: '⚠ Needs Attention'
        };
        return badges[performance];
    }
}
