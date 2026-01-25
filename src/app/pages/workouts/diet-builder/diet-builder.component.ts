import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // We might use template driven for simplicity in nested structures or just IDs
import { DietService } from '../../../core/services/diet.service';
import { DietPlan } from '../../../core/models/gym-extensions.model';
import { DietMeal as DietMealRef, DietMealFilters } from '../../../core/models/diet.model';

// Temporary interface for local state until backend returns full nested object
// In a real scenario, the backend return type would match this
interface DietDay {
    _id?: string;
    dayNumber: number;
    mealSlots: DietMealSlot[];
}

interface DietMealSlot {
    _id?: string;
    mealTime: string; // Breakfast, Lunch, etc.
    items: DietMealItem[];
}

interface DietMealItem {
    _id?: string;
    dietMealId: DietMealRef; // Populated
    quantity: string;
    notes?: string;
    order: number;
}

@Component({
    selector: 'app-diet-builder',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './diet-builder.component.html',
    styles: [`
        .builder-container {
            display: flex;
            height: calc(100vh - 64px); /* Adjust based on navbar height */
            gap: var(--space-md);
            padding: var(--space-md);
            background: var(--bg-main);
        }

        .plan-structure {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
            overflow-y: auto;
            min-width: 0; /* detailed flex fix */
        }

        .header-card {
            background: var(--bg-surface);
            padding: var(--space-lg);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-subtle);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .days-nav {
            display: flex;
            gap: var(--space-sm);
            overflow-x: auto;
            padding-bottom: var(--space-xs);
            margin-bottom: var(--space-sm);
        }

        .day-tab {
            padding: var(--space-sm) var(--space-md);
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
        }

        .day-tab.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        .day-tab.add-btn {
            border-style: dashed;
            color: var(--primary-color);
        }

        .slots-container {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
        }

        .slot-card {
            background: var(--bg-surface);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-subtle);
            overflow: hidden;
        }

        .slot-header {
            padding: var(--space-md) var(--space-lg);
            background: var(--bg-surface-hover);
            border-bottom: 1px solid var(--border-subtle);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .slot-items {
            padding: var(--space-md);
        }

        .item-row {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            padding: var(--space-sm);
            border-bottom: 1px solid var(--border-subtle);
        }

        .item-row:last-child {
            border-bottom: none;
        }

        .item-info {
            flex: 1;
        }

        .item-qty {
            width: 150px;
        }

        .library-sidebar {
            width: 350px;
            background: var(--bg-surface);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-subtle);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .sidebar-header {
            padding: var(--space-md);
            border-bottom: 1px solid var(--border-subtle);
        }
        
        .meal-list {
            flex: 1;
            overflow-y: auto;
            padding: var(--space-md);
        }

        .library-meal-card {
            padding: var(--space-sm);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            margin-bottom: var(--space-sm);
            cursor: move; /* Suggest drag drop in future */
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .library-meal-card:hover {
            border-color: var(--primary-color);
            background: var(--bg-surface-hover);
        }
    `]
})
export class DietBuilderComponent implements OnInit {
    planId: string | null = null;
    plan: any = null; // Full plan object

    // State
    activeDayIndex = 0;
    isLoading = false;
    isSaving = false;

    // Library State
    searchQuery = '';
    availableMeals: DietMealRef[] = [];
    isDragActive = false; // Placeholder for DND

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dietService: DietService
    ) { }

    ngOnInit() {
        this.planId = this.route.snapshot.paramMap.get('id');
        if (this.planId) {
            this.loadPlan();
            this.loadMeals();
        }
    }

    loadPlan() {
        this.isLoading = true;
        this.dietService.getPlanById(this.planId!).subscribe({
            next: (data: any) => { // Expecting full nested object
                this.plan = data;
                // Ensure days exist
                if (!this.plan.days || this.plan.days.length === 0) {
                    // Add logic to init day 1 if needed from backend or manually
                    this.plan.days = [];
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    loadMeals() {
        const filters: DietMealFilters = {
            page: 1,
            pageSize: 50,
            search: this.searchQuery
        };
        this.dietService.getMeals(filters).subscribe({
            next: (res) => {
                this.availableMeals = res.meals;
            }
        });
    }

    onSearchMeals(event: any) {
        this.searchQuery = event.target.value;
        this.loadMeals(); // Debounce recommended in real app
    }

    // ==========================================
    // DAY ACTIONS
    // ==========================================

    addDay() {
        const nextDayNum = (this.plan.days?.length || 0) + 1;
        this.isSaving = true;
        this.dietService.createDay(this.planId!, { dayNumber: nextDayNum }).subscribe({
            next: (newDay) => {
                // Backend returns new day object, push to local state
                if (!this.plan.days) this.plan.days = [];
                this.plan.days.push(newDay);
                this.activeDayIndex = this.plan.days.length - 1;
                this.isSaving = false;
            },
            error: (err) => {
                console.error(err);
                this.isSaving = false;
            }
        });
    }

    selectDay(index: number) {
        this.activeDayIndex = index;
    }

    deleteDay(day: any, index: number) {
        if (!confirm(`Delete Day ${day.dayNumber}?`)) return;
        this.isSaving = true;
        this.dietService.deleteDay(day._id).subscribe({
            next: () => {
                this.plan.days.splice(index, 1);
                if (this.activeDayIndex >= this.plan.days.length) {
                    this.activeDayIndex = Math.max(0, this.plan.days.length - 1);
                }
                this.isSaving = false;
            },
            error: (err) => {
                console.error(err);
                this.isSaving = false;
            }
        });
    }

    // ==========================================
    // SLOT ACTIONS
    // ==========================================

    addSlot(day: any, mealTime: string) {
        this.isSaving = true;
        this.dietService.createSlot(day._id, { mealTime }).subscribe({
            next: (newSlot) => {
                if (!day.mealSlots) day.mealSlots = [];
                day.mealSlots.push(newSlot);
                this.isSaving = false;
            },
            error: (err) => {
                console.error(err);
                this.isSaving = false;
            }
        });
    }

    deleteSlot(day: any, slot: any, index: number) {
        if (!confirm(`Remove ${slot.mealTime}?`)) return;
        this.isSaving = true;
        this.dietService.deleteSlot(slot._id).subscribe({
            next: () => {
                day.mealSlots.splice(index, 1);
                this.isSaving = false;
            },
            error: (err) => {
                console.error(err);
                this.isSaving = false;
            }
        });
    }

    // ==========================================
    // ITEM ACTIONS
    // ==========================================

    addMealToSlot(slot: any, meal: DietMealRef) {
        // Quick add
        this.isSaving = true;
        const item = {
            dietMealId: meal._id,
            quantity: '1 serving', // Default
            order: (slot.items?.length || 0) + 1
        };

        this.dietService.addMealItem(slot._id, item).subscribe({
            next: (response) => {
                if (!slot.items) slot.items = [];
                const newItem = response.mealItem;
                // Manually populate dietMealId for local display
                // @ts-ignore
                newItem.dietMealId = meal;
                slot.items.push(newItem);
                this.isSaving = false;
            },
            error: (err) => {
                console.error(err);
                this.isSaving = false;
            }
        });
    }

    updateItemQty(item: any, qty: string) {
        // Debounce this in real app
        this.dietService.updateMealItem(item._id, { quantity: qty }).subscribe();
    }

    removeItem(slot: any, item: any, index: number) {
        this.dietService.removeMealItem(item._id).subscribe(() => {
            slot.items.splice(index, 1);
        });
    }

    // HELPER
    getActiveDay() {
        if (!this.plan || !this.plan.days || this.plan.days.length === 0) return null;
        return this.plan.days[this.activeDayIndex];
    }
}
