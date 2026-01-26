export interface GymKPIs {
    totalMembers: number;
    activeCount: number;
    newSignups: number; // Last 30 days
    netProfit: number;
    retentionRate: number;
    peakHours: string;
    avgSessionDuration: number;
    totalRevenue: number;
    totalExpenses: number;
}

export interface RetentionRate {
    rate: number;
    period: string; // e.g. 'Last 30 days'
    churnRate: number;
}

export interface PeakHours {
    hours: { hour: number; count: number }[];
    busiestDay: string;
}

export interface TrainerPerformance {
    trainerId: string;
    trainerName: string;
    activeClients: number;
    completedSessions: number;
    rating: number;
    revenueGenerated: number;
}

export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor?: string | string[];
        borderColor?: string;
    }[];
}

export interface AdvancedAnalyticsKPI {
    label: string;
    value: string | number;
    change: string | number; // % change
    trend: 'up' | 'down' | 'neutral';
    color?: string; // e.g., 'text-green-500'
}

export interface AdvancedAnalytics {
    kpis: AdvancedAnalyticsKPI[];
    visitorTraffic: ChartData;
    revenueTrend: ChartData;
    membershipDistribution: ChartData; // e.g., by Plan
    period: 'week' | 'month' | 'year';
}

export interface FinancialReport {
    month: string;
    year: number;
    revenue: number;
    expenses: number;
    netProfit: number;
    breakdown: {
        category: string;
        amount: number;
        type: 'Income' | 'Expense';
    }[];
}

export interface AnalyticsAlert {
    _id: string;
    gymId: string;
    type: 'Churn' | 'Revenue' | 'Attendance' | 'Staff';
    message: string;
    severity: 'Info' | 'Warning' | 'Critical';
    data?: any;
    generatedAt: Date;
    isSent: boolean;
    sentAt?: Date;
    sentVia: string[];
}
