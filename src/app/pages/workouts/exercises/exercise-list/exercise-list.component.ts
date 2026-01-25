import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
    loadExercises,
    deleteExercise,
    activateExercise,
    deactivateExercise,
    setExerciseFilters
} from '../../../../core/store/exercises/exercise.actions';
import {
    selectExercises,
    selectExerciseLoading,
    selectExercisePagination,
    selectExerciseFilters
} from '../../../../core/store/exercises/exercise.selectors';
import { Exercise, MuscleGroup, Equipment, Difficulty, ExerciseFilters } from '../../../../core/models/exercise.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-exercise-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private authService = inject(AuthService);
    private confirmService = inject(ConfirmDialogService);
    private destroy$ = new Subject<void>();
    private searchSubject$ = new Subject<string>();

    exercises$ = this.store.select(selectExercises);
    loading$ = this.store.select(selectExerciseLoading);
    pagination$ = this.store.select(selectExercisePagination);
    filters$ = this.store.select(selectExerciseFilters);

    // Filter values
    selectedMuscleGroup: string = '';
    selectedEquipment: string = '';
    selectedDifficulty: string = '';
    searchTerm: string = '';
    includeInactive: boolean = false;

    // Current page
    currentPage: number = 1;
    pageSize: number = 20;

    // Enums for template
    muscleGroups = Object.values(MuscleGroup);
    equipmentTypes = Object.values(Equipment);
    difficultyLevels = Object.values(Difficulty);

    // User permissions
    currentUser = this.authService.currentUserValue;
    canCreate = this.hasRole(['admin', 'trainer', 'manager']);
    canEdit = this.hasRole(['admin', 'trainer', 'manager']);
    canActivate = this.hasRole(['admin', 'manager']);
    canDelete = this.hasRole(['admin']);

    ngOnInit() {
        // Setup search debounce
        this.searchSubject$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        ).subscribe(searchTerm => {
            this.searchTerm = searchTerm;
            this.applyFilters();
        });

        // Load initial exercises
        this.loadExercises();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadExercises() {
        const filters: ExerciseFilters = {};

        if (this.selectedMuscleGroup) {
            filters.muscleGroup = this.selectedMuscleGroup as MuscleGroup;
        }
        if (this.selectedEquipment) {
            filters.equipment = this.selectedEquipment as Equipment;
        }
        if (this.selectedDifficulty) {
            filters.difficulty = this.selectedDifficulty as Difficulty;
        }
        if (this.searchTerm) {
            filters.search = this.searchTerm;
        }
        if (this.includeInactive) {
            filters.includeInactive = true;
        }

        this.store.dispatch(loadExercises({
            filters,
            pageSize: this.pageSize,
            pageNumber: this.currentPage
        }));
    }

    applyFilters() {
        this.currentPage = 1; // Reset to first page when filters change
        this.loadExercises();
    }

    onSearchChange(searchTerm: string) {
        this.searchSubject$.next(searchTerm);
    }

    clearFilters() {
        this.selectedMuscleGroup = '';
        this.selectedEquipment = '';
        this.selectedDifficulty = '';
        this.searchTerm = '';
        this.includeInactive = false;
        this.currentPage = 1;
        this.loadExercises();
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.loadExercises();
    }

    nextPage() {
        this.pagination$.pipe(take(1)).subscribe(pagination => {
            if (this.currentPage < pagination.pages) {
                this.currentPage++;
                this.loadExercises();
            }
        });
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadExercises();
        }
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
            }
        });
    }

    private hasRole(roles: string[]): boolean {
        return this.currentUser ? roles.includes(this.currentUser.role) : false;
    }
}
