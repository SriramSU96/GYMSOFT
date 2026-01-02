import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { loadAnalytics } from '../../core/store/analytics/analytics.actions';
import { selectAnalytics } from '../../core/store/analytics/analytics.selectors';

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private store = inject(Store);
  analytics$ = this.store.select(selectAnalytics);

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Member Growth' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Attendance' },
    ],
  };

  ngOnInit() {
    this.store.dispatch(loadAnalytics());
  }
}
