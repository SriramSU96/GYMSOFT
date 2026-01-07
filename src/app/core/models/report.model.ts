
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
    data: ProfitLoss[];
}

export interface Expense {
    _id?: string;
    title: string;
    amount: number;
    category: 'Rent' | 'Equipment' | 'Maintenance' | 'Salary' | 'Other';
    date?: string;
    description?: string;
    gymId: string;
}
