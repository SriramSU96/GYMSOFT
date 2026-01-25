import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WorkoutPlan } from '../../../../core/models/workout-plan.model';
import { selectSelectedWorkoutPlan, selectLoading } from '../../../../core/store/workout-plans/workout-plan.selectors';
import { loadWorkoutPlan } from '../../../../core/store/workout-plans/workout-plan.actions';

@Component({
    selector: 'app-plan-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './plan-detail.component.html',
    styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private store = inject(Store);

    plan$: Observable<any | null>; // Using any as per reducer state
    loading$: Observable<boolean>;

    constructor() {
        this.plan$ = this.store.select(selectSelectedWorkoutPlan);
        this.loading$ = this.store.select(selectLoading);
    }

    ngOnInit() {
        const planId = this.route.snapshot.paramMap.get('id');
        if (planId) {
            this.store.dispatch(loadWorkoutPlan({ id: planId }));
        }
    }

    goBack() {
        this.router.navigate(['/workouts/plans']);
    }

    editPlan(planId: string) {
        this.router.navigate(['/workouts/plans', planId, 'edit']);
    }
}

