
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import {
    Chart,
    ChartConfiguration,
    ChartData,
    ChartEvent,
    ChartType,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    LineController,
    LineElement,
    PointElement,
    PieController,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

// Register Chart.js components
Chart.register(
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    LineController,
    LineElement,
    PointElement,
    PieController,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

interface Expense {
    id: string;
    title: string;
    category: 'Rent' | 'Salaries' | 'Equipment' | 'Utilities' | 'Marketing' | 'Maintenance' | 'Other';
    amount: number;
    date: string;
}

interface MonthlyData {
    month: string;
    revenue: number;
    expenses: number;
}

@Component({
    selector: 'app-profit-loss',
    standalone: true,
    imports: [CommonModule, FormsModule, BaseChartDirective],
    templateUrl: './profit-loss.component.html',
    styleUrls: ['./profit-loss.component.css'],
    providers: [DecimalPipe, CurrencyPipe]
})
export class ProfitLossComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    // -- State --
    selectedMonth: string = new Date().toISOString().substring(0, 7); // YYYY-MM

    // Summary Data
    totalRevenue: number = 0;
    totalExpenses: number = 0;
    netProfit: number = 0;

    // Data Lists
    expenses: Expense[] = [];
    monthlyHistory: MonthlyData[] = [];

    // UI State
    showAddExpenseModal: boolean = false;
    isEditingExpense: boolean = false;
    editingExpenseId: string | null = null;
    newExpense: Partial<Expense> = {
        category: 'Other',
        date: new Date().toISOString().split('T')[0]
    };

    // -- Chart Configurations --

    // 1. Revenue vs Expense (Bar)
    public barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, labels: { color: '#B0B0B0' } },
            tooltip: {
                backgroundColor: 'rgba(30,30,30,0.9)',
                titleColor: '#fff',
                bodyColor: '#B0B0B0',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1
            }
        },
        scales: {
            x: {
                ticks: { color: '#B0B0B0' },
                grid: { color: 'rgba(255,255,255,0.05)' }
            },
            y: {
                ticks: { color: '#B0B0B0' },
                grid: { color: 'rgba(255,255,255,0.05)' }
            }
        }
    };
    public barChartType: ChartType = 'bar';
    public barChartData: ChartData<'bar'> = {
        labels: [],
        datasets: []
    };

    // 2. Net Profit Trend (Line)
    public lineChartOptions: ChartConfiguration['options'] = {
        ...this.barChartOptions,
        elements: {
            line: { tension: 0.4 } // Smooth curves
        }
    };
    public lineChartType: ChartType = 'line';
    public lineChartData: ChartData<'line'> = {
        labels: [],
        datasets: []
    };

    // 3. Expense Breakdown (Pie)
    public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'right', labels: { color: '#B0B0B0' } }
        }
    };
    public pieChartType: ChartType = 'pie';
    public pieChartData: ChartData<'pie'> = {
        labels: [],
        datasets: []
    };

    constructor() { }

    ngOnInit(): void {
        this.seedMockData();
        this.calculateFinancials();
    }

    // -- Logic --

    seedMockData() {
        // Generate last 6 months of data
        const months = [];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthStr = d.toISOString().substring(0, 7); // YYYY-MM

            const rev = 15000 + Math.floor(Math.random() * 5000);
            const exp = 8000 + Math.floor(Math.random() * 3000);

            this.monthlyHistory.push({
                month: monthStr,
                revenue: rev,
                expenses: exp
            });
            months.push(monthStr);
        }

        // Mock Expenses for current month
        this.expenses = [
            { id: '1', title: 'New Treadmill', category: 'Equipment', amount: 2500, date: this.selectedMonth + '-05' },
            { id: '2', title: 'Trainer Salaries', category: 'Salaries', amount: 4500, date: this.selectedMonth + '-01' },
            { id: '3', title: 'Power Bill', category: 'Utilities', amount: 850, date: this.selectedMonth + '-10' },
            { id: '4', title: 'FB Ads Campaign', category: 'Marketing', amount: 600, date: this.selectedMonth + '-12' },
            { id: '5', title: 'Cleaning Service', category: 'Maintenance', amount: 400, date: this.selectedMonth + '-02' },
        ];
    }

    calculateFinancials() {
        // 1. Calculate Summary for Selected Month
        // In a real app, we'd fetch specific month data from API.
        // Here we'll just use our mock expenses + a simulated revenue for the selected month

        // Find historical data for selected month or default
        const historyItem = this.monthlyHistory.find(m => m.month === this.selectedMonth) || {
            month: this.selectedMonth,
            revenue: 16500, // Fallback mock revenue
            expenses: 0
        };

        // Recalculate expenses based on our detailed list if it matches the month, 
        // otherwise use the history item's expense (simplified for mock)
        // For this demo, let's assume 'expenses' array IS the list for 'selectedMonth'.
        const currentTotalExpenses = this.expenses.reduce((acc, curr) => acc + curr.amount, 0);

        this.totalRevenue = historyItem.revenue;
        this.totalExpenses = currentTotalExpenses;
        this.netProfit = this.totalRevenue - this.totalExpenses;

        this.updateCharts();
    }

    updateCharts() {
        // 1. Bar Chart: Last 6 Months Revenue vs Expense
        // We'll update the last entry of history with our current calculating dynamic expenses
        const historyCopy = [...this.monthlyHistory];
        const currentMonthIndex = historyCopy.findIndex(m => m.month === this.selectedMonth);

        if (currentMonthIndex !== -1) {
            historyCopy[currentMonthIndex].expenses = this.totalExpenses;
            historyCopy[currentMonthIndex].revenue = this.totalRevenue;
        }

        this.barChartData = {
            labels: historyCopy.map(m => this.formatDateLabel(m.month)),
            datasets: [
                { data: historyCopy.map(m => m.revenue), label: 'Revenue', backgroundColor: '#10B981', hoverBackgroundColor: '#059669' },
                { data: historyCopy.map(m => m.expenses), label: 'Expenses', backgroundColor: '#EF4444', hoverBackgroundColor: '#DC2626' }
            ]
        };

        // 2. Line Chart: Net Profit Trend
        this.lineChartData = {
            labels: historyCopy.map(m => this.formatDateLabel(m.month)),
            datasets: [
                {
                    data: historyCopy.map(m => m.revenue - m.expenses),
                    label: 'Net Profit',
                    borderColor: '#D4AF37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    fill: true,
                    pointBackgroundColor: '#D4AF37',
                    pointBorderColor: '#fff'
                }
            ]
        };

        // 3. Pie Chart: Expenses by Category
        const categoryTotals: Record<string, number> = {};
        this.expenses.forEach(e => {
            categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
        });

        this.pieChartData = {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#3B82F6', // Rent
                    '#10B981', // Salaries
                    '#F59E0B', // Equipment
                    '#8B5CF6', // Utilities
                    '#EF4444', // Marketing
                    '#EC4899', // Maintenance
                    '#6B7280'  // Other
                ],
                hoverOffset: 4
            }]
        };

        this.chart?.update();
    }

    // Dictionary for formatting 'YYYY-MM' to 'MMM YYYY'
    formatDateLabel(ym: string): string {
        const date = new Date(ym + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    // -- Actions --

    onMonthChange() {
        // In a real app, fetch new expenses list for the selected month.
        // Here we will just randomize the expenses slightly to simulate change
        this.expenses.forEach(e => {
            e.amount = Math.round(e.amount * (0.9 + Math.random() * 0.2)); // +/- 10%
        });
        this.calculateFinancials();
    }

    openAddExpenseModal(expense?: Expense) {
        if (expense) {
            // Edit mode
            this.isEditingExpense = true;
            this.editingExpenseId = expense.id;
            this.newExpense = {
                title: expense.title,
                amount: expense.amount,
                category: expense.category,
                date: expense.date
            };
        } else {
            // Add mode
            this.isEditingExpense = false;
            this.editingExpenseId = null;
            this.newExpense = {
                title: '',
                amount: 0,
                category: 'Other',
                date: this.selectedMonth + '-' + new Date().getDate().toString().padStart(2, '0')
            };
        }
        this.showAddExpenseModal = true;
    }

    closeModal() {
        this.showAddExpenseModal = false;
    }

    saveExpense() {
        if (!this.newExpense.title || !this.newExpense.amount) return;

        if (this.isEditingExpense && this.editingExpenseId) {
            // Update existing expense
            const index = this.expenses.findIndex(e => e.id === this.editingExpenseId);
            if (index !== -1) {
                this.expenses[index] = {
                    id: this.editingExpenseId,
                    title: this.newExpense.title!,
                    category: this.newExpense.category as any || 'Other',
                    amount: +this.newExpense.amount!,
                    date: this.newExpense.date || new Date().toISOString().split('T')[0]
                };
            }
        } else {
            // Create new expense
            const expense: Expense = {
                id: Date.now().toString(),
                title: this.newExpense.title!,
                category: this.newExpense.category as any || 'Other',
                amount: +this.newExpense.amount!,
                date: this.newExpense.date || new Date().toISOString().split('T')[0]
            };
            this.expenses = [expense, ...this.expenses];
        }

        this.calculateFinancials();
        this.closeModal();
    }

    deleteExpense(id: string) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(e => e.id !== id);
            this.calculateFinancials();
        }
    }

    getNetProfitClass(): string {
        return this.netProfit >= 0 ? 'text-success' : 'text-danger';
    }
}
