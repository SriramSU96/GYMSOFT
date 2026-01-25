import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { loadAllAttendance } from '../../../core/store/attendance/attendance.actions';
import { selectAttendanceRecords, selectAttendanceIsLoading } from '../../../core/store/attendance/attendance.selectors';
import { selectMembers } from '../../../core/store/members/member.selectors';
import { loadMembers } from '../../../core/store/members/member.actions';
import { Attendance } from '../../../core/models/attendance.model';
import { Member } from '../../../core/models/member.model';

// ===================================
// INTERFACES
// ===================================

interface AttendanceRecord {
  memberId: string;
  memberName: string;
  phone: string;
  membershipStatus: 'Active' | 'Expired' | 'Expiring';
  checkInTime: string;
  checkOutTime: string;
  method: 'QR' | 'Manual';
  status: 'Present' | 'Checked Out' | 'Not Visited';
  date: string;
}

interface CalendarDay {
  day: number;
  status: 'Present' | 'Absent' | null;
  isFuture: boolean;
  tooltip: string;
}

interface RecentVisit {
  date: Date;
  checkIn: string;
  checkOut: string;
  method: 'QR' | 'Manual';
}

// ===================================
// COMPONENT
// ===================================

@Component({
  selector: 'app-attendance-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-log.html',
  styleUrl: './attendance-log.css'
})
export class AttendanceLog implements OnInit {
  private store = inject(Store);

  // ===================================
  // STATE MANAGEMENT
  // ===================================

  logs$: Observable<Attendance[]> = this.store.select(selectAttendanceRecords);
  members$: Observable<Member[]> = this.store.select(selectMembers);
  isLoading$: Observable<boolean> = this.store.select(selectAttendanceIsLoading);

  // Attendance data
  attendanceRecords: AttendanceRecord[] = [];
  filteredAttendance: AttendanceRecord[] = [];

  // Date selection
  selectedDate: string = this.getTodayDate();

  // Filters
  searchQuery: string = '';
  statusFilter: string = '';
  methodFilter: string = '';

  // Modal state
  showHistoryModal: boolean = false;
  selectedMember: AttendanceRecord | null = null;

  // Success notification
  showSuccessNotification: boolean = false;
  successMessage: string = '';

  // Enriched logs with member names
  enrichedLogs$ = combineLatest([this.logs$, this.members$]).pipe(
    map(([logs, members]: [Attendance[], Member[]]) => {
      return logs.map(log => ({
        ...log,
        memberName: members.find(m => m._id === log.memberId)?.name || 'Unknown Member'
      }));
    })
  );

  // ===================================
  // LIFECYCLE HOOKS
  // ===================================

  ngOnInit(): void {
    this.store.dispatch(loadAllAttendance());
    this.store.dispatch(loadMembers());

    // Subscribe to enriched logs
    this.enrichedLogs$.subscribe(logs => {
      this.loadAttendanceData();
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
   * Handle date change
   */
  onDateChange() {
    this.loadAttendanceData();
  }

  // ===================================
  // DATA LOADING
  // ===================================

  /**
   * Load attendance data for selected date
   * In production, this would call an API
   */
  loadAttendanceData() {
    // TODO: Replace with actual API call
    // Example: this.attendanceService.getAttendanceByDate(this.selectedDate)

    // Generate mock data for demonstration
    this.attendanceRecords = this.generateMockAttendanceData();
    this.filteredAttendance = [...this.attendanceRecords];
  }

  /**
   * Generate mock attendance data for demonstration
   */
  generateMockAttendanceData(): AttendanceRecord[] {
    const mockMembers = [
      { id: 'M001', name: 'Rahul Sharma', phone: '+91 98765 43210', membership: 'Active' as const },
      { id: 'M002', name: 'Priya Patel', phone: '+91 98765 43211', membership: 'Active' as const },
      { id: 'M003', name: 'Amit Kumar', phone: '+91 98765 43212', membership: 'Expiring' as const },
      { id: 'M004', name: 'Sneha Reddy', phone: '+91 98765 43213', membership: 'Active' as const },
      { id: 'M005', name: 'Vikram Singh', phone: '+91 98765 43214', membership: 'Active' as const },
      { id: 'M006', name: 'Anita Desai', phone: '+91 98765 43215', membership: 'Expired' as const },
      { id: 'M007', name: 'Rajesh Verma', phone: '+91 98765 43216', membership: 'Active' as const },
      { id: 'M008', name: 'Kavita Nair', phone: '+91 98765 43217', membership: 'Active' as const },
      { id: 'M009', name: 'Suresh Iyer', phone: '+91 98765 43218', membership: 'Active' as const },
      { id: 'M010', name: 'Deepa Menon', phone: '+91 98765 43219', membership: 'Not Visited' as const }
    ];

    return mockMembers.map((member, index) => {
      const statuses: ('Present' | 'Checked Out' | 'Not Visited')[] =
        ['Present', 'Present', 'Checked Out', 'Checked Out', 'Not Visited'];
      const status = statuses[index % statuses.length];

      const methods: ('QR' | 'Manual')[] = ['QR', 'QR', 'QR', 'Manual'];
      const method = methods[index % methods.length];

      const checkInHour = 6 + Math.floor(Math.random() * 4); // 6 AM to 10 AM
      const checkInMinute = Math.floor(Math.random() * 60);
      const checkInTime = status !== 'Not Visited'
        ? `${String(checkInHour).padStart(2, '0')}:${String(checkInMinute).padStart(2, '0')}`
        : '';

      const checkOutHour = checkInHour + 1 + Math.floor(Math.random() * 2); // 1-3 hours later
      const checkOutMinute = Math.floor(Math.random() * 60);
      const checkOutTime = status === 'Checked Out'
        ? `${String(checkOutHour).padStart(2, '0')}:${String(checkOutMinute).padStart(2, '0')}`
        : '';

      return {
        memberId: member.id,
        memberName: member.name,
        phone: member.phone,
        membershipStatus: member.membership,
        checkInTime,
        checkOutTime,
        method,
        status,
        date: this.selectedDate
      };
    });
  }

  // ===================================
  // CHECK-IN / CHECK-OUT
  // ===================================

  /**
   * Quick check-in for a member
   */
  quickCheckIn(record: AttendanceRecord) {
    // TODO: Replace with actual API call
    // Example: this.attendanceService.checkIn(record.memberId)

    const now = new Date();
    const checkInTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const index = this.attendanceRecords.findIndex(r => r.memberId === record.memberId);
    if (index !== -1) {
      this.attendanceRecords[index].checkInTime = checkInTime;
      this.attendanceRecords[index].status = 'Present';
      this.attendanceRecords[index].method = 'Manual';
      this.applyFilters();

      this.showSuccess(`${record.memberName} checked in at ${checkInTime}`);
    }
  }

  /**
   * Quick check-out for a member
   */
  quickCheckOut(record: AttendanceRecord) {
    // TODO: Replace with actual API call
    // Example: this.attendanceService.checkOut(record.memberId)

    const now = new Date();
    const checkOutTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const index = this.attendanceRecords.findIndex(r => r.memberId === record.memberId);
    if (index !== -1) {
      this.attendanceRecords[index].checkOutTime = checkOutTime;
      this.attendanceRecords[index].status = 'Checked Out';
      this.applyFilters();

      this.showSuccess(`${record.memberName} checked out at ${checkOutTime}`);
    }
  }

  /**
   * Open QR scanner (placeholder)
   */
  openQRScanner() {
    // TODO: Implement QR scanner integration
    // Example: this.router.navigate(['/attendance/qr-scanner'])

    alert('QR Scanner will be integrated here. This will open the camera to scan member QR codes for instant check-in.');
  }

  // ===================================
  // FILTERING
  // ===================================

  /**
   * Apply filters to attendance records
   */
  applyFilters() {
    this.filteredAttendance = this.attendanceRecords.filter(record => {
      // Search filter
      const matchesSearch = !this.searchQuery ||
        record.memberName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        record.phone.includes(this.searchQuery);

      // Status filter
      const matchesStatus = !this.statusFilter || record.status === this.statusFilter;

      // Method filter
      const matchesMethod = !this.methodFilter || record.method === this.methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }

  // ===================================
  // STATISTICS
  // ===================================

  /**
   * Get count of present members
   */
  getPresentCount(): number {
    return this.attendanceRecords.filter(r => r.status === 'Present' || r.status === 'Checked Out').length;
  }

  /**
   * Get count of currently active members (checked in but not checked out)
   */
  getActiveCount(): number {
    return this.attendanceRecords.filter(r => r.status === 'Present').length;
  }

  /**
   * Get attendance rate percentage
   */
  getAttendanceRate(): number {
    const total = this.attendanceRecords.length;
    if (total === 0) return 0;

    const present = this.getPresentCount();
    return Math.round((present / total) * 100);
  }

  // ===================================
  // MEMBER HISTORY MODAL
  // ===================================

  /**
   * View member attendance history
   */
  viewHistory(record: AttendanceRecord) {
    this.selectedMember = record;
    this.showHistoryModal = true;
  }

  /**
   * Close history modal
   */
  closeHistoryModal() {
    this.showHistoryModal = false;
    this.selectedMember = null;
  }

  /**
   * Get monthly attendance rate for selected member
   */
  getMonthlyAttendanceRate(): number {
    if (!this.selectedMember) return 0;

    // Mock calculation - in production, fetch from API
    return 75 + Math.floor(Math.random() * 20); // 75-95%
  }

  /**
   * Get last visited date for selected member
   */
  getLastVisitedDate(): string {
    if (!this.selectedMember) return '-';

    // Mock data - in production, fetch from API
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  /**
   * Get monthly calendar with attendance data
   */
  getMonthlyCalendar(): CalendarDay[] {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const calendar: CalendarDay[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      const isFuture = date > today;

      // Mock attendance data - in production, fetch from API
      let status: 'Present' | 'Absent' | null = null;
      if (!isFuture) {
        status = Math.random() > 0.3 ? 'Present' : 'Absent';
      }

      calendar.push({
        day,
        status,
        isFuture,
        tooltip: isFuture ? 'Future date' : (status === 'Present' ? 'Attended' : 'Absent')
      });
    }

    return calendar;
  }

  /**
   * Get recent visits for selected member
   */
  getRecentVisits(): RecentVisit[] {
    if (!this.selectedMember) return [];

    // Mock data - in production, fetch from API
    const visits: RecentVisit[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      if (Math.random() > 0.3) { // 70% attendance
        visits.push({
          date,
          checkIn: `0${6 + Math.floor(Math.random() * 4)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
          checkOut: `${10 + Math.floor(Math.random() * 4)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
          method: Math.random() > 0.3 ? 'QR' : 'Manual'
        });
      }
    }

    return visits;
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
   * Check if check-in is late (after 10 AM)
   */
  isLateCheckIn(checkInTime: string): boolean {
    if (!checkInTime) return false;

    const [hours] = checkInTime.split(':').map(Number);
    return hours >= 10;
  }

  /**
   * Get CSS class for membership badge
   */
  getMembershipBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Active': 'badge-active',
      'Expired': 'badge-expired',
      'Expiring': 'badge-expiring'
    };
    return statusMap[status] || 'badge-neutral';
  }

  /**
   * Get CSS class for status badge
   */
  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Present': 'badge-present',
      'Checked Out': 'badge-checked-out',
      'Not Visited': 'badge-not-visited'
    };
    return statusMap[status] || 'badge-neutral';
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
