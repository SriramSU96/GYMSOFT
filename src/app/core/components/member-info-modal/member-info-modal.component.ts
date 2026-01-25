import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MemberInfoModalService } from '../../services/member-info-modal.service';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';
import { Workout, DietPlan, AssignedPlan } from '../../models/gym-extensions.model';
import { Payment } from '../../models/payment.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-member-info-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './member-info-modal.component.html',
    styleUrls: ['./member-info-modal.component.css']
})
export class MemberInfoModalComponent implements OnInit, OnDestroy {
    private modalService = inject(MemberInfoModalService);
    private memberService = inject(MemberService);
    private router = inject(Router);

    member: Member | null = null;
    activeTab: 'basic' | 'workout' | 'diet' | 'plans' | 'payments' = 'basic';

    // Data
    memberWorkout: Workout | null = null;
    memberDiet: DietPlan | null = null;
    assignedPlans: AssignedPlan[] = [];
    payments: Payment[] = [];

    // Loading states
    loadingWorkout = false;
    loadingDiet = false;

    private subscription?: Subscription;

    ngOnInit() {
        this.subscription = this.modalService.modal$.subscribe(member => {
            this.member = member;
            if (member) {
                this.activeTab = 'basic';
                this.loadMemberData(member._id || '');
            }
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    loadMemberData(memberId: string) {
        // Load member-specific workout
        this.loadingWorkout = true;
        this.memberService.getMemberWorkoutPlan(memberId).subscribe({
            next: (workout: Workout) => {
                this.memberWorkout = workout;
                this.loadingWorkout = false;
            },
            error: () => {
                this.memberWorkout = null;
                this.loadingWorkout = false;
            }
        });

        // Load member-specific diet
        this.loadingDiet = true;
        this.memberService.getMemberDietPlan(memberId).subscribe({
            next: (diet: DietPlan) => {
                this.memberDiet = diet;
                this.loadingDiet = false;
            },
            error: () => {
                this.memberDiet = null;
                this.loadingDiet = false;
            }
        });

        // TODO: Load assigned plans and payments from store/API
        this.assignedPlans = [];
        this.payments = [];
    }

    setActiveTab(tab: 'basic' | 'workout' | 'diet' | 'plans' | 'payments') {
        this.activeTab = tab;
    }

    close() {
        this.modalService.close();
    }

    getDaysUntilExpiry(): number {
        if (!this.member?.membershipExpiry) return 0;
        const expiry = new Date(this.member.membershipExpiry);
        const today = new Date();
        const diff = expiry.getTime() - today.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    getExpiryStatus(): 'active' | 'warning' | 'expired' {
        const days = this.getDaysUntilExpiry();
        if (days < 0) return 'expired';
        if (days <= 7) return 'warning';
        return 'active';
    }

    // Navigate to create custom workout for this member
    createCustomWorkout() {
        if (this.member?._id) {
            this.close();
            this.router.navigate(['/workouts/create'], {
                queryParams: { memberId: this.member._id, memberName: this.member.name }
            });
        }
    }

    // Navigate to create custom diet for this member
    createCustomDiet() {
        if (this.member?._id) {
            this.close();
            this.router.navigate(['/diets/create'], {
                queryParams: { memberId: this.member._id, memberName: this.member.name }
            });
        }
    }
}
