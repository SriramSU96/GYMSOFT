import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================
// MEMBER REPORTS COMPONENT
// Enterprise Member Intelligence Dashboard
// ============================================

@Component({
    selector: 'app-member-reports',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './member-reports.component.html',
    styleUrls: ['./member-reports.component.css']
})
export class MemberReportsComponent implements OnInit {
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
    // SUMMARY CARDS DATA
    // ============================================
    summaryData = {
        totalMembers: 1247,
        activeMembers: 1089,
        inactiveMembers: 158,
        highRiskMembers: 23
    };

    // ============================================
    // MEMBER INTELLIGENCE TABLE DATA
    // ============================================
    membersData = [
        {
            id: 'M1001',
            name: 'Rajesh Kumar',
            attendanceScore: 92,
            lastVisit: '2026-01-22',
            ltv: 125000,
            engagement: 88,
            churnRisk: 'low' as 'low' | 'medium' | 'high',
            status: 'active' as 'active' | 'inactive',
            pendingDues: 0,
            isHighValue: true
        },
        {
            id: 'M1002',
            name: 'Priya Sharma',
            attendanceScore: 78,
            lastVisit: '2026-01-21',
            ltv: 98000,
            engagement: 75,
            churnRisk: 'low' as 'low' | 'medium' | 'high',
            status: 'active' as 'active' | 'inactive',
            pendingDues: 0,
            isHighValue: true
        },
        {
            id: 'M1003',
            name: 'Amit Patel',
            attendanceScore: 45,
            lastVisit: '2026-01-15',
            ltv: 67000,
            engagement: 52,
            churnRisk: 'medium' as 'low' | 'medium' | 'high',
            status: 'active' as 'active' | 'inactive',
            pendingDues: 5000,
            isHighValue: false
        },
        {
            id: 'M1004',
            name: 'Sneha Reddy',
            attendanceScore: 25,
            lastVisit: '2026-01-10',
            ltv: 45000,
            engagement: 35,
            churnRisk: 'high' as 'low' | 'medium' | 'high',
            status: 'active' as 'active' | 'inactive',
            pendingDues: 12000,
            isHighValue: false
        },
        {
            id: 'M1005',
            name: 'Vikram Singh',
            attendanceScore: 95,
            lastVisit: '2026-01-23',
            ltv: 156000,
            engagement: 92,
            churnRisk: 'low' as 'low' | 'medium' | 'high',
            status: 'active' as 'active' | 'inactive',
            pendingDues: 0,
            isHighValue: true
        },
        {
            id: 'M1006',
            name: 'Kavita Desai',
            attendanceScore: 15,
            lastVisit: '2026-01-05',
            ltv: 32000,
            engagement: 22,
            churnRisk: 'high' as 'low' | 'medium' | 'high',
            status: 'inactive' as 'active' | 'inactive',
            pendingDues: 8000,
            isHighValue: false
        },
        {
            id: 'M1007',
            name: 'Arjun Nair',
            attendanceScore: 82,
            lastVisit: '2026-01-22',
            ltv: 89000,
            engagement: 79,
            churnRisk: 'low' as 'low' | 'medium' | 'high',
            status: 'active' as 'active' | 'inactive',
            pendingDues: 0,
            isHighValue: true
        },
        {
            id: 'M1008',
            name: 'Meera Kapoor',
            attendanceScore: 58,
            lastVisit: '2026-01-18',
            ltv: 54000,
            engagement: 61,
            churnRisk: 'medium' as 'low' | 'medium' | 'high',
            status: 'active' as 'active' | 'inactive',
            pendingDues: 3000,
            isHighValue: false
        }
    ];

    filteredMembers = [...this.membersData];

    // ============================================
    // FILTER STATE
    // ============================================
    filters = {
        status: 'all' as 'all' | 'active' | 'inactive',
        highValue: false,
        churnRisk: 'all' as 'all' | 'low' | 'medium' | 'high',
        pendingDues: false,
        searchQuery: ''
    };

    // ============================================
    // DETAILED MEMBER VIEW (MODAL)
    // ============================================
    showMemberModal = false;
    selectedMember: any = null;
    selectedTab: 'attendance' | 'payments' | 'engagement' | 'progress' = 'attendance';

    memberDetails = {
        attendanceHistory: [
            { date: '2026-01-23', checkIn: '06:30 AM', checkOut: '08:15 AM', duration: 105 },
            { date: '2026-01-22', checkIn: '06:25 AM', checkOut: '08:10 AM', duration: 105 },
            { date: '2026-01-21', checkIn: '06:35 AM', checkOut: '08:20 AM', duration: 105 },
            { date: '2026-01-20', checkIn: '06:30 AM', checkOut: '08:00 AM', duration: 90 },
            { date: '2026-01-19', checkIn: '06:40 AM', checkOut: '08:25 AM', duration: 105 }
        ],
        paymentHistory: [
            { date: '2026-01-01', amount: 15000, method: 'UPI', status: 'completed', type: 'Membership' },
            { date: '2025-12-01', amount: 15000, method: 'Card', status: 'completed', type: 'Membership' },
            { date: '2025-11-01', amount: 15000, method: 'Cash', status: 'completed', type: 'Membership' }
        ],
        engagement: {
            workoutPlan: { assigned: true, completion: 85, lastUpdated: '2026-01-15' },
            dietPlan: { assigned: true, compliance: 78, lastUpdated: '2026-01-10' },
            ptSessions: { total: 12, completed: 10, remaining: 2 }
        },
        fitnessProgress: {
            weight: [{ date: '2026-01-01', value: 85 }, { date: '2026-01-15', value: 83 }],
            bodyFat: [{ date: '2026-01-01', value: 22 }, { date: '2026-01-15', value: 20 }],
            goals: ['Lose 5kg', 'Build muscle', 'Improve stamina']
        }
    };

    // ============================================
    // INSIGHTS PANEL
    // ============================================
    insights = [
        {
            severity: 'danger' as 'success' | 'warning' | 'danger',
            title: '23 Members at High Churn Risk',
            description: 'Members with low attendance and engagement',
            action: 'Call',
            actionLabel: 'Schedule retention calls'
        },
        {
            severity: 'warning' as 'success' | 'warning' | 'danger',
            title: '158 Inactive Members',
            description: 'No visit in last 7+ days',
            action: 'Offer',
            actionLabel: 'Send re-engagement offer'
        },
        {
            severity: 'success' as 'success' | 'warning' | 'danger',
            title: '87% Active Member Rate',
            description: 'Above industry average of 75%',
            action: 'Reminder',
            actionLabel: 'Maintain current programs'
        }
    ];

    // ============================================
    // LIFECYCLE HOOKS
    // ============================================
    ngOnInit(): void {
        this.loadMemberReports();
    }

    // ============================================
    // TIME RANGE FILTER
    // ============================================
    onRangeChange(range: string): void {
        this.selectedRange = range as any;
        this.loadMemberReports();
    }

    // ============================================
    // DATA LOADING (API-Ready)
    // ============================================
    loadMemberReports(): void {
        // TODO: Replace with actual API call
        console.log(`Loading member reports for range: ${this.selectedRange}`);
        this.applyFilters();
    }

    // ============================================
    // FILTER LOGIC
    // ============================================
    applyFilters(): void {
        this.filteredMembers = this.membersData.filter(member => {
            // Status filter
            if (this.filters.status !== 'all' && member.status !== this.filters.status) {
                return false;
            }

            // High value filter
            if (this.filters.highValue && !member.isHighValue) {
                return false;
            }

            // Churn risk filter
            if (this.filters.churnRisk !== 'all' && member.churnRisk !== this.filters.churnRisk) {
                return false;
            }

            // Pending dues filter
            if (this.filters.pendingDues && member.pendingDues === 0) {
                return false;
            }

            // Search query
            if (this.filters.searchQuery && !member.name.toLowerCase().includes(this.filters.searchQuery.toLowerCase())) {
                return false;
            }

            return true;
        });
    }

    clearFilters(): void {
        this.filters = {
            status: 'all',
            highValue: false,
            churnRisk: 'all',
            pendingDues: false,
            searchQuery: ''
        };
        this.applyFilters();
    }

    // ============================================
    // MEMBER MODAL
    // ============================================
    openMemberDetails(member: any): void {
        this.selectedMember = member;
        this.showMemberModal = true;
        this.selectedTab = 'attendance';
    }

    closeMemberModal(): void {
        this.showMemberModal = false;
        this.selectedMember = null;
    }

    selectTab(tab: 'attendance' | 'payments' | 'engagement' | 'progress'): void {
        this.selectedTab = tab;
    }

    // ============================================
    // EXPORT FUNCTIONS (Mock)
    // ============================================
    exportCSV(): void {
        console.log('Exporting to CSV...');
        // TODO: Implement CSV export
        alert('CSV export functionality will be implemented with backend API');
    }

    exportPDF(): void {
        console.log('Exporting to PDF...');
        // TODO: Implement PDF export
        alert('PDF export functionality will be implemented with backend API');
    }

    // ============================================
    // HELPER METHODS
    // ============================================
    getChurnRiskClass(risk: 'low' | 'medium' | 'high'): string {
        return `risk-${risk}`;
    }

    getChurnRiskLabel(risk: 'low' | 'medium' | 'high'): string {
        const labels = {
            low: 'Low Risk',
            medium: 'Medium Risk',
            high: 'High Risk'
        };
        return labels[risk];
    }

    getStatusClass(status: 'active' | 'inactive'): string {
        return `status-${status}`;
    }

    getStatusLabel(status: 'active' | 'inactive'): string {
        return status === 'active' ? 'Active' : 'Inactive';
    }

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

    formatCurrency(value: number): string {
        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)}L`;
        } else if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }
        return `₹${value.toLocaleString('en-IN')}`;
    }

    formatNumber(value: number): string {
        return value.toLocaleString('en-IN');
    }

    formatPercentage(value: number | string): string {
        return `${value}%`;
    }

    getDaysSinceLastVisit(lastVisit: string): number {
        const last = new Date(lastVisit);
        const now = new Date();
        const diff = now.getTime() - last.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    getScoreClass(score: number): string {
        if (score >= 80) return 'score-high';
        if (score >= 50) return 'score-medium';
        return 'score-low';
    }
}
