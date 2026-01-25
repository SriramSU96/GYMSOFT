import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadStaff } from '../../../core/store/staff/staff.actions';
import { selectAllStaff } from '../../../core/store/staff/staff.selectors';

// ===================================
// INTERFACES
// ===================================

interface Staff {
  _id?: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
}

interface AttendanceRecord {
  staffId: string;
  status: 'Present' | 'Absent' | 'Leave';
  checkInTime: string;
  checkOutTime: string;
  workingHours: number;
  remarks: string;
  date: string;
}

interface MonthlyStats {
  present: number;
  absent: number;
  leaves: number;
  overtime: number;
}

// ===================================
// COMPONENT
// ===================================

@Component({
  selector: 'app-staff-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-attendance.html'
})
export class StaffAttendance implements OnInit {
  private store = inject(Store);

  // ===================================
  // STATE MANAGEMENT
  // ===================================

  staff$ = this.store.select(selectAllStaff);
  staffList: Staff[] = [];
  filteredStaff: Staff[] = [];

  // Current date selection
  selectedDate: string = this.getTodayDate();

  // Tab management
  activeTab: 'today' | 'history' = 'today';

  // Attendance records (indexed by staffId)
  attendanceRecords: { [staffId: string]: AttendanceRecord } = {};

  // Edit state tracking
  isEditing: { [staffId: string]: boolean } = {};

  // Backup for cancel functionality
  backupRecords: { [staffId: string]: AttendanceRecord } = {};

  // Filters
  searchQuery: string = '';
  statusFilter: string = '';

  // Monthly history
  selectedMonth: string = this.getCurrentMonth();
  months = this.generateMonths();
  monthlyHistory: { [staffId: string]: AttendanceRecord[] } = {};

  // ===================================
  // LIFECYCLE HOOKS
  // ===================================

  ngOnInit() {
    // Load staff from store
    this.store.dispatch(loadStaff({}));

    // Subscribe to staff data
    this.staff$.subscribe(staff => {
      this.staffList = staff;
      this.filteredStaff = staff;
      this.initializeAttendanceRecords();
    });

    // Load today's attendance
    this.loadTodayAttendance();
  }

  // ===================================
  // INITIALIZATION
  // ===================================

  /**
   * Initialize attendance records for all staff
   */
  initializeAttendanceRecords() {
    this.staffList.forEach(staff => {
      if (staff._id && !this.attendanceRecords[staff._id]) {
        this.attendanceRecords[staff._id] = {
          staffId: staff._id,
          status: 'Present',
          checkInTime: '',
          checkOutTime: '',
          workingHours: 0,
          remarks: '',
          date: this.selectedDate
        };
        this.isEditing[staff._id] = false;
      }
    });
  }

  // ===================================
  // DATE MANAGEMENT
  // ===================================

  /**
   * Get today's date in YYYY-MM-DD format
   */
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

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
  generateMonths() {
    const months = [];
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
   * Handle date change
   */
  onDateChange() {
    this.loadTodayAttendance();
  }

  // ===================================
  // DATA LOADING
  // ===================================

  /**
   * Load attendance for selected date
   * In production, this would call an API
   */
  loadTodayAttendance() {
    // TODO: Replace with actual API call
    // Example: this.attendanceService.getAttendanceByDate(this.selectedDate)

    // For now, initialize with default values
    this.staffList.forEach(staff => {
      if (staff._id) {
        this.attendanceRecords[staff._id] = {
          staffId: staff._id,
          status: 'Present',
          checkInTime: '09:00',
          checkOutTime: '',
          workingHours: 0,
          remarks: '',
          date: this.selectedDate
        };
      }
    });
  }

  /**
   * Load monthly history
   * In production, this would call an API
   */
  loadMonthlyHistory() {
    // TODO: Replace with actual API call
    // Example: this.attendanceService.getMonthlyHistory(this.selectedMonth)

    // Mock data for demonstration
    this.staffList.forEach(staff => {
      if (staff._id) {
        this.monthlyHistory[staff._id] = this.generateMockMonthlyData(staff._id);
      }
    });
  }

  /**
   * Generate mock monthly data for demonstration
   */
  generateMockMonthlyData(staffId: string): AttendanceRecord[] {
    const records: AttendanceRecord[] = [];
    const daysInMonth = 22; // Average working days

    for (let i = 0; i < daysInMonth; i++) {
      const statuses: ('Present' | 'Absent' | 'Leave')[] = ['Present', 'Present', 'Present', 'Absent', 'Leave'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      records.push({
        staffId,
        status: randomStatus,
        checkInTime: randomStatus === 'Present' ? '09:00' : '',
        checkOutTime: randomStatus === 'Present' ? '18:00' : '',
        workingHours: randomStatus === 'Present' ? 9 : 0,
        remarks: '',
        date: `${this.selectedMonth}-${String(i + 1).padStart(2, '0')}`
      });
    }

    return records;
  }

  // ===================================
  // ATTENDANCE MANAGEMENT
  // ===================================

  /**
   * Toggle edit mode for a staff member
   */
  toggleEdit(staffId: string) {
    this.isEditing[staffId] = true;
    // Backup current record for cancel functionality
    this.backupRecords[staffId] = { ...this.attendanceRecords[staffId] };
  }

  /**
   * Cancel edit and restore backup
   */
  cancelEdit(staffId: string) {
    this.isEditing[staffId] = false;
    if (this.backupRecords[staffId]) {
      this.attendanceRecords[staffId] = { ...this.backupRecords[staffId] };
    }
  }

  /**
   * Handle status change
   */
  onStatusChange(staffId: string) {
    const record = this.attendanceRecords[staffId];

    // Clear times if not present
    if (record.status !== 'Present') {
      record.checkInTime = '';
      record.checkOutTime = '';
      record.workingHours = 0;
    }
  }

  /**
   * Calculate working hours based on check-in and check-out times
   */
  calculateWorkingHours(staffId: string) {
    const record = this.attendanceRecords[staffId];

    if (record.checkInTime && record.checkOutTime) {
      const checkIn = this.parseTime(record.checkInTime);
      const checkOut = this.parseTime(record.checkOutTime);

      if (checkOut > checkIn) {
        const diffMs = checkOut.getTime() - checkIn.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        record.workingHours = Math.round(diffHours * 100) / 100; // Round to 2 decimals
      } else {
        record.workingHours = 0;
      }
    } else {
      record.workingHours = 0;
    }
  }

  /**
   * Parse time string to Date object
   */
  parseTime(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  /**
   * Get working hours for display
   */
  getWorkingHours(staffId: string): number {
    return this.attendanceRecords[staffId]?.workingHours || 0;
  }

  /**
   * Check if checkout is missing
   */
  isMissingCheckout(staffId: string): boolean {
    const record = this.attendanceRecords[staffId];
    return record?.status === 'Present' &&
      record?.checkInTime !== '' &&
      record?.checkOutTime === '';
  }

  // ===================================
  // SAVE OPERATIONS
  // ===================================

  /**
   * Save single staff attendance
   */
  saveAttendance(staffId: string) {
    const record = this.attendanceRecords[staffId];

    // Validate
    if (record.status === 'Present' && !record.checkInTime) {
      alert('Please enter check-in time for present staff');
      return;
    }

    // TODO: Replace with actual API call
    // Example: this.attendanceService.saveAttendance(record)

    console.log('Saving attendance:', record);

    // Exit edit mode
    this.isEditing[staffId] = false;

    // Show success message (in production, use a toast service)
    alert(`Attendance saved for ${this.getStaffName(staffId)}`);
  }

  /**
   * Save all attendance records
   */
  saveAllAttendance() {
    const recordsToSave = Object.values(this.attendanceRecords);

    // Validate all records
    for (const record of recordsToSave) {
      if (record.status === 'Present' && !record.checkInTime) {
        alert(`Please enter check-in time for all present staff`);
        return;
      }
    }

    // TODO: Replace with actual API call
    // Example: this.attendanceService.saveBulkAttendance(recordsToSave)

    console.log('Saving all attendance:', recordsToSave);

    // Exit all edit modes
    Object.keys(this.isEditing).forEach(staffId => {
      this.isEditing[staffId] = false;
    });

    // Show success message
    alert('All attendance records saved successfully');
  }

  // ===================================
  // FILTERING
  // ===================================

  /**
   * Apply filters to staff list
   */
  applyFilters() {
    this.filteredStaff = this.staffList.filter(staff => {
      // Search filter
      const matchesSearch = !this.searchQuery ||
        staff.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        staff.role.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = !this.statusFilter ||
        (staff._id && this.attendanceRecords[staff._id]?.status === this.statusFilter);

      return matchesSearch && matchesStatus;
    });
  }

  // ===================================
  // MONTHLY STATISTICS
  // ===================================

  /**
   * Get monthly statistics for a staff member
   */
  getMonthlyStats(staffId: string): MonthlyStats {
    const records = this.monthlyHistory[staffId] || [];

    const stats: MonthlyStats = {
      present: 0,
      absent: 0,
      leaves: 0,
      overtime: 0
    };

    records.forEach(record => {
      if (record.status === 'Present') {
        stats.present++;
        // Calculate overtime (hours > 8)
        if (record.workingHours > 8) {
          stats.overtime += (record.workingHours - 8);
        }
      } else if (record.status === 'Absent') {
        stats.absent++;
      } else if (record.status === 'Leave') {
        stats.leaves++;
      }
    });

    // Round overtime to 2 decimals
    stats.overtime = Math.round(stats.overtime * 100) / 100;

    return stats;
  }

  // ===================================
  // UTILITY FUNCTIONS
  // ===================================

  /**
   * Get staff name by ID
   */
  getStaffName(staffId: string): string {
    const staff = this.staffList.find(s => s._id === staffId);
    return staff?.name || 'Unknown';
  }

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
}
