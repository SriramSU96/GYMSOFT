
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
        const gymId = this.authService.getCurrentUser()?.gymId;

        // Load available workouts, diets, and members in parallel
        // Note: In a real app, use forkJoin for cleaner loading
        this.workoutService.getWorkouts(gymId).subscribe(w => this.workouts = w);
        this.dietService.getDietPlans(gymId).subscribe(d => this.diets = d);

        // Assuming MemberService has a method to get active members
        this.memberService.getMembers({ gymId, status: 'Active' }).subscribe(res => {
            // Handle both paginated and array response
            const data = (res as any).data || res;
            this.members = Array.isArray(data) ? data : [];
            this.isLoading = false;
        });
    }

    onSubmit(): void {
        if (this.assignForm.invalid) return;

        this.isLoading = true;
        const assignment = {
            ...this.assignForm.value,
            gymId: this.authService.getCurrentUser()?.gymId
        };

        this.workoutService.assignPlan(assignment).subscribe({
            next: () => {
                this.successMessage = 'Plans assigned successfully!';
                this.isLoading = false;
                this.assignForm.reset({
                    startDate: new Date().toISOString().split('T')[0]
                });
                setTimeout(() => this.successMessage = '', 3000);
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    getWorkoutGoal(id: string): string {
        const workout = this.workouts.find(w => w._id === id);
        return workout ? workout.goal : '';
    }
}
