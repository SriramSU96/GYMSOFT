import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AdvancedAnalyticsKPI } from '../../../core/models/analytics.model';
import { loadAdvancedAnalytics } from '../../../core/store/analytics/analytics.actions';
import { selectAdvancedAnalytics, selectAdvancedAnalyticsLoading, selectAdvancedAnalyticsError } from '../../../core/store/analytics/analytics.selectors';

@Component({
    selector: 'app-advanced-analytics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './advanced-analytics.component.html',
    styleUrls: ['./advanced-analytics.component.css']
})
export class AdvancedAnalyticsComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private destroy$ = new Subject<void>();

    kpis$: Observable<AdvancedAnalyticsKPI[] | null>;
    isLoading$: Observable<boolean>;
    error$: Observable<any>;

    selectedFilter = '30days';

    constructor() {
        this.kpis$ = this.store.select(selectAdvancedAnalytics).pipe(
            map(data => data?.kpis || null),
            takeUntil(this.destroy$)
        );

        this.isLoading$ = this.store.select(selectAdvancedAnalyticsLoading);
        this.error$ = this.store.select(selectAdvancedAnalyticsError);
    }

    ngOnInit(): void {
        this.loadAnalytics();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadAnalytics(): void {
        this.store.dispatch(loadAdvancedAnalytics({ filter: this.selectedFilter }));
    }

    onFilterChange(filter: string): void {
        this.selectedFilter = filter;
        this.loadAnalytics();
    }
}
