import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadPendingDues, sendReminder } from '../../../core/store/payments/payment.actions';
import { selectPendingDues, selectPaymentIsLoading, selectPaymentError } from '../../../core/store/payments/payment.selectors';

@Component({
    selector: 'app-pending-dues',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pending-dues.component.html'
})
export class PendingDuesComponent implements OnInit {
    private store = inject(Store);

    dues$: Observable<any[]> = this.store.select(selectPendingDues);
    isLoading$: Observable<boolean> = this.store.select(selectPaymentIsLoading);
    error$: Observable<any> = this.store.select(selectPaymentError);

    totalDues$: Observable<number> = this.dues$.pipe(
        map(dues => dues.reduce((total, d) => total + d.amount, 0))
    );

    ngOnInit() {
        this.store.dispatch(loadPendingDues());
    }

    sendReminder(member: any) {
        if (member.memberId) {
            this.store.dispatch(sendReminder({ memberId: member.memberId }));
        } else {
            alert(`Reminder sent to ${member.name} for ₹${member.amount}`);
        }
    }

    isOverdue(dueDate: string): boolean {
        const today = new Date('2026-01-07');
        return new Date(dueDate) < today;
    }
}
