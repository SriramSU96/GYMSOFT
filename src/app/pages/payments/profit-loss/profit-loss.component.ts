import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FinancialReport } from '../../../core/models/analytics.model';
import { loadFinancialReport } from '../../../core/store/analytics/analytics.actions';
import { selectFinancialReport, selectFinancialReportLoading, selectFinancialReportError } from '../../../core/store/analytics/analytics.selectors';

@Component({
    selector: 'app-profit-loss',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profit-loss.component.html',
    styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit {
    private store = inject(Store);

    selectedMonth = '2026-01'; // Default current month
    months = [
        { value: '2026-01', label: 'January 2026' },
        { value: '2025-12', label: 'December 2025' },
        { value: '2025-11', label: 'November 2025' }
    ];

    report$: Observable<FinancialReport | null> = this.store.select(selectFinancialReport);
    isLoading$: Observable<boolean> = this.store.select(selectFinancialReportLoading);
    error$: Observable<any> = this.store.select(selectFinancialReportError);

    ngOnInit(): void {
        this.fetchData(this.selectedMonth);
    }

    onMonthChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.selectedMonth = target.value;
        this.fetchData(this.selectedMonth);
    }

    fetchData(month: string) {
        this.store.dispatch(loadFinancialReport({ month }));
    }

    downloadPdf() {
        alert(`Downloading P&L Report for ${this.selectedMonth} (PDF)...`);
    }
}
