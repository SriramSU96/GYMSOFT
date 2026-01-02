import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadAnalytics } from '../../../core/store/analytics/analytics.actions';
import { selectAnalytics } from '../../../core/store/analytics/analytics.selectors';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-dashboard.html',
  styleUrl: './analytics-dashboard.css'
})
export class AnalyticsDashboard implements OnInit {
  store = inject(Store);
  analytics$ = this.store.select(selectAnalytics);

  ngOnInit() {
    this.store.dispatch(loadAnalytics());
  }
}
