import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadProfitLoss } from '../../../core/store/reports/report.actions';
import { selectProfitLoss, selectReportIsLoading } from '../../../core/store/reports/report.selectors';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit {
  store = inject(Store);
  profitLoss$ = this.store.select(selectProfitLoss);
  isLoading$ = this.store.select(selectReportIsLoading);

  ngOnInit() {
    this.store.dispatch(loadProfitLoss());
  }
}
