import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPendingPayments } from '../../../core/store/payments/payment.actions';
import { selectAllPayments, selectPaymentLoading } from '../../../core/store/payments/payment.selectors';

// ===================================
// INTERFACES
// ===================================

interface Payment {
  id: string;
  invoiceNo: string;
  memberId: string;
  memberName: string;
  phone: string;
  planType: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  paymentMethod: 'Cash' | 'Card' | 'UPI' | 'Bank Transfer';
  transactionId?: string;
  status: 'Paid' | 'Pending' | 'Partial';
  paymentDate: Date;
  notes?: string;
}

interface PaymentForm {
  memberId: string;
  planType: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  notes: string;
}

interface Member {
  id: string;
  name: string;
  phone: string;
}

// ===================================
// COMPONENT
// ===================================

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './payment-list.html'
})
export class PaymentList implements OnInit {
  store = inject(Store);

  // ===================================
  // STATE MANAGEMENT
  // ===================================

  payments$ = this.store.select(selectAllPayments);
  isLoading$ = this.store.select(selectPaymentLoading);

  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  membersList: Member[] = [];

  // Filters
  searchQuery: string = '';
  startDate: string = '';
  endDate: string = '';
  statusFilter: string = '';
  methodFilter: string = '';

  // Modal states
  showPaymentModal: boolean = false;
  showInvoiceModal: boolean = false;
  editingPayment: Payment | null = null;
  selectedPayment: Payment | null = null;

  // Payment form
  paymentForm: PaymentForm = this.getEmptyForm();

  // ===================================
  // LIFECYCLE HOOKS
  // ===================================

  ngOnInit() {
    this.store.dispatch(loadPendingPayments());
    this.loadPayments();
    this.loadMembers();
  }

  // ===================================
  // DATA LOADING
  // ===================================

  /**
   * Load payments data
   * In production, this would call an API
   */
  loadPayments() {
    // TODO: Replace with actual API call
    // Example: this.paymentService.getPayments()

    // Generate mock data
    this.payments = this.generateMockPayments();
    this.filteredPayments = [...this.payments];
  }

  /**
   * Load members list for dropdown
   */
  loadMembers() {
    // TODO: Replace with actual API call
    // Example: this.memberService.getMembers()

    // Mock members data
    this.membersList = [
      { id: 'M001', name: 'Rahul Sharma', phone: '+91 98765 43210' },
      { id: 'M002', name: 'Priya Patel', phone: '+91 98765 43211' },
      { id: 'M003', name: 'Amit Kumar', phone: '+91 98765 43212' },
      { id: 'M004', name: 'Sneha Reddy', phone: '+91 98765 43213' },
      { id: 'M005', name: 'Vikram Singh', phone: '+91 98765 43214' }
    ];
  }

  /**
   * Generate mock payment data
   */
  generateMockPayments(): Payment[] {
    const mockData: Payment[] = [];
    const statuses: ('Paid' | 'Pending' | 'Partial')[] = ['Paid', 'Paid', 'Paid', 'Pending', 'Partial'];
    const methods: ('Cash' | 'Card' | 'UPI' | 'Bank Transfer')[] = ['Cash', 'Card', 'UPI', 'Bank Transfer'];
    const plans = ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly', 'Personal Training'];

    for (let i = 0; i < 20; i++) {
      const totalAmount = 1000 + Math.floor(Math.random() * 9000);
      const status = statuses[i % statuses.length];
      const paidAmount = status === 'Paid' ? totalAmount :
        status === 'Partial' ? Math.floor(totalAmount * 0.5) : 0;
      const dueAmount = totalAmount - paidAmount;

      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      mockData.push({
        id: `PAY-${String(i + 1).padStart(4, '0')}`,
        invoiceNo: `INV-${String(1000 + i)}`,
        memberId: `M00${(i % 5) + 1}`,
        memberName: this.membersList[i % 5]?.name || 'Member',
        phone: this.membersList[i % 5]?.phone || '+91 00000 00000',
        planType: plans[i % plans.length],
        totalAmount,
        paidAmount,
        dueAmount,
        paymentMethod: methods[i % methods.length],
        transactionId: methods[i % methods.length] !== 'Cash' ? `TXN${Math.random().toString(36).substring(2, 10).toUpperCase()}` : undefined,
        status,
        paymentDate: date,
        notes: i % 3 === 0 ? 'Renewal payment' : undefined
      });
    }

    return mockData.sort((a, b) => b.paymentDate.getTime() - a.paymentDate.getTime());
  }

  // ===================================
  // FILTERING
  // ===================================

  /**
   * Apply all filters
   */
  applyFilters() {
    this.filteredPayments = this.payments.filter(payment => {
      // Search filter
      const matchesSearch = !this.searchQuery ||
        payment.memberName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        payment.phone.includes(this.searchQuery) ||
        payment.invoiceNo.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Date range filter
      const paymentDate = new Date(payment.paymentDate);
      const matchesStartDate = !this.startDate || paymentDate >= new Date(this.startDate);
      const matchesEndDate = !this.endDate || paymentDate <= new Date(this.endDate);

      // Status filter
      const matchesStatus = !this.statusFilter || payment.status === this.statusFilter;

      // Method filter
      const matchesMethod = !this.methodFilter || payment.paymentMethod === this.methodFilter;

      return matchesSearch && matchesStartDate && matchesEndDate && matchesStatus && matchesMethod;
    });
  }

  /**
   * Clear all filters
   */
  clearFilters() {
    this.searchQuery = '';
    this.startDate = '';
    this.endDate = '';
    this.statusFilter = '';
    this.methodFilter = '';
    this.applyFilters();
  }

  // ===================================
  // STATISTICS
  // ===================================

  /**
   * Get total collected amount
   */
  getTotalCollected(): number {
    return this.payments.reduce((sum, payment) => sum + payment.paidAmount, 0);
  }

  /**
   * Get total dues amount
   */
  getTotalDues(): number {
    return this.payments.reduce((sum, payment) => sum + payment.dueAmount, 0);
  }

  // ===================================
  // PAYMENT MODAL
  // ===================================

  /**
   * Open add payment modal
   */
  openAddPaymentModal() {
    this.editingPayment = null;
    this.paymentForm = this.getEmptyForm();
    this.showPaymentModal = true;
  }

  /**
   * Close payment modal
   */
  closePaymentModal() {
    this.showPaymentModal = false;
    this.editingPayment = null;
  }

  /**
   * Get empty form
   */
  getEmptyForm(): PaymentForm {
    return {
      memberId: '',
      planType: '',
      totalAmount: 0,
      paidAmount: 0,
      dueAmount: 0,
      paymentMethod: '',
      transactionId: '',
      paymentDate: new Date().toISOString().split('T')[0],
      notes: ''
    };
  }

  /**
   * Handle plan type change
   */
  onPlanTypeChange() {
    // Set default amounts based on plan type
    const planPrices: { [key: string]: number } = {
      'Monthly': 2000,
      'Quarterly': 5500,
      'Half-Yearly': 10000,
      'Yearly': 18000,
      'Personal Training': 5000
    };

    if (this.paymentForm.planType && planPrices[this.paymentForm.planType]) {
      this.paymentForm.totalAmount = planPrices[this.paymentForm.planType];
      this.calculateDue();
    }
  }

  /**
   * Calculate due amount
   */
  calculateDue() {
    this.paymentForm.dueAmount = Math.max(0, this.paymentForm.totalAmount - this.paymentForm.paidAmount);
  }

  /**
   * Save payment
   */
  savePayment() {
    // Validate form
    if (!this.paymentForm.memberId || !this.paymentForm.planType ||
      !this.paymentForm.totalAmount || !this.paymentForm.paymentMethod) {
      alert('Please fill all required fields');
      return;
    }

    // TODO: Replace with actual API call
    // Example: this.paymentService.createPayment(this.paymentForm)

    // Get member details
    const member = this.membersList.find(m => m.id === this.paymentForm.memberId);
    if (!member) return;

    // Determine status
    let status: 'Paid' | 'Pending' | 'Partial' = 'Pending';
    if (this.paymentForm.paidAmount >= this.paymentForm.totalAmount) {
      status = 'Paid';
    } else if (this.paymentForm.paidAmount > 0) {
      status = 'Partial';
    }

    // Create new payment
    const newPayment: Payment = {
      id: `PAY-${String(this.payments.length + 1).padStart(4, '0')}`,
      invoiceNo: `INV-${String(1000 + this.payments.length)}`,
      memberId: this.paymentForm.memberId,
      memberName: member.name,
      phone: member.phone,
      planType: this.paymentForm.planType,
      totalAmount: this.paymentForm.totalAmount,
      paidAmount: this.paymentForm.paidAmount,
      dueAmount: this.paymentForm.dueAmount,
      paymentMethod: this.paymentForm.paymentMethod as any,
      transactionId: this.paymentForm.transactionId || undefined,
      status,
      paymentDate: new Date(this.paymentForm.paymentDate),
      notes: this.paymentForm.notes || undefined
    };

    // Add to list
    this.payments.unshift(newPayment);
    this.applyFilters();

    // Close modal
    this.closePaymentModal();
    alert('Payment added successfully!');
  }

  // ===================================
  // PAYMENT ACTIONS
  // ===================================

  /**
   * View payment details
   */
  viewPayment(payment: Payment) {
    this.selectedPayment = payment;
    // Could open a details modal here
    console.log('Viewing payment:', payment);
  }

  /**
   * View invoice
   */
  viewInvoice(payment: Payment) {
    this.selectedPayment = payment;
    this.showInvoiceModal = true;
  }

  /**
   * Close invoice modal
   */
  closeInvoiceModal() {
    this.showInvoiceModal = false;
    this.selectedPayment = null;
  }

  /**
   * Print invoice
   */
  printInvoice() {
    const printContent = document.getElementById('invoiceContent');
    if (!printContent) return;

    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;

    printWindow.document.write('<html><head><title>Invoice</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; padding: 20px; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }

  /**
   * Download invoice as PDF
   */
  downloadInvoice() {
    // TODO: Implement PDF generation
    // Example: Use jsPDF or html2pdf library
    alert('PDF download functionality will be implemented with jsPDF library');
  }

  /**
   * Initiate refund
   */
  initiateRefund(payment: Payment) {
    const confirmed = confirm(`Are you sure you want to refund ₹${payment.paidAmount} for ${payment.memberName}?`);

    if (confirmed) {
      // TODO: Replace with actual API call
      // Example: this.paymentService.initiateRefund(payment.id)

      console.log('Refund initiated for:', payment);
      alert('Refund request submitted successfully');
    }
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
   * Get CSS class for payment method badge
   */
  getMethodBadgeClass(method: string): string {
    const methodMap: { [key: string]: string } = {
      'Cash': 'method-cash',
      'Card': 'method-card',
      'UPI': 'method-upi',
      'Bank Transfer': 'method-bank'
    };
    return methodMap[method] || '';
  }

  /**
   * Get icon for payment method
   */
  getMethodIcon(method: string): string {
    const iconMap: { [key: string]: string } = {
      'Cash': 'payments',
      'Card': 'credit_card',
      'UPI': 'qr_code_2',
      'Bank Transfer': 'account_balance'
    };
    return iconMap[method] || 'payment';
  }

  /**
   * Get CSS class for status badge
   */
  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Paid': 'badge-paid',
      'Pending': 'badge-pending',
      'Partial': 'badge-partial'
    };
    return statusMap[status] || 'badge-neutral';
  }
}
