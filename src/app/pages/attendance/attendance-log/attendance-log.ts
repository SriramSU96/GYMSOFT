import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { loadAllAttendance } from '../../../core/store/attendance/attendance.actions';
import { selectAttendanceRecords, selectAttendanceIsLoading } from '../../../core/store/attendance/attendance.selectors';
import { selectMembers } from '../../../core/store/members/member.selectors';
import { loadMembers } from '../../../core/store/members/member.actions';
import { Attendance } from '../../../core/models/attendance.model';
import { Member } from '../../../core/models/member.model';

@Component({
  selector: 'app-attendance-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-log.html',
  styleUrl: './attendance-log.css'
})
export class AttendanceLog implements OnInit {
  private store = inject(Store);

  logs$: Observable<Attendance[]> = this.store.select(selectAttendanceRecords);
  members$: Observable<Member[]> = this.store.select(selectMembers);
  isLoading$: Observable<boolean> = this.store.select(selectAttendanceIsLoading);

  enrichedLogs$ = combineLatest([this.logs$, this.members$]).pipe(
    map(([logs, members]: [Attendance[], Member[]]) => {
      return logs.map(log => ({
        ...log,
        memberName: members.find(m => m.id === log.memberId)?.name || 'Unknown Member'
      }));
    })
  );

  ngOnInit(): void {
    this.store.dispatch(loadAllAttendance());
    this.store.dispatch(loadMembers());
  }
}
