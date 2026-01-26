import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WorkoutLevel, WorkoutGoal, WorkoutDay } from '../../../../core/models/workout-plan.model';
import { createWorkoutPlan as createPlan, setBuilderStep, resetBuilder, addWorkoutDays as addDaysToPlan, addExercisesToDay, loadWorkoutPlans as loadPlans } from '../../../../core/store/workout-plans/workout-plan.actions';
import { selectBuilderStep, selectBuilderPlanId, selectBuilderDays } from '../../../../core/store/workout-plans/workout-plan.selectors';
import { take } from 'rxjs/operators';
import { loadExercises } from '../../../../core/store/exercises/exercise.actions';
import { selectExercises } from '../../../../core/store/exercises/exercise.selectors';

@Component({
    selector: 'app-plan-builder',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
    templateUrl: './plan-builder.component.html',
    styleUrls: ['./plan-builder.component.css']
})
export class PlanBuilderComponent implements OnInit {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private router = inject(Router);

    currentStep$ = this.store.select(selectBuilderStep);
    planId$ = this.store.select(selectBuilderPlanId);
    builderDays$ = this.store.select(selectBuilderDays);
    exercises$ = this.store.select(selectExercises);

    // Step 1: Plan Details Form
    planForm: FormGroup;

    // Step 2: Workout Days
    days: { dayNumber: number; focus: string }[] = [];
    newDayFocus: string = '';

    // Step 3: Add Exercises
    selectedDayId: string | null = null;
    selectedExerciseId: string = '';
    exerciseSets: number = 3;
    exerciseReps: string = '10-12';
    exerciseRest: number = 60;
    exerciseTempo: string = '';
    exerciseNotes: string = '';
    dayExercises: Map<string, any[]> = new Map();

    // Enums for template
    levels = Object.values(WorkoutLevel);
    goals = Object.values(WorkoutGoal);

    constructor() {
        this.planForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: [''],
            level: [WorkoutLevel.Beginner, Validators.required],
            goal: [WorkoutGoal.Fitness, Validators.required],
            durationWeeks: [4, [Validators.required, Validators.min(1), Validators.max(52)]]
        });
    }

    ngOnInit() {
        console.log('=== PLAN BUILDER COMPONENT LOADED ===');
        console.log('Current route:', this.router.url);
        // Reset builder state when component loads
        this.store.dispatch(resetBuilder());
        // Load exercises from library
        this.store.dispatch(loadExercises({ pageSize: 100, pageNumber: 1 }));
    }

    onSubmitPlanDetails() {
        if (this.planForm.valid) {
            this.store.dispatch(createPlan({ plan: this.planForm.value }));
            // The effect will handle moving to step 2
        }
    }

    // Step 2: Day Management
    addDay() {
        if (this.newDayFocus.trim()) {
            this.days.push({
                dayNumber: this.days.length + 1,
                focus: this.newDayFocus.trim()
            });
            this.newDayFocus = '';
        }
    }

    removeDay(index: number) {
        this.days.splice(index, 1);
        // Renumber remaining days
        this.days.forEach((day, idx) => {
            day.dayNumber = idx + 1;
        });
    }

    onSubmitDays() {
        if (this.days.length > 0) {
            this.planId$.pipe(take(1)).subscribe(planId => {
                if (planId) {
                    this.store.dispatch(addDaysToPlan({
                        planId,
                        daysStructure: { days: this.days }
                    }));
                }
            });
        }
    }

    // Step 3: Exercise Management
    selectDay(dayId: string) {
        this.selectedDayId = dayId;
    }

    onExerciseSelected() {
        // Automatically add the exercise when selected
        if (this.selectedExerciseId && this.selectedDayId) {
            this.addExerciseToDay();
        }
    }

    addExerciseToDay() {
        if (!this.selectedDayId || !this.selectedExerciseId) return;

        const exercise = {
            exerciseId: this.selectedExerciseId,
            sets: this.exerciseSets,
            reps: this.exerciseReps,
            restSeconds: this.exerciseRest,
            tempo: this.exerciseTempo,
            notes: this.exerciseNotes,
            order: (this.dayExercises.get(this.selectedDayId)?.length || 0) + 1
        };

        const currentExercises = this.dayExercises.get(this.selectedDayId) || [];
        this.dayExercises.set(this.selectedDayId, [...currentExercises, exercise]);

        // Reset form
        this.selectedExerciseId = '';
        this.exerciseSets = 3;
        this.exerciseReps = '10-12';
        this.exerciseRest = 60;
        this.exerciseTempo = '';
        this.exerciseNotes = '';
    }

    removeExerciseFromDay(dayId: string, index: number) {
        const exercises = this.dayExercises.get(dayId) || [];
        exercises.splice(index, 1);
        // Reorder
        exercises.forEach((ex, idx) => ex.order = idx + 1);
        this.dayExercises.set(dayId, exercises);
    }

    getDayExercises(dayId: string) {
        return this.dayExercises.get(dayId) || [];
    }

    getTotalExerciseCount(): number {
        let total = 0;
        this.dayExercises.forEach(exercises => {
            total += exercises.length;
        });
        return total;
    }

    onSubmitExercises() {
        console.log('=== SUBMITTING EXERCISES - START ===');
        console.log('1. Current timestamp:', new Date().toISOString());
        console.log('2. Builder days observable:', this.builderDays$);
        console.log('3. Day exercises map size:', this.dayExercises.size);
        console.log('4. Day exercises map contents:', Array.from(this.dayExercises.entries()));

        this.builderDays$.pipe(take(1)).subscribe({
            next: (builderDays) => {
                console.log('=== BUILDER DAYS SUBSCRIPTION - NEXT ===');
                console.log('5. Builder days received:', builderDays);
                console.log('6. Builder days type:', typeof builderDays);
                console.log('7. Builder days is array:', Array.isArray(builderDays));
                console.log('8. Builder days length:', builderDays?.length);

                if (!builderDays || builderDays.length === 0) {
                    console.error('❌ ERROR: No builder days found');
                    console.error('This means you need to add workout days before adding exercises');
                    return;
                }

                let submittedCount = 0;
                let skippedCount = 0;

                builderDays.forEach((day: WorkoutDay, index: number) => {
                    console.log(`\n--- Processing Day ${index + 1} ---`);
                    console.log(`Day Number: ${day.dayNumber}`);
                    console.log(`Day ID: ${day._id}`);
                    console.log(`Day Focus: ${day.focus}`);

                    const exercises = this.dayExercises.get(day._id!);
                    console.log(`Exercises for this day:`, exercises);
                    console.log(`Exercises count:`, exercises?.length || 0);

                    if (exercises && exercises.length > 0 && day._id) {
                        console.log(`✅ Dispatching addExercisesToDay for day ${day._id}`);
                        console.log(`Payload:`, { dayId: day._id, dto: { exercises } });

                        this.store.dispatch(addExercisesToDay({
                            dayId: day._id,
                            dto: { exercises }
                        }));
                        submittedCount++;
                    } else {
                        console.warn(`⚠️ Skipping day ${day.dayNumber} - No exercises or missing day ID`);
                        skippedCount++;
                    }
                });

                console.log('\n=== SUBMISSION SUMMARY ===');
                console.log(`✅ Submitted exercises for ${submittedCount} days`);
                console.log(`⚠️ Skipped ${skippedCount} days`);
                console.log(`Total days processed: ${builderDays.length}`);

                if (submittedCount === 0) {
                    console.error('❌ WARNING: No exercises were submitted!');
                    console.error('Make sure you have added exercises to at least one day');
                    return; // Don't navigate if nothing was submitted
                }

                // Navigate back to plans list after a short delay
                console.log('\n⏱️ Scheduling navigation to /workouts/plans in 1.5 seconds...');
                setTimeout(() => {
                    console.log('🚀 Navigating to /workouts/plans');
                    this.router.navigate(['/workouts/plans']).then(() => {
                        // Reload plans list to show the newly created plan
                        this.store.dispatch(loadPlans({ params: { pageNumber: 1, pageSize: 20 } }));
                    });
                }, 1500);
            },
            error: (error) => {
                console.error('=== BUILDER DAYS SUBSCRIPTION - ERROR ===');
                console.error('❌ Error loading builder days:', error);
            },
            complete: () => {
                console.log('=== BUILDER DAYS SUBSCRIPTION - COMPLETE ===');
            }
        });

        console.log('=== SUBMITTING EXERCISES - END (async operations pending) ===\n');
    }

    goToStep(step: number) {
        this.store.dispatch(setBuilderStep({ step }));
    }

    cancel() {
        this.store.dispatch(resetBuilder());
        this.router.navigate(['/workouts/plans']);
    }
}
