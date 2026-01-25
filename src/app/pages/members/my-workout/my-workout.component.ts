
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/services/workout.service';
import { AuthService } from '../../../core/services/auth.service';
import { Workout } from '../../../core/models/gym-extensions.model';

@Component({
    selector: 'app-my-workout',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './my-workout.component.html',
    styleUrls: ['./my-workout.component.css']
})
export class MyWorkout implements OnInit {
    workout: Workout | null = null;
    isLoading = true;
    completedExercises: Set<number> = new Set();
    exerciseProgress: { [key: number]: boolean } = {};

    constructor(
        private workoutService: WorkoutService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        const user = this.authService.currentUserValue;
        if (user && user._id) {
            // Assuming user._id is the memberId or we have a way to get memberId
            // For now, using user._id. In real app, might need to fetch associated Member profile first.
            this.loadAssignedWorkout(user._id);
        }
    }

    loadAssignedWorkout(memberId: string): void {
        this.workoutService.getMemberWorkout(memberId).subscribe({
            next: (data: Workout) => {
                this.workout = data;
                this.isLoading = false;
                this.initializeProgress();
            },
            error: (err: any) => {
                console.error('No workout found or error', err);
                this.isLoading = false;
            }
        });
    }

    initializeProgress(): void {
        // Check local storage for today's progress to persist checkbox state
        const today = new Date().toISOString().split('T')[0];
        const saved = localStorage.getItem(`workout_progress_${today}`);
        if (saved) {
            this.exerciseProgress = JSON.parse(saved);
        }
    }

    toggleComplete(index: number): void {
        this.exerciseProgress[index] = !this.exerciseProgress[index];
        this.saveProgress();
    }

    saveProgress(): void {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`workout_progress_${today}`, JSON.stringify(this.exerciseProgress));
    }

    get completionPercentage(): number {
        if (!this.workout || this.workout.exercises.length === 0) return 0;
        const completedCount = Object.values(this.exerciseProgress).filter(v => v).length;
        return Math.round((completedCount / this.workout.exercises.length) * 100);
    }
}
