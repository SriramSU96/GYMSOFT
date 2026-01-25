import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ===================================
// INTERFACES
// ===================================

interface SalaryRecord {
  staffId: string;
  staffName: string;
  role: string;
  salaryType: 'Monthly' | 'Daily' | 'Hourly';
  month: string; // YYYY-MM format
  totalWorkingDays: number;
  presentDays: number;
  absentDays: number;
  workingHours: number;
  overtimeHours: number;
  baseSalaryAmount: number;
  overtimeAmount: number;
  bonuses: number;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  paymentStatus: 'Paid' | 'Pending' | 'Processing';
  paidDate?: Date;
}

interface SalaryConfiguration {
  staffId: string;
  salaryType: 'Monthly' | 'Daily' | 'Hourly';
  baseSalary: number;
  dailyRate: number;
  hourlyRate: number;
  overtimeRate: number;
  deductions: number;
}

interface MonthOption {
  value: string;
  label: string;
}

// ===================================
// COMPONENT
// ===================================

@Component({
  selector: 'app-salary-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salary-management.html',
  styleUrl: './salary-management.css'
})
export class SalaryManagement implements OnInit {

  // ===================================
  // STATE MANAGEMENT
  // ===================================

  salaryRecords: SalaryRecord[] = [];
  filteredSalaries: SalaryRecord[] = [];

  // Date management
  selectedMonth: string = this.getCurrentMonth();
  months: MonthOption[] = [];

  // Filters
  searchQuery: string = '';
  statusFilter: string = '';

  // Modal states
  showConfigModal: boolean = false;
  showDetailsModal: boolean = false;
  selectedSalary: SalaryRecord | null = null;

  // Salary configuration
  salaryConfig: SalaryConfiguration = {
    staffId: '',
    salaryType: 'Monthly',
    baseSalary: 0,
    dailyRate: 0,
    hourlyRate: 0,
    overtimeRate: 0,
    deductions: 0
  };

  // ===================================
  // LIFECYCLE HOOKS
  // ===================================

  ngOnInit() {
    this.months = this.generateMonths();
    this.loadSalaryData();
  }

  // ===================================
  // DATE MANAGEMENT
  // ===================================

  /**
   * Get current month in YYYY-MM format
   */
  getCurrentMonth(): string {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  }

  /**
   * Generate last 12 months for dropdown
   */
  generateMonths(): MonthOption[] {
    const months: MonthOption[] = [];
    const today = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      months.push({ value, label });
    }

    return months;
  }

  /**
   * Get month label from YYYY-MM format
   */
  getMonthLabel(monthValue: string): string {
    const month = this.months.find(m => m.value === monthValue);
    return month ? month.label : monthValue;
  }

  /**
   * Handle month change
   */
  onMonthChange() {
    this.loadSalaryData();
  }

  // ===================================
  // DATA LOADING
  // ===================================

  /**
   * Load salary data for selected month
   * In production, this would call an API
   */
  loadSalaryData() {
    // TODO: Replace with actual API call
    // Example: this.salaryService.getSalaryByMonth(this.selectedMonth)

    // Generate mock data for demonstration
    this.salaryRecords = this.generateMockSalaryData();
    this.filteredSalaries = [...this.salaryRecords];
  }

  /**
   * Generate mock salary data for demonstration
   */
  generateMockSalaryData(): SalaryRecord[] {
    const mockStaff = [
      { id: '1', name: 'Rajesh Kumar', role: 'Head Trainer', type: 'Monthly' as const },
      { id: '2', name: 'Priya Sharma', role: 'Yoga Instructor', type: 'Hourly' as const },
      { id: '3', name: 'Amit Patel', role: 'Receptionist', type: 'Monthly' as const },
      { id: '4', name: 'Sneha Reddy', role: 'Nutritionist', type: 'Daily' as const },
      { id: '5', name: 'Vikram Singh', role: 'Gym Trainer', type: 'Monthly' as const },
      { id: '6', name: 'Anita Desai', role: 'Cleaner', type: 'Daily' as const },
      { id: '7', name: 'Rahul Verma', role: 'Manager', type: 'Monthly' as const },
      { id: '8', name: 'Kavita Nair', role: 'Zumba Instructor', type: 'Hourly' as const }
    ];

    return mockStaff.map(staff => {
      const totalWorkingDays = 26;
      const presentDays = Math.floor(Math.random() * 4) + 22; // 22-26 days
      const absentDays = totalWorkingDays - presentDays;
      const workingHours = presentDays * 8 + Math.floor(Math.random() * 20);
      const overtimeHours = Math.floor(Math.random() * 15);

      let baseSalaryAmount = 0;
      let overtimeAmount = 0;

      // Calculate based on salary type
      if (staff.type === 'Monthly') {
        baseSalaryAmount = 25000 + Math.floor(Math.random() * 20000);
        overtimeAmount = overtimeHours * 200;
      } else if (staff.type === 'Daily') {
        const dailyRate = 800 + Math.floor(Math.random() * 400);
        baseSalaryAmount = dailyRate * presentDays;
        overtimeAmount = overtimeHours * 100;
      } else if (staff.type === 'Hourly') {
        const hourlyRate = 150 + Math.floor(Math.random() * 100);
        baseSalaryAmount = hourlyRate * workingHours;
        overtimeAmount = overtimeHours * hourlyRate * 1.5;
      }

      const bonuses = Math.random() > 0.7 ? Math.floor(Math.random() * 3000) : 0;
      const grossSalary = baseSalaryAmount + overtimeAmount + bonuses;
      const deductions = Math.floor(grossSalary * 0.1); // 10% deductions
      const netSalary = grossSalary - deductions;

      const statuses: ('Paid' | 'Pending' | 'Processing')[] = ['Paid', 'Pending', 'Processing'];
      const paymentStatus = statuses[Math.floor(Math.random() * statuses.length)];

      return {
        staffId: staff.id,
        staffName: staff.name,
        role: staff.role,
        salaryType: staff.type,
        month: this.selectedMonth,
        totalWorkingDays,
        presentDays,
        absentDays,
        workingHours,
        overtimeHours,
        baseSalaryAmount,
        overtimeAmount,
        bonuses,
        grossSalary,
        deductions,
        netSalary,
        paymentStatus,
        paidDate: paymentStatus === 'Paid' ? new Date() : undefined
      };
    });
  }

  // ===================================
  // SALARY GENERATION
  // ===================================

  /**
   * Generate salary for all staff for selected month
   */
  generateSalary() {
    // TODO: Replace with actual API call
    // Example: this.salaryService.generateSalaryForMonth(this.selectedMonth)

    console.log('Generating salary for month:', this.selectedMonth);

    // Reload data
    this.loadSalaryData();

    alert(`Salary generated successfully for ${this.getMonthLabel(this.selectedMonth)}`);
  }

  // ===================================
  // PAYMENT MANAGEMENT
  // ===================================

  /**
   * Mark salary as paid
   */
  markAsPaid(salary: SalaryRecord) {
    // TODO: Replace with actual API call
    // Example: this.salaryService.markSalaryAsPaid(salary.staffId, salary.month)

    const index = this.salaryRecords.findIndex(
      s => s.staffId === salary.staffId && s.month === salary.month
    );

    if (index !== -1) {
      this.salaryRecords[index].paymentStatus = 'Paid';
      this.salaryRecords[index].paidDate = new Date();
      this.applyFilters();

      console.log('Marked as paid:', salary);
      alert(`Payment marked as completed for ${salary.staffName}`);

      // Close details modal if open
      if (this.showDetailsModal) {
        this.closeDetailsModal();
      }
    }
  }

  // ===================================
  // FILTERING
  // ===================================

  /**
   * Apply filters to salary records
   */
  applyFilters() {
    this.filteredSalaries = this.salaryRecords.filter(salary => {
      // Search filter
      const matchesSearch = !this.searchQuery ||
        salary.staffName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        salary.role.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = !this.statusFilter ||
        salary.paymentStatus === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  // ===================================
  // STATISTICS
  // ===================================

  /**
   * Get total payroll amount
   */
  getTotalPayroll(): number {
    return this.salaryRecords.reduce((sum, salary) => sum + salary.netSalary, 0);
  }

  /**
   * Get count of pending payments
   */
  getPendingCount(): number {
    return this.salaryRecords.filter(s => s.paymentStatus === 'Pending').length;
  }

  /**
   * Get count of paid salaries
   */
  getPaidCount(): number {
    return this.salaryRecords.filter(s => s.paymentStatus === 'Paid').length;
  }

  // ===================================
  // MODAL MANAGEMENT - CONFIGURATION
  // ===================================

  /**
   * Open salary configuration modal
   */
  openSalaryConfig(salary: SalaryRecord) {
    this.selectedSalary = salary;

    // Load existing configuration or defaults
    this.salaryConfig = {
      staffId: salary.staffId,
      salaryType: salary.salaryType,
      baseSalary: salary.salaryType === 'Monthly' ? salary.baseSalaryAmount : 0,
      dailyRate: salary.salaryType === 'Daily' ? salary.baseSalaryAmount / salary.presentDays : 0,
      hourlyRate: salary.salaryType === 'Hourly' ? salary.baseSalaryAmount / salary.workingHours : 0,
      overtimeRate: salary.overtimeHours > 0 ? salary.overtimeAmount / salary.overtimeHours : 0,
      deductions: salary.deductions
    };

    this.showConfigModal = true;
  }

  /**
   * Close salary configuration modal
   */
  closeConfigModal() {
    this.showConfigModal = false;
    this.selectedSalary = null;
  }

  /**
   * Handle salary type change in config
   */
  onSalaryTypeChange() {
    // Reset values when type changes
    this.salaryConfig.baseSalary = 0;
    this.salaryConfig.dailyRate = 0;
    this.salaryConfig.hourlyRate = 0;
  }

  /**
   * Save salary configuration
   */
  saveSalaryConfig() {
    // TODO: Replace with actual API call
    // Example: this.salaryService.updateSalaryConfig(this.salaryConfig)

    console.log('Saving salary configuration:', this.salaryConfig);

    // Update the salary record
    const index = this.salaryRecords.findIndex(
      s => s.staffId === this.salaryConfig.staffId && s.month === this.selectedMonth
    );

    if (index !== -1) {
      this.salaryRecords[index].salaryType = this.salaryConfig.salaryType;
      // Recalculate salary based on new configuration
      // In production, this would be done on the backend
      this.applyFilters();
    }

    alert('Salary configuration saved successfully');
    this.closeConfigModal();
  }

  // ===================================
  // MODAL MANAGEMENT - DETAILS
  // ===================================

  /**
   * View salary details
   */
  viewSalaryDetails(salary: SalaryRecord) {
    this.selectedSalary = salary;
    this.showDetailsModal = true;
  }

  /**
   * Close salary details modal
   */
  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedSalary = null;
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
   * Get CSS class for salary type badge
   */
  getSalaryTypeClass(type: string): string {
    const typeMap: { [key: string]: string } = {
      'Monthly': 'salary-type-monthly',
      'Daily': 'salary-type-daily',
      'Hourly': 'salary-type-hourly'
    };
    return typeMap[type] || '';
  }

  /**
   * Get CSS class for payment status badge
   */
  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Paid': 'badge-paid',
      'Pending': 'badge-pending',
      'Processing': 'badge-processing'
    };
    return statusMap[status] || 'badge-neutral';
  }
}
