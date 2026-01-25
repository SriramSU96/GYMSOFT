
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PosService } from '../../../core/services/pos.service';
import { AuthService } from '../../../core/services/auth.service';
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
    Title,
    Filler
} from 'chart.js';

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
    Title,
    Filler
);

interface ProductStat {
    name: string;
    qty: number;
    revenue: number;
    profit: number;
}

interface StaffStat {
    name: string;
    transactions: number;
    sales: number;
}

@Component({
    selector: 'app-sales-report',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, BaseChartDirective],
    templateUrl: './sales-report.component.html',
    styleUrls: ['./sales-report.component.css'],
    providers: [DecimalPipe, CurrencyPipe]
})
export class SalesReport implements OnInit {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    salesData: any = null;
    isLoading = false;
    filterForm: FormGroup;

    // Stats
    totalRevenue = 0;
    totalTxns = 0;
    grossProfit = 0;
    profitMargin = 0;

    // Aggregated Data
    productStats: ProductStat[] = [];
    staffStats: StaffStat[] = [];

    // -- Charts --

    // 1. Hourly Sales (Bar)
    public hourlyChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa' } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa' } }
        }
    };
    public hourlyChartData: ChartData<'bar'> = { labels: [], datasets: [] };

    // 2. Trend (Line)
    public trendChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: '#ccc' } }
        },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa' } },
            x: { display: false } // minimalist
        }
    };
    public trendChartData: ChartData<'line'> = { labels: [], datasets: [] };

    constructor(
        private posService: PosService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.filterForm = this.fb.group({
            date: [new Date().toISOString().split('T')[0]]
        });
    }

    ngOnInit(): void {
        this.loadReport();
    }

    loadReport(): void {
        const user = this.authService.currentUserValue;
        if (!user?.gymId) return;

        this.isLoading = true;
        // const date = this.filterForm.get('date')?.value; // Use in API call

        this.posService.getSales().subscribe({
            next: (data: any) => {
                this.salesData = data;
                this.processData(data); // Aggregate raw data
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching sales report', err);
                this.isLoading = false;
            }
        });
    }

    processData(data: any): void { // Start of processData
        // data matches SaleResponse: { success: boolean, data: Sale[] }
        const rawSales: any[] = data.data || [];

        // 1. Core Metrics
        this.totalRevenue = rawSales.reduce((sum, sale) => sum + (sale.total || sale.totalAmount || 0), 0);
        this.totalTxns = rawSales.length;

        // Est. Profit (Mocking Cost as 60% of Revenue if not present)
        this.grossProfit = rawSales.reduce((acc, sale) => {
            const saleCost = sale.items?.reduce((c: number, i: any) => c + ((i.costPrice || i.price * 0.6) * i.quantity), 0) || (sale.totalAmount * 0.6);
            return acc + (sale.totalAmount - saleCost);
        }, 0);

        this.profitMargin = this.totalRevenue > 0 ? (this.grossProfit / this.totalRevenue) * 100 : 0;

        // 2. Hourly Distribution
        const hours = Array(24).fill(0);
        rawSales.forEach(sale => {
            const h = new Date(sale.date).getHours();
            hours[h] += sale.totalAmount;
        });

        this.hourlyChartData = {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [{
                data: hours,
                label: 'Revenue',
                backgroundColor: '#3B82F6',
                borderRadius: 4
            }]
        };

        // 3. Product Stats
        const pMap = new Map<string, ProductStat>();
        rawSales.forEach(sale => {
            sale.items?.forEach((item: any) => {
                const existing = pMap.get(item.productName) || { name: item.productName, qty: 0, revenue: 0, profit: 0 };
                existing.qty += item.quantity;
                existing.revenue += item.price * item.quantity;
                // Mock profit
                const cost = (item.costPrice || item.price * 0.6) * item.quantity;
                existing.profit += (item.price * item.quantity) - cost;
                pMap.set(item.productName, existing);
            });
        });
        this.productStats = Array.from(pMap.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 10);

        // 4. Staff Stats (Mock Names)
        const sMap = new Map<string, StaffStat>();
        rawSales.forEach(sale => {
            const name = sale.soldBy || 'Unknown'; // ID usually, needs mapping
            const existing = sMap.get(name) || { name: `Staff ${name.substring(0, 4)}`, transactions: 0, sales: 0 };
            existing.transactions++;
            existing.sales += sale.totalAmount;
            sMap.set(name, existing);
        });
        this.staffStats = Array.from(sMap.values());

        // 5. Monthly Trend (Mock Data for demo, as we filtered by single day)
        // Simulate previous 7 days
        this.trendChartData = {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'],
            datasets: [
                {
                    data: [1200, 1900, 1500, 2100, 1800, 2200, this.totalRevenue],
                    label: 'Revenue',
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: 'origin',
                    tension: 0.4
                },
                {
                    data: [400, 700, 500, 900, 600, 800, this.grossProfit],
                    label: 'Profit',
                    borderColor: '#3B82F6',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ]
        };

        this.chart?.update();
    }

    exportCSV() {
        const rows = [
            ['Product', 'Qty Sold', 'Revenue', 'Profit'],
            ...this.productStats.map(p => [p.name, p.qty, p.revenue, p.profit])
        ];

        let csvContent = "data:text/csv;charset=utf-8,"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "pos_report.csv");
        document.body.appendChild(link);
        link.click();
    }
}
