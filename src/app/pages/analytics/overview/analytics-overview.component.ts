import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================
// ANALYTICS OVERVIEW COMPONENT
// Enterprise-Level Dashboard for Gym SaaS
// ============================================

@Component({
    selector: 'app-analytics-overview',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './analytics-overview.component.html',
    styleUrls: ['./analytics-overview.component.css']
})
export class AnalyticsOverviewComponent implements OnInit {
    protected Math = Math;
    // ============================================
    // TIME RANGE SELECTION
    // ============================================
    selectedRange: '30d' | '3m' | '6m' | '1y' = '30d';

    timeRanges = [
        { value: '30d', label: 'Last 30 Days' },
        { value: '3m', label: 'Last 3 Months' },
        { value: '6m', label: 'Last 6 Months' },
        { value: '1y', label: 'Last Year' }
    ];

    // ============================================
    // KPI SUMMARY DATA
    // ============================================
    kpiData = {
        totalMembers: {
            value: 1247,
            change: 12.5,
            trend: 'up' as 'up' | 'down'
        },
        activeMembers: {
            value: 1089,
            change: 8.3,
            trend: 'up' as 'up' | 'down'
        },
        totalRevenue: {
            value: 2847500,
            change: 15.2,
            trend: 'up' as 'up' | 'down'
        },
        pendingDues: {
            value: 125000,
            change: -5.4,
            trend: 'down' as 'up' | 'down'
        },
        attendanceRate: {
            value: 87.3,
            change: 3.1,
            trend: 'up' as 'up' | 'down'
        }
    };

    // ============================================
    // ATTENDANCE TREND DATA (Line Chart)
    // ============================================
    attendanceTrendData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [245, 289, 312, 298, 276, 198, 156],
        maxValue: 350
    };

    // ============================================
    // REVENUE BREAKDOWN DATA (Bar Chart)
    // ============================================
    revenueBreakdownData = [
        { category: 'Membership', amount: 1847500, percentage: 64.9, color: '#D4AF37' },
        { category: 'POS Sales', amount: 685000, percentage: 24.1, color: '#10B981' },
        { category: 'Personal Training', amount: 315000, percentage: 11.0, color: '#3B82F6' }
    ];

    // ============================================
    // REVENUE TREND DATA (Line Chart)
    // ============================================
    revenueTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [2100000, 2250000, 2400000, 2550000, 2700000, 2847500],
        maxValue: 3000000
    };

    // ============================================
    // ENGAGEMENT METRICS
    // ============================================
    engagementData = {
        workoutPlanCoverage: {
            value: 78.5,
            total: 1247,
            covered: 979
        },
        dietPlanCoverage: {
            value: 65.2,
            total: 1247,
            covered: 813
        },
        workoutCompletion: {
            value: 82.7,
            total: 979,
            completed: 809
        }
    };

    // ============================================
    // STAFF PERFORMANCE DATA
    // ============================================
    staffData = {
        totalStaff: 24,
        attendanceRate: 91.7,
        topPerformer: {
            name: 'Rajesh Kumar',
            role: 'Senior Trainer',
            rating: 4.9,
            sessionsCompleted: 156
        }
    };

    // ============================================
    // DATA AVAILABILITY FLAG
    // ============================================
    hasData = true;

    // ============================================
    // LIFECYCLE HOOKS
    // ============================================
    ngOnInit(): void {
        this.loadAnalyticsData();
    }

    // ============================================
    // TIME RANGE FILTER
    // ============================================
    onRangeChange(range: any): void {
        this.selectedRange = range;
        this.loadAnalyticsData();
    }

    // ============================================
    // DATA LOADING (API-Ready Structure)
    // ============================================
    loadAnalyticsData(): void {
        // TODO: Replace with actual API call
        // Example: this.analyticsService.getOverview(this.selectedRange).subscribe(data => {...})

        console.log(`Loading analytics data for range: ${this.selectedRange}`);

        // Simulate data loading
        // In production, this would fetch from backend API
    }

    // ============================================
    // CHART HELPERS
    // ============================================

    // Calculate bar height percentage for attendance chart
    getAttendanceBarHeight(value: number): number {
        return (value / this.attendanceTrendData.maxValue) * 100;
    }

    // Calculate bar height percentage for revenue chart
    getRevenueBarHeight(value: number): number {
        return (value / this.revenueTrendData.maxValue) * 100;
    }

    // Get SVG path for line chart
    getLineChartPath(data: number[], maxValue: number, width: number, height: number): string {
        if (data.length === 0) return '';

        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value / maxValue) * height;
            return `${x},${y}`;
        });

        return `M ${points.join(' L ')}`;
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
    // TREND INDICATORS
    // ============================================
    getTrendClass(trend: 'up' | 'down'): string {
        return trend === 'up' ? 'text-success' : 'text-danger';
    }

    getTrendIcon(trend: 'up' | 'down'): string {
        return trend === 'up' ? 'trending_up' : 'trending_down';
    }
}
