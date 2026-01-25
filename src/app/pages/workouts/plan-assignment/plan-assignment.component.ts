
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/services/workout.service';
import { DietService } from '../../../core/services/diet.service';
import { MemberService } from '../../../core/services/member.service'; // Assuming exists
import { Workout, DietPlan } from '../../../core/models/gym-extensions.model';
import { Member } from '../../../core/models/member.model'; // Assuming exists
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-plan-assignment',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './plan-assignment.component.html',
    styleUrls: ['./plan-assignment.component.css']
})
export class PlanAssignment implements OnInit {
    assignForm: FormGroup;
    members: Member[] = [];
    workouts: Workout[] = [];
    diets: DietPlan[] = [];

    isLoading = false;
    successMessage = '';

    constructor(
        private fb: FormBuilder,
        private workoutService: WorkoutService,
        private dietService: DietService,
        private memberService: MemberService,
        private authService: AuthService
    ) {
        this.assignForm = this.fb.group({
            memberId: ['', Validators.required],
            workoutId: ['', Validators.required],
            dietPlanId: ['', Validators.required],
            startDate: [new Date().toISOString().split('T')[0], Validators.required],
            endDate: ['']
        });
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.isLoading = true;
        const gymId = this.authService.currentUserValue?.gymId;

        // Load available workouts, diets, and members in parallel
        // Note: In a real app, use forkJoin for cleaner loading
        this.workoutService.getWorkouts().subscribe(w => this.workouts = w);
        this.dietService.getPlans().subscribe(d => this.diets = (d as any).data || d);

        // Assuming MemberService has a method to get active members
        // Assuming MemberService has a method to get active members
        this.memberService.getMembers({}).subscribe(res => {
            // Handle both paginated and array response
            const data = (res as any).data || res;
            let allMembers = Array.isArray(data) ? data : [];

            // Filter by membershipStatus active since service doesn't support filter object yet
            this.members = allMembers.filter((m: any) => m.membershipStatus === 'Active');
            this.isLoading = false;
        });
    }

    onSubmit(): void {
        if (this.assignForm.invalid) return;

        this.isLoading = true;
        const assignment = {
            ...this.assignForm.value,
            gymId: this.authService.currentUserValue?.gymId
        };

        // Check what we are assigning
        const { workoutId, dietPlanId, memberId, startDate, endDate } = this.assignForm.value;
        const gymId = this.authService.currentUserValue?.gymId;

        const requests: import('rxjs').Observable<any>[] = [];

        if (workoutId) {
            const workoutAssignment = { memberId, workoutId, startDate, endDate, gymId };
            requests.push(this.workoutService.assignPlan(workoutAssignment));
        }

        if (dietPlanId) {
            const dietAssignment = { memberId, dietPlanId, startDate, endDate, gymId };
            requests.push(this.dietService.assignPlan(dietAssignment));
        }

        // ForkJoin in real app, simplistic approach here
        // If both, await both. For now assuming typical user aligns one or both.
        // We will chaining them for simplicity or Just firing independent subs

        let completed = 0;
        const checkDone = () => {
            completed++;
            if (completed >= requests.length) {
                this.successMessage = 'Plan(s) assigned successfully!';
                this.isLoading = false;
                this.assignForm.reset({
                    startDate: new Date().toISOString().split('T')[0]
                });
                setTimeout(() => this.successMessage = '', 3000);
            }
        };

        if (requests.length === 0) {
            this.isLoading = false;
            return;
        }

        requests.forEach(req => req.subscribe({
            next: () => checkDone(),
            error: (err) => {
                console.error(err);
                this.isLoading = false; // Note: if one fails, other might succeed
            }
        }));
    }
    getWorkoutGoal(id: string): string {
        const workout = this.workouts.find(w => w._id === id);
        return workout ? workout.goal : '';
    }
}
