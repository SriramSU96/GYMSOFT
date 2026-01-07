import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { loadStaff, loadSalaries, markStaffAttendance, loadStaffAttendance } from '../../../core/store/staff/staff.actions';
import { selectStaffList, selectSalarySummary, selectStaffIsLoading, selectStaffAttendance } from '../../../core/store/staff/staff.selectors';
import { Staff, StaffAttendance } from '../../../core/models/staff.model';

@Component({
    selector: 'app-staff-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './staff-dashboard.component.html',
    styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {
    private store = inject(Store);

    staffList$: Observable<Staff[]> = this.store.select(selectStaffList);
    attendance$: Observable<StaffAttendance[]> = this.store.select(selectStaffAttendance);
    salarySummary$: Observable<{ total: number, paid: number, pending: number }> = this.store.select(selectSalarySummary);
    isLoading$: Observable<boolean> = this.store.select(selectStaffIsLoading);

    staffWithAttendance$ = combineLatest([this.staffList$, this.attendance$]).pipe(
        map(([staff, attendance]: [Staff[], StaffAttendance[]]) => {
            const today = new Date().toISOString().split('T')[0];
            return staff.map(s => {
                const dayAttendance = attendance.find((a: StaffAttendance) => a.staffId === s._id && a.date === today);
                return {
                    ...s,
                    status: dayAttendance ? dayAttendance.status : 'Absent' // Default to Absent if no record
                };
            });
        })
    );

    ngOnInit(): void {
        this.store.dispatch(loadStaff());
        this.store.dispatch(loadSalaries());
        this.store.dispatch(loadStaffAttendance());
    }

    markAttendance(staffId: string, status: any) {
        this.store.dispatch(markStaffAttendance({ staffId, status }));
    }
}
