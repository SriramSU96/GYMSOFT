import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================
// ATTENDANCE REPORTS COMPONENT
// Attendance Intelligence Dashboard
// ============================================

@Component({
    selector: 'app-attendance-reports',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './attendance-reports.component.html',
    styleUrls: ['./attendance-reports.component.css']
})
export class AttendanceReportsComponent implements OnInit {
    // ============================================
    // TIME RANGE SELECTION
    // ============================================
    selectedRange: '7d' | '30d' | '3m' | '6m' = '30d';

    timeRanges = [
        { value: '7d', label: 'Last 7 Days' },
        { value: '30d', label: 'Last 30 Days' },
        { value: '3m', label: 'Last 3 Months' },
        { value: '6m', label: 'Last 6 Months' }
    ];

    // ============================================
    // SECTION 1: SUMMARY CARDS
    // ============================================
    summaryData = {
        totalAttendance: 8945,
        avgDailyAttendance: 298,
        attendanceChange: 12.5,
        inactiveMembersCount: 158
    };

    // ============================================
    // SECTION 2: ATTENDANCE TRENDS
    // ============================================
    attendanceTrends = {
        dailyAttendance: [
            { date: '2026-01-17', count: 285 },
            { date: '2026-01-18', count: 302 },
            { date: '2026-01-19', count: 278 },
            { date: '2026-01-20', count: 315 },
            { date: '2026-01-21', count: 295 },
            { date: '2026-01-22', count: 325 },
            { date: '2026-01-23', count: 290 }
        ],
        weekdayAttendance: [
            { day: 'Mon', count: 285, percentage: 91 },
            { day: 'Tue', count: 295, percentage: 94 },
            { day: 'Wed', count: 275, percentage: 88 },
            { day: 'Thu', count: 310, percentage: 99 },
            { day: 'Fri', count: 265, percentage: 85 },
            { day: 'Sat', count: 195, percentage: 62 },
            { day: 'Sun', count: 145, percentage: 46 }
        ]
    };

    // ============================================
    // SECTION 3: PEAK TIME HEATMAP
    // ============================================
    peakTimeHeatmap = {
        hours: ['6 AM', '7 AM', '8 AM', '9 AM', '5 PM', '6 PM', '7 PM', '8 PM'],
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [
            [85, 88, 82, 90, 78, 65, 48], // 6 AM
            [92, 95, 89, 98, 85, 70, 52], // 7 AM
            [78, 82, 75, 85, 72, 58, 45], // 8 AM
            [45, 48, 42, 50, 40, 35, 30], // 9 AM
            [65, 70, 62, 75, 58, 48, 40], // 5 PM
            [95, 98, 92, 100, 88, 75, 58], // 6 PM
            [88, 92, 85, 95, 82, 68, 52], // 7 PM
            [72, 75, 68, 80, 65, 55, 42]  // 8 PM
        ]
    };

    // ============================================
    // SECTION 4: MEMBER ATTENDANCE TABLE
    // ============================================
    memberAttendance = [
        {
            id: 'M1001',
            name: 'Rajesh Kumar',
            visits: 28,
            avgPerWeek: 6.5,
            lastVisit: '2026-01-23',
            consistencyScore: 95,
            status: 'regular' as 'regular' | 'irregular' | 'dormant'
        },
        {
            id: 'M1002',
            name: 'Priya Sharma',
            visits: 24,
            avgPerWeek: 5.5,
            lastVisit: '2026-01-22',
            consistencyScore: 88,
            status: 'regular' as 'regular' | 'irregular' | 'dormant'
        },
        {
            id: 'M1003',
            name: 'Amit Patel',
            visits: 15,
            avgPerWeek: 3.5,
            lastVisit: '2026-01-20',
            consistencyScore: 65,
            status: 'irregular' as 'regular' | 'irregular' | 'dormant'
        },
        {
            id: 'M1004',
            name: 'Sneha Reddy',
            visits: 8,
            avgPerWeek: 1.8,
            lastVisit: '2026-01-15',
            consistencyScore: 42,
            status: 'irregular' as 'regular' | 'irregular' | 'dormant'
        },
        {
            id: 'M1005',
            name: 'Vikram Singh',
            visits: 29,
            avgPerWeek: 6.8,
            lastVisit: '2026-01-23',
            consistencyScore: 98,
            status: 'regular' as 'regular' | 'irregular' | 'dormant'
        },
        {
            id: 'M1006',
            name: 'Kavita Desai',
            visits: 2,
            avgPerWeek: 0.5,
            lastVisit: '2026-01-05',
            consistencyScore: 15,
            status: 'dormant' as 'regular' | 'irregular' | 'dormant'
        }
    ];

    // ============================================
    // SECTION 5: STAFF ATTENDANCE TABLE
    // ============================================
    staffAttendance = [
        {
            id: 'S001',
            name: 'Rajesh Kumar',
            role: 'Senior Trainer',
            attendancePercentage: 96.5,
            presentDays: 28,
            absentDays: 1,
            performance: 'excellent' as 'excellent' | 'good' | 'poor'
        },
        {
            id: 'S002',
            name: 'Priya Sharma',
            role: 'Trainer',
            attendancePercentage: 94.2,
            presentDays: 27,
            absentDays: 2,
            performance: 'excellent' as 'excellent' | 'good' | 'poor'
        },
        {
            id: 'S003',
            name: 'Amit Patel',
            role: 'Trainer',
            attendancePercentage: 88.5,
            presentDays: 26,
            absentDays: 3,
            performance: 'good' as 'excellent' | 'good' | 'poor'
        },
        {
            id: 'S004',
            name: 'Sneha Reddy',
            role: 'Nutritionist',
            attendancePercentage: 91.5,
            presentDays: 27,
            absentDays: 2,
            performance: 'good' as 'excellent' | 'good' | 'poor'
        },
        {
            id: 'S005',
            name: 'Vikram Singh',
            role: 'Manager',
            attendancePercentage: 98.0,
            presentDays: 29,
            absentDays: 0,
            performance: 'excellent' as 'excellent' | 'good' | 'poor'
        }
    ];

    // ============================================
    // SECTION 6: INACTIVE & RISK MEMBERS
    // ============================================
    riskMembers = [
        {
            id: 'M1006',
            name: 'Kavita Desai',
            lastVisit: '2026-01-05',
            daysInactive: 18,
            severity: 'high' as 'high' | 'medium' | 'low',
            suggestedAction: 'Call',
            actionLabel: 'Immediate retention call required'
        },
        {
            id: 'M1004',
            name: 'Sneha Reddy',
            lastVisit: '2026-01-15',
            daysInactive: 8,
            severity: 'medium' as 'high' | 'medium' | 'low',
            suggestedAction: 'Offer',
            actionLabel: 'Send re-engagement offer'
        },
        {
            id: 'M1007',
            name: 'Arjun Nair',
            lastVisit: '2026-01-18',
            daysInactive: 5,
            severity: 'low' as 'high' | 'medium' | 'low',
            suggestedAction: 'Reminder',
            actionLabel: 'Send friendly reminder'
        }
    ];

    // ============================================
    // SECTION 7: INSIGHTS PANEL
    // ============================================
    insights = [
        {
            severity: 'success' as 'success' | 'warning' | 'danger',
            title: 'Peak Attendance at 6 PM Thursday',
            description: '100% capacity utilization during this slot',
            action: 'Consider adding extra classes during peak hours'
        },
        {
            severity: 'warning' as 'success' | 'warning' | 'danger',
            title: 'Low Weekend Attendance',
            description: 'Saturday & Sunday showing 46-62% capacity',
            action: 'Launch weekend special programs or discounts'
        },
        {
            severity: 'danger' as 'success' | 'warning' | 'danger',
            title: '158 Members Inactive',
            description: 'No visit in last 7+ days',
            action: 'Initiate re-engagement campaign immediately'
        },
        {
            severity: 'success' as 'success' | 'warning' | 'danger',
            title: '12.5% Attendance Growth',
            description: 'Positive trend compared to last period',
            action: 'Maintain current member engagement strategies'
        }
    ];

    // ============================================
    // LIFECYCLE HOOKS
    // ============================================
    ngOnInit(): void {
        this.loadAttendanceReports();
    }

    // ============================================
    // TIME RANGE FILTER
    // ============================================
    onRangeChange(range: string): void {
        this.selectedRange = range as any;
        this.loadAttendanceReports();
    }

    // ============================================
    // DATA LOADING (API-Ready)
    // ============================================
    loadAttendanceReports(): void {
        // TODO: Replace with actual API call
        console.log(`Loading attendance reports for range: ${this.selectedRange}`);
    }

    // ============================================
    // EXPORT FUNCTIONS (Mock)
    // ============================================
    exportCSV(): void {
        console.log('Exporting to CSV...');
        alert('CSV export functionality will be implemented with backend API');
    }

    exportPDF(): void {
        console.log('Exporting to PDF...');
        alert('PDF export functionality will be implemented with backend API');
    }

    // ============================================
    // CHART HELPERS
    // ============================================
    getMaxDailyAttendance(): number {
        return Math.max(...this.attendanceTrends.dailyAttendance.map(d => d.count));
    }

    getMaxWeekdayAttendance(): number {
        return Math.max(...this.attendanceTrends.weekdayAttendance.map(w => w.count));
    }

    // ============================================
    // HEATMAP HELPERS
    // ============================================
    getHeatmapValue(hourIndex: number, dayIndex: number): number {
        return this.peakTimeHeatmap.data[hourIndex][dayIndex];
    }

    getHeatmapColor(value: number): string {
        if (value >= 90) return 'rgba(16, 185, 129, 0.8)'; // Strong green
        if (value >= 75) return 'rgba(16, 185, 129, 0.5)'; // Medium green
        if (value >= 60) return 'rgba(245, 158, 11, 0.5)'; // Orange
        if (value >= 45) return 'rgba(239, 68, 68, 0.4)'; // Light red
        return 'rgba(239, 68, 68, 0.6)'; // Red
    }

    // ============================================
    // HELPER METHODS
    // ============================================
    getStatusClass(status: 'regular' | 'irregular' | 'dormant'): string {
        return `status-${status}`;
    }

    getStatusLabel(status: 'regular' | 'irregular' | 'dormant'): string {
        const labels = {
            regular: 'Regular',
            irregular: 'Irregular',
            dormant: 'Dormant'
        };
        return labels[status];
    }

    getPerformanceClass(performance: 'excellent' | 'good' | 'poor'): string {
        return `performance-${performance}`;
    }

    getPerformanceBadge(performance: 'excellent' | 'good' | 'poor'): string {
        const badges = {
            excellent: '⭐ Excellent',
            good: '✓ Good',
            poor: '⚠ Needs Improvement'
        };
        return badges[performance];
    }

    getSeverityClass(severity: 'success' | 'warning' | 'danger' | 'high' | 'medium' | 'low'): string {
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

    getRiskSeverityBadge(severity: 'high' | 'medium' | 'low'): string {
        const badges = {
            high: 'High Risk',
            medium: 'Medium Risk',
            low: 'Low Risk'
        };
        return badges[severity];
    }

    getActionIcon(action: string): string {
        const icons: { [key: string]: string } = {
            'Call': 'phone',
            'Offer': 'local_offer',
            'Reminder': 'notifications'
        };
        return icons[action] || 'info';
    }

    formatNumber(value: number): string {
        return value.toLocaleString('en-IN');
    }

    formatPercentage(value: number): string {
        return `${value.toFixed(1)}%`;
    }

    getDaysSinceLastVisit(lastVisit: string): number {
        const last = new Date(lastVisit);
        const now = new Date();
        const diff = now.getTime() - last.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    getConsistencyClass(score: number): string {
        if (score >= 80) return 'consistency-high';
        if (score >= 50) return 'consistency-medium';
        return 'consistency-low';
    }
}
