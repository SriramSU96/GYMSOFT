export interface ReportFilter {
    startDate?: string;
    endDate?: string;
    type?: 'Financial' | 'Attendance' | 'Member' | 'Inventory';
    format?: 'PDF' | 'CSV' | 'Excel';
    gymId?: string;
}

export interface ProfitLoss {
    month: string;
    year: number;
    revenue: number;
    expenses: number;
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
}

export interface YearlySummary {
    year: number;
    months: ProfitLoss[];
    totalRevenue: number;
    totalExpenses: number;
    totalProfit: number;
}

export interface MemberReport {
    totalMembers: number;
    activeMembers: number;
    expiredMembers: number;
    newSignups: number;
    attendanceRate: number;
    demographics: {
        ageGroup: string;
        count: number;
    }[];
}

export interface AttendanceReport {
    date: Date;
    totalCheckins: number;
    uniqueMembers: number;
    peakHour: string;
    averageDuration: number;
}
