import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadPendingDues, sendReminder } from '../../../core/store/payments/payment.actions';
import { selectPendingDues, selectPaymentIsLoading, selectPaymentError } from '../../../core/store/payments/payment.selectors';

// ===================================
// INTERFACES
// ===================================

interface PendingPayment {
    id: string;
    memberId: string;
    memberName: string;
    phone: string;
    planType: string;
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
    daysOverdue: number;
    lastPaymentDate: Date;
}

interface CollectForm {
    collectAmount: number;
    paymentMethod: string;
    transactionId: string;
    notes: string;
}

// ===================================
// COMPONENT
// ===================================

@Component({
    selector: 'app-pending-dues',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './pending-dues.component.html'
})
export class PendingDuesComponent implements OnInit {
    private store = inject(Store);

    // ===================================
    // STATE MANAGEMENT
    // ===================================

    dues$: Observable<any[]> = this.store.select(selectPendingDues);
    isLoading$: Observable<boolean> = this.store.select(selectPaymentIsLoading);
    error$: Observable<any> = this.store.select(selectPaymentError);

    totalDues$: Observable<number> = this.dues$.pipe(
        map(dues => dues.reduce((total, d) => total + d.amount, 0))
    );

    // Pending payments data
    pendingPayments: PendingPayment[] = [];
    filteredPayments: PendingPayment[] = [];

    // Filters
    searchQuery: string = '';
    lastPaymentStartDate: string = '';
    lastPaymentEndDate: string = '';
    minDueAmount: number = 0;

    // Modal states
    showCollectModal: boolean = false;
    selectedPayment: PendingPayment | null = null;

    // Collection form
    collectForm: CollectForm = this.getEmptyCollectForm();

    // Success notification
    showSuccessNotification: boolean = false;
    successMessage: string = '';

    // ===================================
    // LIFECYCLE HOOKS
    // ===================================

    ngOnInit() {
        this.store.dispatch(loadPendingDues());
        this.loadPendingPayments();
    }

    // ===================================
    // DATA LOADING
    // ===================================

    /**
     * Load pending payments data
     * In production, this would call an API
     */
    loadPendingPayments() {
        // TODO: Replace with actual API call
        // Example: this.paymentService.getPendingPayments()

        // Generate mock data
        this.pendingPayments = this.generateMockPendingPayments();
        this.filteredPayments = [...this.pendingPayments];
    }

    /**
     * Generate mock pending payment data
     */
    generateMockPendingPayments(): PendingPayment[] {
        const mockData: PendingPayment[] = [];
        const members = [
            { id: 'M001', name: 'Rahul Sharma', phone: '+91 98765 43210' },
            { id: 'M002', name: 'Priya Patel', phone: '+91 98765 43211' },
            { id: 'M003', name: 'Amit Kumar', phone: '+91 98765 43212' },
            { id: 'M004', name: 'Sneha Reddy', phone: '+91 98765 43213' },
            { id: 'M005', name: 'Vikram Singh', phone: '+91 98765 43214' },
            { id: 'M006', name: 'Anita Desai', phone: '+91 98765 43215' },
            { id: 'M007', name: 'Rajesh Verma', phone: '+91 98765 43216' },
            { id: 'M008', name: 'Kavita Nair', phone: '+91 98765 43217' }
        ];

        const plans = ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];

        members.forEach((member, index) => {
            const totalAmount = 2000 + Math.floor(Math.random() * 8000);
            const paidAmount = Math.floor(totalAmount * (0.3 + Math.random() * 0.4)); // 30-70% paid
            const dueAmount = totalAmount - paidAmount;
            const daysOverdue = Math.floor(Math.random() * 60); // 0-60 days overdue

            const lastPaymentDate = new Date();
            lastPaymentDate.setDate(lastPaymentDate.getDate() - daysOverdue - Math.floor(Math.random() * 30));

            mockData.push({
                id: `DUE-${String(index + 1).padStart(4, '0')}`,
                memberId: member.id,
                memberName: member.name,
                phone: member.phone,
                planType: plans[index % plans.length],
                totalAmount,
                paidAmount,
                dueAmount,
                daysOverdue,
                lastPaymentDate
            });
        });

        // Sort by days overdue (highest first)
        return mockData.sort((a, b) => b.daysOverdue - a.daysOverdue);
    }

    // ===================================
    // FILTERING
    // ===================================

    /**
     * Apply all filters
     */
    applyFilters() {
        this.filteredPayments = this.pendingPayments.filter(payment => {
            // Search filter
            const matchesSearch = !this.searchQuery ||
                payment.memberName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                payment.phone.includes(this.searchQuery) ||
                payment.memberId.toLowerCase().includes(this.searchQuery.toLowerCase());

            // Last payment date range filter
            const lastPaymentDate = new Date(payment.lastPaymentDate);
            const matchesStartDate = !this.lastPaymentStartDate ||
                lastPaymentDate >= new Date(this.lastPaymentStartDate);
            const matchesEndDate = !this.lastPaymentEndDate ||
                lastPaymentDate <= new Date(this.lastPaymentEndDate);

            // Min due amount filter
            const matchesMinAmount = !this.minDueAmount || payment.dueAmount >= this.minDueAmount;

            return matchesSearch && matchesStartDate && matchesEndDate && matchesMinAmount;
        });
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.searchQuery = '';
        this.lastPaymentStartDate = '';
        this.lastPaymentEndDate = '';
        this.minDueAmount = 0;
        this.applyFilters();
    }

    // ===================================
    // STATISTICS
    // ===================================

    /**
     * Get total pending amount
     */
    getTotalPending(): number {
        return this.pendingPayments.reduce((sum, payment) => sum + payment.dueAmount, 0);
    }

    /**
     * Get average days overdue
     */
    getAvgDaysOverdue(): number {
        if (this.pendingPayments.length === 0) return 0;

        const totalDays = this.pendingPayments.reduce((sum, payment) => sum + payment.daysOverdue, 0);
        return Math.round(totalDays / this.pendingPayments.length);
    }

    // ===================================
    // COLLECT PAYMENT MODAL
    // ===================================

    /**
     * Open collect payment modal
     */
    openCollectModal(payment: PendingPayment) {
        this.selectedPayment = payment;
        this.collectForm = this.getEmptyCollectForm();
        this.collectForm.collectAmount = payment.dueAmount; // Default to full amount
        this.showCollectModal = true;
    }

    /**
     * Close collect modal
     */
    closeCollectModal() {
        this.showCollectModal = false;
        this.selectedPayment = null;
    }

    /**
     * Get empty collect form
     */
    getEmptyCollectForm(): CollectForm {
        return {
            collectAmount: 0,
            paymentMethod: '',
            transactionId: '',
            notes: ''
        };
    }

    /**
     * Get remaining due after collection
     */
    getRemainingDue(): number {
        if (!this.selectedPayment) return 0;
        return Math.max(0, this.selectedPayment.dueAmount - this.collectForm.collectAmount);
    }

    /**
     * Collect payment
     */
    collectPayment() {
        if (!this.selectedPayment) return;

        // Validate form
        if (!this.collectForm.collectAmount || !this.collectForm.paymentMethod) {
            alert('Please fill all required fields');
            return;
        }

        if (this.collectForm.collectAmount > this.selectedPayment.dueAmount) {
            alert('Collect amount cannot exceed due amount');
            return;
        }

        // TODO: Replace with actual API call
        // Example: this.paymentService.collectPayment(this.selectedPayment.id, this.collectForm)

        console.log('Collecting payment:', {
            payment: this.selectedPayment,
            collection: this.collectForm
        });

        // Update payment in list
        const index = this.pendingPayments.findIndex(p => p.id === this.selectedPayment!.id);
        if (index !== -1) {
            this.pendingPayments[index].paidAmount += this.collectForm.collectAmount;
            this.pendingPayments[index].dueAmount -= this.collectForm.collectAmount;

            // Remove from list if fully paid
            if (this.pendingPayments[index].dueAmount <= 0) {
                this.pendingPayments.splice(index, 1);
            }

            this.applyFilters();
        }

        // Show success message
        this.showSuccess(`Payment of ₹${this.collectForm.collectAmount} collected from ${this.selectedPayment.memberName}`);

        // Close modal
        this.closeCollectModal();
    }

    // ===================================
    // PAYMENT ACTIONS
    // ===================================

    /**
     * View payment history
     */
    viewHistory(payment: PendingPayment) {
        // TODO: Navigate to payment history or open modal
        console.log('Viewing history for:', payment);
        alert(`Payment history for ${payment.memberName} will be displayed here`);
    }

    /**
     * Send reminder (from store)
     */
    sendReminder(member: any) {
        if (member.memberId) {
            this.store.dispatch(sendReminder({ memberId: member.memberId }));
        } else {
            alert(`Reminder sent to ${member.name} for ₹${member.amount}`);
        }
    }

    /**
     * Check if date is overdue
     */
    isOverdue(dueDate: string): boolean {
        const today = new Date();
        return new Date(dueDate) < today;
    }

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================

    /**
     * Get initials from name
     */
    getInitials(name: string): string {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    /**
     * Get CSS class for due amount badge
     */
    getDueBadgeClass(dueAmount: number): string {
        if (dueAmount > 5000) return 'due-high';
        if (dueAmount > 2000) return 'due-medium';
        return 'amount-due';
    }

    /**
     * Get CSS class for overdue badge
     */
    getOverdueBadgeClass(daysOverdue: number): string {
        if (daysOverdue > 30) return 'overdue-critical';
        if (daysOverdue > 15) return 'overdue-high';
        return 'overdue-normal';
    }

    /**
     * Show success notification
     */
    showSuccess(message: string) {
        this.successMessage = message;
        this.showSuccessNotification = true;

        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.showSuccessNotification = false;
        }, 3000);
    }
}
