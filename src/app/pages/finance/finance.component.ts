import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================
// FINANCE MANAGEMENT COMPONENT
// Complete Financial Control Panel
// ============================================

@Component({
    selector: 'app-finance',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './finance.component.html',
    styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
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
    // SECTION 1: FINANCE OVERVIEW
    // ============================================
    financeOverview = {
        totalRevenue: 2847500,
        totalExpenses: 1245000,
        netProfit: 1602500,
        pendingDues: 125000,
        cashBalance: 3456000
    };

    // ============================================
    // SECTION 2: INCOME BREAKDOWN
    // ============================================
    incomeBreakdown = {
        membership: 1847500,
        pos: 685000,
        personalTraining: 315000,
        dailyRevenue: [
            { date: '2026-01-17', amount: 95000 },
            { date: '2026-01-18', amount: 102000 },
            { date: '2026-01-19', amount: 88000 },
            { date: '2026-01-20', amount: 110000 },
            { date: '2026-01-21', amount: 98000 },
            { date: '2026-01-22', amount: 115000 },
            { date: '2026-01-23', amount: 92000 }
        ],
        monthlyRevenue: [
            { month: 'Aug', amount: 2100000 },
            { month: 'Sep', amount: 2250000 },
            { month: 'Oct', amount: 2400000 },
            { month: 'Nov', amount: 2550000 },
            { month: 'Dec', amount: 2700000 },
            { month: 'Jan', amount: 2847500 }
        ]
    };

    // ============================================
    // SECTION 3: EXPENSE MANAGEMENT
    // ============================================
    expenses = [
        {
            id: 'EXP001',
            date: '2026-01-22',
            category: 'Rent',
            amount: 150000,
            paymentMethod: 'Bank Transfer',
            description: 'Monthly gym rent',
            addedBy: 'Admin'
        },
        {
            id: 'EXP002',
            date: '2026-01-20',
            category: 'Equipment',
            amount: 85000,
            paymentMethod: 'Card',
            description: 'New treadmill purchase',
            addedBy: 'Manager'
        },
        {
            id: 'EXP003',
            date: '2026-01-18',
            category: 'Utilities',
            amount: 35000,
            paymentMethod: 'Cash',
            description: 'Electricity bill',
            addedBy: 'Admin'
        },
        {
            id: 'EXP004',
            date: '2026-01-15',
            category: 'Maintenance',
            amount: 25000,
            paymentMethod: 'UPI',
            description: 'AC servicing',
            addedBy: 'Manager'
        },
        {
            id: 'EXP005',
            date: '2026-01-10',
            category: 'Marketing',
            amount: 45000,
            paymentMethod: 'Card',
            description: 'Social media ads',
            addedBy: 'Admin'
        }
    ];

    expenseCategories = ['All', 'Rent', 'Equipment', 'Utilities', 'Maintenance', 'Marketing', 'Salaries', 'Other'];
    selectedExpenseCategory = 'All';

    // Expense Modal
    showExpenseModal = false;
    expenseForm = {
        id: '',
        date: '',
        category: 'Rent',
        amount: 0,
        paymentMethod: 'Cash',
        description: '',
        addedBy: 'Admin'
    };
    isEditMode = false;

    // ============================================
    // SECTION 4: PAYROLL SUMMARY
    // ============================================
    payrollSummary = {
        totalSalaryCost: 450000,
        paid: 425000,
        pending: 25000,
        staffBreakdown: [
            { name: 'Rajesh Kumar', role: 'Senior Trainer', salary: 45000, status: 'paid' as 'paid' | 'pending' },
            { name: 'Priya Sharma', role: 'Trainer', salary: 35000, status: 'paid' as 'paid' | 'pending' },
            { name: 'Amit Patel', role: 'Trainer', salary: 35000, status: 'paid' as 'paid' | 'pending' },
            { name: 'Sneha Reddy', role: 'Nutritionist', salary: 40000, status: 'paid' as 'paid' | 'pending' },
            { name: 'Vikram Singh', role: 'Manager', salary: 50000, status: 'paid' as 'paid' | 'pending' },
            { name: 'Kavita Desai', role: 'Receptionist', salary: 25000, status: 'pending' as 'paid' | 'pending' }
        ]
    };

    // ============================================
    // SECTION 5: CASH FLOW
    // ============================================
    cashFlow = {
        inflow: [
            { month: 'Aug', amount: 2100000 },
            { month: 'Sep', amount: 2250000 },
            { month: 'Oct', amount: 2400000 },
            { month: 'Nov', amount: 2550000 },
            { month: 'Dec', amount: 2700000 },
            { month: 'Jan', amount: 2847500 }
        ],
        outflow: [
            { month: 'Aug', amount: 1150000 },
            { month: 'Sep', amount: 1200000 },
            { month: 'Oct', amount: 1180000 },
            { month: 'Nov', amount: 1220000 },
            { month: 'Dec', amount: 1250000 },
            { month: 'Jan', amount: 1245000 }
        ],
        netCashPosition: 1602500
    };

    // ============================================
    // SECTION 6: REFUNDS
    // ============================================
    refunds = [
        {
            id: 'REF001',
            date: '2026-01-20',
            memberName: 'Arjun Nair',
            amount: 5000,
            reason: 'Membership cancellation',
            processedBy: 'Manager',
            status: 'completed' as 'completed' | 'pending'
        },
        {
            id: 'REF002',
            date: '2026-01-15',
            memberName: 'Meera Kapoor',
            amount: 3000,
            reason: 'Duplicate payment',
            processedBy: 'Admin',
            status: 'completed' as 'completed' | 'pending'
        },
        {
            id: 'REF003',
            date: '2026-01-10',
            memberName: 'Sanjay Rao',
            amount: 8000,
            reason: 'Service dissatisfaction',
            processedBy: 'Manager',
            status: 'pending' as 'completed' | 'pending'
        }
    ];

    // ============================================
    // SECTION 7: FINANCIAL FORECAST
    // ============================================
    forecast = {
        revenueNext3Months: [
            { month: 'Feb', predicted: 2950000, confidence: 85 },
            { month: 'Mar', predicted: 3100000, confidence: 82 },
            { month: 'Apr', predicted: 3250000, confidence: 78 }
        ],
        expenseTrend: [
            { month: 'Feb', predicted: 1280000 },
            { month: 'Mar', predicted: 1320000 },
            { month: 'Apr', predicted: 1350000 }
        ],
        profitPrediction: [
            { month: 'Feb', predicted: 1670000 },
            { month: 'Mar', predicted: 1780000 },
            { month: 'Apr', predicted: 1900000 }
        ]
    };

    // ============================================
    // LIFECYCLE HOOKS
    // ============================================
    ngOnInit(): void {
        this.loadFinanceData();
    }

    // ============================================
    // TIME RANGE FILTER
    // ============================================
    onRangeChange(range: '30d' | '3m' | '6m' | '1y'): void {
        this.selectedRange = range;
        this.loadFinanceData();
    }

    // ============================================
    // DATA LOADING (API-Ready)
    // ============================================
    loadFinanceData(): void {
        // TODO: Replace with actual API call
        console.log(`Loading finance data for range: ${this.selectedRange}`);
    }

    // ============================================
    // EXPENSE MANAGEMENT
    // ============================================
    filterExpensesByCategory(): any[] {
        if (this.selectedExpenseCategory === 'All') {
            return this.expenses;
        }
        return this.expenses.filter(exp => exp.category === this.selectedExpenseCategory);
    }

    openAddExpenseModal(): void {
        this.isEditMode = false;
        this.expenseForm = {
            id: '',
            date: new Date().toISOString().split('T')[0],
            category: 'Rent',
            amount: 0,
            paymentMethod: 'Cash',
            description: '',
            addedBy: 'Admin'
        };
        this.showExpenseModal = true;
    }

    openEditExpenseModal(expense: any): void {
        this.isEditMode = true;
        this.expenseForm = { ...expense };
        this.showExpenseModal = true;
    }

    closeExpenseModal(): void {
        this.showExpenseModal = false;
    }

    saveExpense(): void {
        if (this.isEditMode) {
            const index = this.expenses.findIndex(e => e.id === this.expenseForm.id);
            if (index !== -1) {
                this.expenses[index] = { ...this.expenseForm };
            }
        } else {
            const newExpense = {
                ...this.expenseForm,
                id: `EXP${String(this.expenses.length + 1).padStart(3, '0')}`
            };
            this.expenses.unshift(newExpense);
        }
        this.closeExpenseModal();
        this.recalculateFinances();
    }

    deleteExpense(id: string): void {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(e => e.id !== id);
            this.recalculateFinances();
        }
    }

    recalculateFinances(): void {
        const totalExpenses = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        this.financeOverview.totalExpenses = totalExpenses;
        this.financeOverview.netProfit = this.financeOverview.totalRevenue - totalExpenses;
    }

    // ============================================
    // EXPORT FUNCTIONS (Mock)
    // ============================================
    exportPDF(): void {
        console.log('Exporting to PDF...');
        alert('PDF export functionality will be implemented with backend API');
    }

    exportExcel(): void {
        console.log('Exporting to Excel...');
        alert('Excel export functionality will be implemented with backend API');
    }

    printSummary(): void {
        window.print();
    }

    // ============================================
    // CHART HELPERS
    // ============================================
    getMaxDailyRevenue(): number {
        return Math.max(...this.incomeBreakdown.dailyRevenue.map(d => d.amount));
    }

    getMaxMonthlyRevenue(): number {
        return Math.max(...this.incomeBreakdown.monthlyRevenue.map(m => m.amount));
    }

    getMaxCashFlow(): number {
        const maxInflow = Math.max(...this.cashFlow.inflow.map(i => i.amount));
        const maxOutflow = Math.max(...this.cashFlow.outflow.map(o => o.amount));
        return Math.max(maxInflow, maxOutflow);
    }

    // ============================================
    // HELPER METHODS
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
        return `${value}%`;
    }

    getProfitClass(): string {
        return this.financeOverview.netProfit > 0 ? 'profit' : 'loss';
    }

    getPayrollStatusClass(status: 'paid' | 'pending'): string {
        return status === 'paid' ? 'status-paid' : 'status-pending';
    }

    getRefundStatusClass(status: 'completed' | 'pending'): string {
        return status === 'completed' ? 'status-completed' : 'status-pending';
    }
}
