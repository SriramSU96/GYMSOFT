import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createInvoice } from '../../../core/store/invoices/invoice.actions';

@Component({
  selector: 'app-invoice-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invoice-generator.html',
  styleUrl: './invoice-generator.css'
})
export class InvoiceGenerator {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  invoiceForm = this.fb.group({
    memberId: ['', Validators.required],
    planId: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0)]],
    tax: [0, Validators.min(0)]
  });

  onGenerate() {
    if (this.invoiceForm.valid) {
      const formValue = this.invoiceForm.value;
      const total = (formValue.amount || 0) + (formValue.tax || 0);
      this.store.dispatch(createInvoice({
        invoice: { ...formValue, total, gymId: 'gym123' } as any
      }));
    }
  }
}
