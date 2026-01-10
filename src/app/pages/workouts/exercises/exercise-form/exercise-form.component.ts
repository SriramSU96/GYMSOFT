import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {
    createExercise,
    updateExercise,
    loadExercise
} from '../../../../core/store/exercises/exercise.actions';
import { selectSelectedExercise, selectExerciseLoading } from '../../../../core/store/exercises/exercise.selectors';
import { MuscleGroup, Equipment, Difficulty, CreateExerciseDto, UpdateExerciseDto } from '../../../../core/models/exercise.model';

@Component({
    selector: 'app-exercise-form',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: './exercise-form.component.html'
})
export class ExerciseFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    exerciseForm!: FormGroup;
    isEditMode = false;
    exerciseId: string | null = null;
    loading$ = this.store.select(selectExerciseLoading);

    // Enums for template
    muscleGroups = Object.values(MuscleGroup);
    equipmentTypes = Object.values(Equipment);
    difficultyLevels = Object.values(Difficulty);

    ngOnInit() {
        this.initForm();

        // Check if we're in edit mode
        this.route.params.pipe(take(1)).subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.exerciseId = params['id'];
                this.loadExerciseData();
            }
        });
    }

    initForm() {
        this.exerciseForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            muscleGroup: ['', Validators.required],
            equipment: ['', Validators.required],
            difficulty: ['', Validators.required],
            description: [''],
            videoUrl: [''],
            imageUrl: ['']
        });
    }

    loadExerciseData() {
        if (this.exerciseId) {
            this.store.dispatch(loadExercise({ id: this.exerciseId }));

            this.store.select(selectSelectedExercise).pipe(take(2)).subscribe(exercise => {
                if (exercise) {
                    this.exerciseForm.patchValue({
                        name: exercise.name,
                        muscleGroup: exercise.muscleGroup,
                        equipment: exercise.equipment,
                        difficulty: exercise.difficulty,
                        description: exercise.description || '',
                        videoUrl: exercise.videoUrl || '',
                        imageUrl: exercise.imageUrl || ''
                    });
                }
            });
        }
    }

    onSubmit() {
        if (this.exerciseForm.invalid) {
            this.markFormGroupTouched(this.exerciseForm);
            return;
        }

        const formValue = this.exerciseForm.value;

        if (this.isEditMode && this.exerciseId) {
            const updateDto: UpdateExerciseDto = {
                name: formValue.name,
                muscleGroup: formValue.muscleGroup,
                equipment: formValue.equipment,
                difficulty: formValue.difficulty,
                description: formValue.description || undefined,
                videoUrl: formValue.videoUrl || undefined,
                imageUrl: formValue.imageUrl || undefined
            };
            this.store.dispatch(updateExercise({ id: this.exerciseId, changes: updateDto }));
        } else {
            const createDto: CreateExerciseDto = {
                name: formValue.name,
                muscleGroup: formValue.muscleGroup,
                equipment: formValue.equipment,
                difficulty: formValue.difficulty,
                description: formValue.description || undefined,
                videoUrl: formValue.videoUrl || undefined,
                imageUrl: formValue.imageUrl || undefined
            };
            this.store.dispatch(createExercise({ exercise: createDto }));
        }
    }

    onCancel() {
        this.router.navigate(['/workouts/exercises']);
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();
        });
    }

    // Helper methods for validation messages
    isFieldInvalid(fieldName: string): boolean {
        const field = this.exerciseForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getErrorMessage(fieldName: string): string {
        const field = this.exerciseForm.get(fieldName);
        if (field?.hasError('required')) {
            return `${this.getFieldLabel(fieldName)} is required`;
        }
        if (field?.hasError('minlength')) {
            return `${this.getFieldLabel(fieldName)} must be at least 2 characters`;
        }
        return '';
    }

    private getFieldLabel(fieldName: string): string {
        const labels: { [key: string]: string } = {
            name: 'Exercise name',
            muscleGroup: 'Muscle group',
            equipment: 'Equipment',
            difficulty: 'Difficulty'
        };
        return labels[fieldName] || fieldName;
    }
}
