import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadStaff, markStaffAttendance } from '../../../core/store/staff/staff.actions';
import { selectStaff } from '../../../core/store/staff/staff.selectors';

@Component({
  selector: 'app-staff-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-attendance.html'
})
export class StaffAttendance implements OnInit {
  private store = inject(Store);
  staff$ = this.store.select(selectStaff);
  currentDate = new Date().toISOString().split('T')[0];
  attendance: { [key: string]: string } = {};

  ngOnInit() {
    this.store.dispatch(loadStaff());
  }

  markAttendance(staffId: string, status: 'Present' | 'Absent' | 'Leave') {
    this.attendance[staffId] = status;
    this.store.dispatch(markStaffAttendance({ staffId, status }));
  }
}
