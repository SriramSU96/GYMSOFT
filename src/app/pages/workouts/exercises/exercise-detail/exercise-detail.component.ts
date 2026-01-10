import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import {
    loadExercise,
    deleteExercise,
    activateExercise,
    deactivateExercise,
    clearSelectedExercise
} from '../../../../core/store/exercises/exercise.actions';
import { selectSelectedExercise, selectExerciseLoading } from '../../../../core/store/exercises/exercise.selectors';
import { Exercise } from '../../../../core/models/exercise.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';

@Component({
    selector: 'app-exercise-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './exercise-detail.component.html'
})
export class ExerciseDetailComponent implements OnInit {
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private authService = inject(AuthService);
    private confirmService = inject(ConfirmDialogService);
    private sanitizer = inject(DomSanitizer);

    exercise$ = this.store.select(selectSelectedExercise);
    loading$ = this.store.select(selectExerciseLoading);

    // User permissions
    currentUser = this.authService.getCurrentUser();
    canEdit = this.hasRole(['admin', 'trainer', 'manager']);
    canActivate = this.hasRole(['admin', 'manager']);
    canDelete = this.hasRole(['admin']);

    ngOnInit() {
        this.route.params.pipe(take(1)).subscribe(params => {
            if (params['id']) {
                this.store.dispatch(loadExercise({ id: params['id'] }));
            }
        });
    }

    ngOnDestroy() {
        this.store.dispatch(clearSelectedExercise());
    }

    getYouTubeEmbedUrl(videoUrl: string): SafeResourceUrl | null {
        if (!videoUrl) return null;

        // Extract YouTube video ID from various URL formats
        let videoId = '';

        if (videoUrl.includes('youtube.com/watch?v=')) {
            videoId = videoUrl.split('v=')[1]?.split('&')[0];
        } else if (videoUrl.includes('youtu.be/')) {
            videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
        } else if (videoUrl.includes('youtube.com/embed/')) {
            videoId = videoUrl.split('embed/')[1]?.split('?')[0];
        }

        if (videoId) {
            return this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://www.youtube.com/embed/${videoId}`
            );
        }

        return null;
    }

    toggleActivation(exercise: Exercise) {
        if (!this.canActivate) return;

        if (exercise.isActive) {
            this.confirmService.confirm({
                title: 'Deactivate Exercise',
                message: `Are you sure you want to deactivate "${exercise.name}"? It will be hidden from active lists.`,
                confirmText: 'Deactivate',
                cancelText: 'Cancel',
                type: 'warning'
            }).pipe(take(1)).subscribe(confirmed => {
                if (confirmed) {
                    this.store.dispatch(deactivateExercise({ id: exercise._id }));
                }
            });
        } else {
            this.store.dispatch(activateExercise({ id: exercise._id }));
        }
    }

    deleteExercise(exercise: Exercise) {
        if (!this.canDelete) return;

        this.confirmService.confirm({
            title: 'Delete Exercise Permanently',
            message: `Are you sure you want to permanently delete "${exercise.name}"? This action cannot be undone and will remove all associated data.`,
            confirmText: 'Delete Permanently',
            cancelText: 'Cancel',
            type: 'danger'
        }).pipe(take(1)).subscribe(confirmed => {
            if (confirmed) {
                this.store.dispatch(deleteExercise({ id: exercise._id }));
                this.router.navigate(['/workouts/exercises']);
            }
        });
    }

    goBack() {
        this.router.navigate(['/workouts/exercises']);
    }

    private hasRole(roles: string[]): boolean {
        return this.currentUser ? roles.includes(this.currentUser.role) : false;
    }
}
