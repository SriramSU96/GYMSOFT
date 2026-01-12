import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DietService } from '../../../../core/services/diet.service';
import { AuthService } from '../../../../core/services/auth.service';
import { DietPlan } from '../../../../core/models/gym-extensions.model';

@Component({
    selector: 'app-diet-plan-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './plan-form.component.html',
    styles: [`
        .form-container {
            padding: var(--space-xl);
            max-width: 800px;
            margin: 0 auto;
        }

        .page-header h1 {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--space-xs);
        }

        .page-header p {
            color: var(--text-secondary);
            margin-bottom: var(--space-xl);
        }

        .form-card {
            background: var(--bg-surface);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-subtle);
            padding: var(--space-lg);
        }

        .form-group {
            margin-bottom: var(--space-lg);
        }

        .form-group label {
            display: block;
            margin-bottom: var(--space-sm);
            font-weight: 500;
            color: var(--text-secondary);
        }

        .form-input, .form-textarea, .form-select {
            width: 100%;
            padding: var(--space-md);
            background: var(--bg-main);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            color: var(--text-primary);
            font-size: 1rem;
        }

        .form-row {
            display: flex;
            gap: var(--space-md);
        }

        .form-row .form-group {
            flex: 1;
        }

        .actions {
            display: flex;
            justify-content: flex-end;
            gap: var(--space-md);
            margin-top: var(--space-xl);
        }
    `]
})
export class DietPlanFormComponent implements OnInit {
    planForm: FormGroup;
    isEditMode = false;
    planId: string | null = null;
    isLoading = false;
    submitted = false;

    goals = ['Weight Loss', 'Muscle Gain', 'Fitness', 'Endurance'];
    levels = ['Beginner', 'Intermediate', 'Advanced'];

    constructor(
        private fb: FormBuilder,
        private dietService: DietService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.planForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: [''],
            goal: ['', Validators.required],
            level: ['', Validators.required],
            durationWeeks: [4, [Validators.required, Validators.min(1), Validators.max(52)]],
            isActive: [true]
        });
    }

    ngOnInit() {
        this.planId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.planId;

        if (this.isEditMode && this.planId) {
            this.loadPlan(this.planId);
        }
    }

    loadPlan(id: string) {
        this.isLoading = true;
        this.dietService.getDietPlan(id).subscribe({
            next: (plan) => {
                this.planForm.patchValue({
                    title: plan.title,
                    description: plan.description,
                    goal: plan.goal,
                    level: plan.level,
                    durationWeeks: plan.durationWeeks,
                    isActive: plan.isActive
                });
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading plan', err);
                this.isLoading = false;
            }
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.planForm.invalid) return;

        this.isLoading = true;
        const formValue = this.planForm.value;
        const currentUser = this.authService.getCurrentUser();

        const planData: Partial<DietPlan> = {
            ...formValue,
            gymId: currentUser?.gymId,
            // If creating, we might need createdBy, handled by backend usually or add here
            createdBy: currentUser?._id
        };

        const request$ = this.isEditMode
            ? this.dietService.updateDietPlan(this.planId!, planData)
            : this.dietService.createDietPlan(planData as DietPlan);

        request$.subscribe({
            next: (res) => {
                this.isLoading = false;
                // Redirect to builder if creating, or list if editing
                if (!this.isEditMode) {
                    this.router.navigate(['/diets/builder', res._id]);
                } else {
                    this.router.navigate(['/diets/manage-plans']);
                }
            },
            error: (err) => {
                console.error('Error saving plan', err);
                this.isLoading = false;
            }
        });
    }

    onCancel() {
        this.location.back();
    }
}
