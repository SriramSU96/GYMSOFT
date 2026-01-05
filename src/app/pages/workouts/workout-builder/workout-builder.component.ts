
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/services/workout.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-workout-builder',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './workout-builder.component.html',
    styleUrls: ['./workout-builder.component.css']
})
export class WorkoutBuilder implements OnInit {
    workoutForm: FormGroup;
    isEditing = false;
    workoutId: string | null = null;
    isLoading = false;
    successMessage = '';

    levels = ['Beginner', 'Intermediate', 'Advanced'];
    goals = ['Weight Loss', 'Muscle Gain', 'Fitness'];

    constructor(
        private fb: FormBuilder,
        private workoutService: WorkoutService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
        this.workoutForm = this.fb.group({
            title: ['', Validators.required],
            level: ['Beginner', Validators.required],
            goal: ['Fitness', Validators.required],
            exercises: this.fb.array([])
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.workoutId = params.get('id');
            if (this.workoutId) {
                this.isEditing = true;
                this.loadWorkout(this.workoutId);
            } else {
                this.addExercise(); // Add one empty exercise by default
            }
        });
    }

    get exercises(): FormArray {
        return this.workoutForm.get('exercises') as FormArray;
    }

    newExercise(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            sets: [3, [Validators.required, Validators.min(1)]],
            reps: ['12', Validators.required],
            restTime: ['60s', Validators.required]
        });
    }

    addExercise(): void {
        this.exercises.push(this.newExercise());
    }

    removeExercise(index: number): void {
        this.exercises.removeAt(index);
    }

    loadWorkout(id: string): void {
        this.isLoading = true;
        this.workoutService.getWorkoutById(id).subscribe({
            next: (workout: any) => {
                this.workoutForm.patchValue({
                    title: workout.title,
                    level: workout.level,
                    goal: workout.goal
                });

                // Clear default exercise and load existing ones
                this.exercises.clear();
                workout.exercises.forEach((ex: any) => {
                    this.exercises.push(this.fb.group({
                        name: [ex.name, Validators.required],
                        sets: [ex.sets, [Validators.required, Validators.min(1)]],
                        reps: [ex.reps, Validators.required],
                        restTime: [ex.restTime, Validators.required]
                    }));
                });
                this.isLoading = false;
            },
            error: (err: any) => {
                console.error('Error loading workout', err);
                this.isLoading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.workoutForm.invalid) return;

        this.isLoading = true;
        const workoutData = {
            ...this.workoutForm.value,
            gymId: this.authService.getCurrentUser()?.gymId
        };

        if (this.isEditing && this.workoutId) {
            this.workoutService.updateWorkout(this.workoutId, workoutData).subscribe({
                next: () => {
                    this.successMessage = 'Workout updated successfully!';
                    this.isLoading = false;
                    setTimeout(() => this.router.navigate(['/workouts']), 1500);
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                }
            });
        } else {
            this.workoutService.createWorkout(workoutData).subscribe({
                next: () => {
                    this.successMessage = 'Workout created successfully!';
                    this.isLoading = false;
                    setTimeout(() => this.router.navigate(['/workouts']), 1500);
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                }
            });
        }
    }
}
