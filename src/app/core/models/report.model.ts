
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
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    description: string;
    gymId: string;
}
