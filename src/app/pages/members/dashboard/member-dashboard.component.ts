import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, filter, take } from 'rxjs';
import { selectUser } from '../../../core/store/auth/auth.selectors';
import { loadMember, loadProgress, loadAchievements } from '../../../core/store/members/member.actions';
import { selectCurrentMember, selectProgressHistory, selectAchievements, selectMemberIsLoading } from '../../../core/store/members/member.selectors';
import { loadMemberAttendance } from '../../../core/store/attendance/attendance.actions';
import { selectAttendanceRecords } from '../../../core/store/attendance/attendance.selectors';

@Component({
    selector: 'app-member-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './member-dashboard.component.html',
    styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
    private store = inject(Store);
    private router = inject(Router);

    member$ = this.store.select(selectCurrentMember);
    progress$ = this.store.select(selectProgressHistory);
    attendance$ = this.store.select(selectAttendanceRecords);
    achievements$ = this.store.select(selectAchievements);
    isLoading$ = this.store.select(selectMemberIsLoading);

    ngOnInit(): void {
        this.store.select(selectUser).pipe(
            filter(user => !!user),
            take(1)
        ).subscribe(user => {
            if (user && user.id) {
                // In a real app, the member ID might be user.id or a linked ID
                // For now, assuming loadMember handles the mapping if needed or uses user.id
                this.store.dispatch(loadMember({ id: user.id }));
                this.store.dispatch(loadProgress({ memberId: user.id }));
                this.store.dispatch(loadAchievements({ memberId: user.id }));
                this.store.dispatch(loadMemberAttendance({ memberId: user.id }));
            }
        });
    }

    onQrCheckIn() {
        this.router.navigate(['/attendance/qr']);
    }
}
