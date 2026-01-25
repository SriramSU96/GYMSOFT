import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DietService } from '../../../../core/services/diet.service';
import { AuthService } from '../../../../core/services/auth.service';
import { DietPlan } from '../../../../core/models/diet.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-diet-plan-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './plan-list.component.html',
    styles: [`
        .diet-library-container {
            padding: var(--space-xl);
            max-width: 1400px;
            margin: 0 auto;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--space-xl);
        }

        .header-content h1 {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--space-xs);
        }

        .subtitle {
            color: var(--text-secondary);
        }

        .toolbar {
            display: flex;
            gap: var(--space-md);
            margin-bottom: var(--space-lg);
            background: var(--bg-surface);
            padding: var(--space-md);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-subtle);
        }

        .search-bar {
            flex: 1;
            display: flex;
            align-items: center;
            background: var(--bg-main);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            padding: 0 var(--space-md);
        }

        .search-bar input {
            flex: 1;
            background: transparent;
            border: none;
            padding: var(--space-sm);
            color: var(--text-primary);
            outline: none;
        }

        .filters {
            display: flex;
            gap: var(--space-md);
        }

        .select-wrapper select {
            padding: var(--space-sm) var(--space-md);
            background: var(--bg-main);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            color: var(--text-primary);
            min-width: 150px;
        }

        .plan-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: var(--space-lg);
        }

        .plan-card {
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-lg);
            overflow: hidden;
            transition: all 0.2s;
            display: flex;
            flex-direction: column;
        }

        .plan-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
            border-color: var(--primary-color-alpha);
        }

        .card-header {
            padding: var(--space-lg);
            border-bottom: 1px solid var(--border-subtle);
        }

        .badges {
            display: flex;
            gap: var(--space-xs);
            margin-bottom: var(--space-sm);
        }

        .badge {
            padding: 2px 8px;
            border-radius: var(--radius-full);
            font-size: 0.75rem;
            font-weight: 500;
        }

        .badge.level { background: var(--primary-color-alpha); color: var(--primary-color); }
        .badge.goal { background: var(--secondary-color-alpha); color: var(--secondary-color); }

        .plan-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-primary);
            margin: 0;
        }

        .card-body {
            padding: var(--space-lg);
            flex: 1;
        }

        .description {
            color: var(--text-secondary);
            font-size: 0.9rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: var(--space-md);
        }

        .meta-info {
            display: flex;
            gap: var(--space-lg);
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: var(--space-xs);
            color: var(--text-muted);
            font-size: 0.85rem;
        }

        .card-actions {
            padding: var(--space-md) var(--space-lg);
            background: var(--bg-surface-hover);
            border-top: 1px solid var(--border-subtle);
            display: flex;
            justify-content: flex-end;
            gap: var(--space-xs);
        }

        .btn-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-md);
            color: var(--text-secondary);
            border: none;
            background: transparent;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-icon:hover {
            background: var(--bg-main);
            color: var(--primary-color);
        }

        .btn-icon.danger:hover {
            color: var(--error-color);
        }

        .loading-state, .empty-state {
            text-align: center;
            padding: var(--space-2xl);
            color: var(--text-secondary);
        }

        .empty-state h3 {
            color: var(--text-primary);
            margin: var(--space-md) 0 var(--space-sm);
        }
    `]
})
export class DietPlanListComponent implements OnInit {
    plans: DietPlan[] = [];
    filteredPlans: DietPlan[] = [];
    isLoading = false;

    // Filters
    searchQuery = '';
    selectedGoal = '';
    selectedLevel = '';

    goals = ['Weight Loss', 'Muscle Gain', 'Fitness', 'Endurance'];
    levels = ['Beginner', 'Intermediate', 'Advanced'];

    private searchSubject = new Subject<string>();

    constructor(
        private dietService: DietService,
        private authService: AuthService
    ) {
        this.searchSubject.pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe(query => {
            this.searchQuery = query;
            this.applyFilters();
        });
    }

    ngOnInit() {
        this.loadPlans();
    }

    loadPlans() {
        this.isLoading = true;
        const gymId = this.authService.currentUserValue?.gymId;

        if (!gymId) {
            this.isLoading = false;
            return;
        }

        // Fetch all plans and filter client-side for now as the API support for filter params is basic
        this.dietService.getPlans({ gymId }).subscribe({
            next: (response) => {
                this.plans = response.dietPlans || [];
                this.applyFilters();
                this.isLoading = false;
            },
            error: (err: any) => {
                console.error('Error loading diet plans', err);
                this.isLoading = false;
            }
        });
    }

    onSearch(event: any) {
        this.searchSubject.next(event.target.value);
    }

    applyFilters() {
        let temp = [...this.plans];

        if (this.searchQuery) {
            const q = this.searchQuery.toLowerCase();
            temp = temp.filter(p => p.title.toLowerCase().includes(q));
        }

        if (this.selectedGoal) {
            temp = temp.filter(p => p.goal === this.selectedGoal);
        }

        if (this.selectedLevel) {
            temp = temp.filter(p => p.level === this.selectedLevel);
        }

        this.filteredPlans = temp;
    }

    deletePlan(plan: DietPlan) {
        if (!confirm(`Are you sure you want to delete "${plan.title}"?`)) return;

        this.dietService.deletePlan(plan._id!).subscribe({
            next: () => {
                this.loadPlans();
            },
            error: (err: any) => console.error(err)
        });
    }
}
