import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadOverview } from '../../../core/store/analytics/analytics.actions';
import { selectAnalyticsState } from '../../../core/store/analytics/analytics.selectors';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-dashboard.html',
  styleUrl: './analytics-dashboard.css'
})
export class AnalyticsDashboard implements OnInit {
  store = inject(Store);
  analytics$ = this.store.select(selectAnalyticsState);

  ngOnInit() {
    this.store.dispatch(loadOverview());
  }
}
