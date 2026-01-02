
export interface GymKPIs {
    totalMembers: number;
    activeCount: number;
    netProfit: number;
    retentionRate: number;
    peakHours: string;
    avgSessionDuration: number;
}

export interface RetentionRate {
    rate: number;
    period: string; // e.g. 'Last 30 days'
}

export interface PeakHours {
    hours: { hour: number, count: number }[];
}

export interface TrainerPerformance {
    trainerId: string;
    clients: number;
    rating: number;
}

export interface AdvancedAnalyticsKPI {
    label: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down' | 'down-good' | 'neutral';
}

export interface AdvancedAnalytics {
    kpis: AdvancedAnalyticsKPI[];
    period: string; // e.g. '30days', '90days', '1year'
}

export interface FinancialReport {
    revenue: number;
    expenses: number;
    netProfit: number;
    chartData: { label: string, revenue: number, expense: number }[];
    month: string;
}
