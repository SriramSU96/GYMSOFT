import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
    loadWorkoutPlans,
    deleteWorkoutPlan
} from '../../../../core/store/workout-plans/workout-plan.actions';
import {
    selectPlans,
    selectLoading,
    selectPagination,
    selectFilters
} from '../../../../core/store/workout-plans/workout-plan.selectors';
import { WorkoutLevel, WorkoutGoal, WorkoutPlanFilters } from '../../../../core/models/workout-plan.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-plan-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './plan-list.component.html',
    styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private router = inject(Router);
    private authService = inject(AuthService);
    private confirmService = inject(ConfirmDialogService);
    private destroy$ = new Subject<void>();
    private searchSubject$ = new Subject<string>();

    plans$ = this.store.select(selectPlans);
    loading$ = this.store.select(selectLoading);
    pagination$ = this.store.select(selectPagination);
    filters$ = this.store.select(selectFilters);

    // Filter values
    selectedLevel: string = '';
    selectedGoal: string = '';
    searchTerm: string = '';

    // Current page
    currentPage: number = 1;
    pageSize: number = 20;

    // Enums for template
    levels = Object.values(WorkoutLevel);
    goals = Object.values(WorkoutGoal);

    // User permissions
    currentUser = this.authService.currentUserValue;
    canCreate = this.hasRole(['admin', 'trainer', 'manager']);
    canEdit = this.hasRole(['admin', 'trainer', 'manager']);
    canDelete = this.hasRole(['admin']);
    canAssign = this.hasRole(['admin', 'trainer', 'manager']);

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

        // Load initial plans
        this.loadPlans();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadPlans() {
        const filters: WorkoutPlanFilters = {};

        if (this.selectedLevel) {
            filters.level = this.selectedLevel as WorkoutLevel;
        }
        if (this.selectedGoal) {
            filters.goal = this.selectedGoal as WorkoutGoal;
        }
        if (this.searchTerm) {
            filters.search = this.searchTerm;
        }

        console.log('📋 LOADING PLANS with filters:', filters);
        console.log('Page:', this.currentPage, 'PageSize:', this.pageSize);

        this.store.dispatch(loadWorkoutPlans({
            params: {
                filters,
                pageSize: this.pageSize,
                pageNumber: this.currentPage
            }
        }));
    }

    applyFilters() {
        this.currentPage = 1; // Reset to first page when filters change
        this.loadPlans();
    }

    onSearchChange(searchTerm: string) {
        this.searchSubject$.next(searchTerm);
    }

    clearAllFilters() {
        this.selectedLevel = '';
        this.selectedGoal = '';
        this.searchTerm = '';
        this.currentPage = 1;
        // this.store.dispatch(clearFilters()); // Removed as it doesn't exist yet, loadPlans handles it by passing new filters
        this.loadPlans();
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.loadPlans();
    }

    nextPage() {
        this.pagination$.pipe(take(1)).subscribe(pagination => {
            if (pagination && this.currentPage < pagination.pages) {
                this.currentPage++;
                this.loadPlans();
            }
        });
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadPlans();
        }
    }

    deletePlan(planId: string, planTitle: string) {
        if (!this.canDelete) return;

        this.confirmService.confirm({
            title: 'Delete Workout Plan',
            message: `Are you sure you want to delete "${planTitle}"? This action cannot be undone.`,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            type: 'danger'
        }).pipe(take(1)).subscribe(confirmed => {
            if (confirmed) {
                this.store.dispatch(deleteWorkoutPlan({ id: planId }));
            }
        });
    }

    createPlan() {
        console.log('=== CREATE PLAN CLICKED ===');
        console.log('Current URL:', window.location.href);
        console.log('Attempting to navigate to: /workouts/plans/create');
        console.log('Current user:', this.currentUser);
        console.log('Can create:', this.canCreate);

        this.router.navigate(['/workouts/plans/create']).then(
            success => console.log('Navigation success:', success),
            error => console.error('Navigation error:', error)
        );
    }

    private hasRole(roles: string[]): boolean {
        return this.currentUser ? roles.includes(this.currentUser.role) : false;
    }
}
