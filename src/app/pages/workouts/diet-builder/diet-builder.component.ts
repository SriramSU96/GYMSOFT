
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DietService } from '../../../core/services/diet.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-diet-builder',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './diet-builder.component.html',
    styleUrls: ['./diet-builder.component.css']
})
export class DietBuilder implements OnInit {
    dietForm: FormGroup;
    isEditing = false;
    dietId: string | null = null;
    isLoading = false;
    successMessage = '';

    constructor(
        private fb: FormBuilder,
        private dietService: DietService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
        this.dietForm = this.fb.group({
            title: ['', Validators.required],
            calories: [2000, [Validators.required, Validators.min(0)]],
            meals: this.fb.array([])
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.dietId = params.get('id');
            if (this.dietId) {
                this.isEditing = true;
                this.loadDiet(this.dietId);
            } else {
                this.addMeal(); // Add one empty meal by default
            }
        });
    }

    get meals(): FormArray {
        return this.dietForm.get('meals') as FormArray;
    }

    newMeal(): FormGroup {
        return this.fb.group({
            time: ['', Validators.required],
            foodItems: ['', Validators.required],
            protein: [0, [Validators.min(0)]],
            carbs: [0, [Validators.min(0)]],
            fats: [0, [Validators.min(0)]]
        });
    }

    addMeal(): void {
        this.meals.push(this.newMeal());
    }

    removeMeal(index: number): void {
        this.meals.removeAt(index);
    }

    // Calculate total calories roughly based on macros (4-4-9 rule)
    calculateCalories(): void {
        let total = 0;
        this.meals.controls.forEach(control => {
            const p = control.get('protein')?.value || 0;
            const c = control.get('carbs')?.value || 0;
            const f = control.get('fats')?.value || 0;
            total += (p * 4) + (c * 4) + (f * 9);
        });
        // Optional: Update total calories or just show as hint
        // For now we trust the manual calorie input but this could auto-update
    }

    loadDiet(id: string): void {
        this.isLoading = true;
        this.dietService.getDietPlanById(id).subscribe({
            next: (diet) => {
                this.dietForm.patchValue({
                    title: diet.title,
                    calories: diet.calories
                });

                this.meals.clear();
                diet.meals.forEach(meal => {
                    this.meals.push(this.fb.group({
                        time: [meal.time, Validators.required],
                        foodItems: [meal.foodItems, Validators.required],
                        protein: [meal.macros.protein, [Validators.min(0)]],
                        carbs: [meal.macros.carbs, [Validators.min(0)]],
                        fats: [meal.macros.fats, [Validators.min(0)]]
                    }));
                });
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading diet', err);
                this.isLoading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.dietForm.invalid) return;

        this.isLoading = true;
        // Map flattened form to nested structure expected by backend
        const formValue = this.dietForm.value;
        const mealsData = formValue.meals.map((m: any) => ({
            time: m.time,
            foodItems: m.foodItems,
            macros: {
                protein: m.protein,
                carbs: m.carbs,
                fats: m.fats
            }
        }));

        const dietData = {
            title: formValue.title,
            calories: formValue.calories,
            meals: mealsData,
            gymId: this.authService.getCurrentUser()?.gymId
        };

        if (this.isEditing && this.dietId) {
            this.dietService.updateDietPlan(this.dietId, dietData).subscribe({
                next: () => {
                    this.successMessage = 'Diet plan updated successfully!';
                    this.isLoading = false;
                    setTimeout(() => this.router.navigate(['/diets']), 1500);
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                }
            });
        } else {
            this.dietService.createDietPlan(dietData).subscribe({
                next: () => {
                    this.successMessage = 'Diet plan created successfully!';
                    this.isLoading = false;
                    setTimeout(() => this.router.navigate(['/diets']), 1500);
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                }
            });
        }
    }
}
