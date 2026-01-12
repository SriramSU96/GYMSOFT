import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DietService } from '../../../../core/services/diet.service';
import { MealCategory, FoodType, DietMeal } from '../../../../core/models/diet.model';

@Component({
    selector: 'app-meal-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
    templateUrl: './meal-form.component.html',
    styles: [`
        .form-container {
            padding: var(--space-xl);
            max-width: 800px;
            margin: 0 auto;
        }

        .page-header {
            margin-bottom: var(--space-xl);
        }

        .page-header h1 {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--space-xs);
        }

        .page-header p {
            color: var(--text-secondary);
        }

        .form-card {
            background: var(--bg-surface);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-subtle);
            overflow: hidden;
        }

        .form-section {
            padding: var(--space-lg);
            border-bottom: 1px solid var(--border-subtle);
        }

        .form-section:last-child {
            border-bottom: none;
        }

        .section-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: var(--space-md);
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-md);
        }

        .full-width {
            grid-column: 1 / -1;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: var(--space-xs);
        }

        .form-group label {
            font-weight: 500;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .form-input, .form-select, .form-textarea {
            padding: var(--space-sm) var(--space-md);
            background: var(--bg-main);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            color: var(--text-primary);
            font-size: 0.95rem;
            transition: all 0.2s;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px var(--primary-color-alpha);
        }

        .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--space-md);
        }

        .actions {
            padding: var(--space-lg);
            background: var(--bg-surface-hover);
            display: flex;
            justify-content: flex-end;
            gap: var(--space-md);
            border-top: 1px solid var(--border-subtle);
        }
    `]
})
export class MealFormComponent implements OnInit {
    mealForm: FormGroup;
    isEditMode = false;
    mealId: string | null = null;
    isLoading = false;
    submitted = false;

    categories = Object.values(MealCategory);
    foodTypes = Object.values(FoodType);

    constructor(
        private fb: FormBuilder,
        private dietService: DietService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.mealForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            category: ['', Validators.required],
            foodType: ['', Validators.required],
            description: [''],
            calories: [null, [Validators.required, Validators.min(0)]],
            protein: [null, [Validators.required, Validators.min(0)]],
            carbs: [null, [Validators.required, Validators.min(0)]],
            fats: [null, [Validators.required, Validators.min(0)]],
            fiber: [null, [Validators.min(0)]],
            portionSize: [''],
            imageUrl: ['']
        });
    }

    ngOnInit() {
        this.mealId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.mealId;

        if (this.isEditMode && this.mealId) {
            this.loadMeal(this.mealId);
        }
    }

    loadMeal(id: string) {
        this.isLoading = true;
        this.dietService.getMeal(id).subscribe({
            next: (meal) => {
                this.mealForm.patchValue(meal);
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading meal', err);
                this.isLoading = false;
                // Handle error (notification)
            }
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.mealForm.invalid) return;

        this.isLoading = true;
        const mealData: DietMeal = this.mealForm.value;

        const request$ = this.isEditMode
            ? this.dietService.updateMeal(this.mealId!, mealData)
            : this.dietService.createMeal(mealData);

        request$.subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigate(['/diets/meals']);
            },
            error: (err) => {
                console.error('Error saving meal', err);
                this.isLoading = false;
            }
        });
    }

    onCancel() {
        this.location.back();
    }
}
