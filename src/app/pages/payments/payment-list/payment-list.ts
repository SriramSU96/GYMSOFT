import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPendingPayments } from '../../../core/store/payments/payment.actions';
import { selectPayments, selectPaymentIsLoading } from '../../../core/store/payments/payment.selectors';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-list.html'
})
export class PaymentList implements OnInit {
  store = inject(Store);
  payments$ = this.store.select(selectPayments);
  isLoading$ = this.store.select(selectPaymentIsLoading);

  ngOnInit() {
    this.store.dispatch(loadPendingPayments());
  }
}
