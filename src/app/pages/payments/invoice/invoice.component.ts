import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice } from '../../../core/models/payment.model';
import { loadInvoice } from '../../../core/store/payments/payment.actions';
import { selectSelectedInvoice, selectPaymentIsLoading, selectPaymentError } from '../../../core/store/payments/payment.selectors';
import { InvoiceService } from '../../../core/services/invoice.service';

@Component({
    selector: 'app-invoice',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './invoice.component.html'
})
export class InvoiceComponent implements OnInit {
    private store = inject(Store);
    private route = inject(ActivatedRoute);

    invoice$: Observable<Invoice | null> = this.store.select(selectSelectedInvoice);
    isLoading$: Observable<boolean> = this.store.select(selectPaymentIsLoading);
    error$: Observable<any> = this.store.select(selectPaymentError);

    private invoiceService = inject(InvoiceService);

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.store.dispatch(loadInvoice({ id }));
            }
        });
    }

    printInvoice() {
        window.print();
    }

    downloadPdf() {
        const id = this.route.snapshot.params['id'];
        if (!id) return;

        this.invoiceService.downloadInvoice(id).subscribe({
            next: (blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoice-${id}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            },
            error: (err: any) => console.error('Download failed', err)
        });
    }
}
