import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../../core/models/gym-extensions.model';
import { WorkoutService } from '../../../core/services/workout.service';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

@Component({
    selector: 'app-workout-library',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './assigned-workouts.component.html',
    styleUrls: ['./assigned-workouts.component.css']
})
export class AssignedWorkoutsComponent implements OnInit {
    private workoutService = inject(WorkoutService);
    private toastService = inject(ToastService);
    private confirmDialog = inject(ConfirmDialogService);
    private router = inject(Router);

    // All workouts from API
    allWorkouts: Workout[] = [];

    // Filtered workouts
    filteredWorkouts: Workout[] = [];

    // Loading state
    loading: boolean = false;

    // Filter options
    searchTerm: string = '';
    selectedLevel: string = 'all';
    selectedGoal: string = 'all';

    levels: string[] = ['all', 'Beginner', 'Intermediate', 'Advanced'];
    goals: string[] = ['all', 'Weight Loss', 'Muscle Gain', 'Fitness'];

    ngOnInit() {
        this.loadWorkouts();
    }

    // Load workouts from API
    loadWorkouts() {
        this.loading = true;
        this.workoutService.getWorkouts().subscribe({
            next: (workouts) => {
                this.allWorkouts = workouts;
                this.filteredWorkouts = [...workouts];
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading workouts:', error);
                this.toastService.error('Failed to load workouts');
                this.loading = false;
                // Fallback to empty array
                this.allWorkouts = [];
                this.filteredWorkouts = [];
            }
        });
    }

    // Filter workouts based on search and dropdowns
    applyFilters() {
        this.filteredWorkouts = this.allWorkouts.filter(workout => {
            const matchesSearch = workout.title.toLowerCase().includes(this.searchTerm.toLowerCase());
            const matchesLevel = this.selectedLevel === 'all' || workout.level === this.selectedLevel;
            const matchesGoal = this.selectedGoal === 'all' || workout.goal === this.selectedGoal;

            return matchesSearch && matchesLevel && matchesGoal;
        });
    }

    // Action handlers
    viewWorkout(workoutId: string) {
        console.log('View workout:', workoutId);
        // Navigate to workout detail page
        this.router.navigate(['/workouts/builder', workoutId]);
    }

    editWorkout(workoutId: string) {
        console.log('Edit workout:', workoutId);
        // Navigate to workout builder with ID
        this.router.navigate(['/workouts/builder', workoutId]);
    }

    assignWorkout(workoutId: string) {
        console.log('Assign workout:', workoutId);
        // Navigate to assignment page with workout ID
        this.router.navigate(['/plans/assign'], { queryParams: { workoutId } });
    }

    createWorkout() {
        console.log('Create new workout');
        // Navigate to workout builder
        this.router.navigate(['/workouts/builder']);
    }

    deleteWorkout(workoutId: string) {
        // Find the workout to get its title
        const workout = this.allWorkouts.find(w => w._id === workoutId);
        const workoutTitle = workout?.title || 'this workout';

        // Show custom confirmation dialog
        this.confirmDialog.confirm({
            title: 'Delete Workout',
            message: `Are you sure you want to delete "${workoutTitle}"? This action cannot be undone.`,
            confirmText: 'Delete',
            cancelText: 'Cancel'
        }).subscribe(confirmed => {
            if (confirmed) {
                this.workoutService.deleteWorkout(workoutId).subscribe({
                    next: () => {
                        this.toastService.success('Workout deleted successfully');
                        this.loadWorkouts(); // Reload the list
                    },
                    error: (error) => {
                        console.error('Error deleting workout:', error);
                        this.toastService.error('Failed to delete workout');
                    }
                });
            }
        });
    }

    // Get badge class for level
    getLevelBadgeClass(level: string): string {
        switch (level) {
            case 'Beginner': return 'badge-success';
            case 'Intermediate': return 'badge-warning';
            case 'Advanced': return 'badge-danger';
            default: return 'badge-secondary';
        }
    }

    // Get badge class for goal
    getGoalBadgeClass(goal: string): string {
        switch (goal) {
            case 'Weight Loss': return 'badge-primary';
            case 'Muscle Gain': return 'badge-success';
            case 'Fitness': return 'badge-info';
            default: return 'badge-secondary';
        }
    }
}
