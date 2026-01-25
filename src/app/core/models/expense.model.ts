export interface Expense {
    _id?: string;
    title: string;
    description?: string;
    amount: number;
    category: string; // e.g., 'Utilities', 'Salaries', 'Maintenance'
    date: Date;
    paymentMethod: 'Cash' | 'Card' | 'Bank Transfer' | 'Other';
    receiptUrl?: string;
    vendor?: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
    gymId: string;
    createdBy?: string; // userId
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ExpenseCategory {
    _id?: string;
    name: string;
    description?: string;
    gymId: string;
}

export interface ExpenseStats {
    totalExpenses: number;
    byCategory: { category: string; total: number }[];
    recentExpenses: Expense[];
}

export interface ExpenseResponse {
    success: boolean;
    count?: number;
    data: Expense[];
}

export interface ExpenseFilter {
    categoryId?: string;
    startDate?: string;
    endDate?: string;
}
