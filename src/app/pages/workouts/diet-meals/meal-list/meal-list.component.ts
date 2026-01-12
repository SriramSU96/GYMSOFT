
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DietService } from '../../../../../core/services/diet.service';
import { DietMeal, DietMealFilters, MealCategory, FoodType } from '../../../../../core/models/diet.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-meal-list',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './meal-list.component.html',
    styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
    meals: DietMeal[] = [];
    isLoading = false;
    totalMeals = 0;
    totalPages = 0;

    // Filters
    searchQuery = '';
    selectedCategory: MealCategory | '' = '';
    selectedFoodType: FoodType | '' = '';
    currentPage = 1;
    pageSize = 12;

    // Enums for template
    categories = Object.values(MealCategory);
    foodTypes = Object.values(FoodType);

    // Search Debounce
    private searchSubject = new Subject<string>();

    // Modal
    selectedMeal: DietMeal | null = null;
    isModalOpen = false;

    constructor(private dietService: DietService) {
        // Setup search debounce
        this.searchSubject.pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe(query => {
            this.searchQuery = query;
            this.currentPage = 1;
            this.loadMeals();
        });
    }

    ngOnInit() {
        this.loadMeals();
    }

    onSearch(event: any) {
        this.searchSubject.next(event.target.value);
    }

    onFilterChange() {
        this.currentPage = 1;
        this.loadMeals();
    }

    loadMeals() {
        this.isLoading = true;

        const filters: DietMealFilters = {
            page: this.currentPage,
            pageSize: this.pageSize,
            search: this.searchQuery,
            category: this.selectedCategory !== '' ? this.selectedCategory : undefined,
            foodType: this.selectedFoodType !== '' ? this.selectedFoodType : undefined
        };

        this.dietService.getMeals(filters).subscribe({
            next: (response) => {
                this.meals = response.data;
                this.totalMeals = response.pagination.total;
                this.totalPages = response.pagination.totalPages;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading meals', err);
                this.isLoading = false;
                // Mock data fallback if API fails (for development/demo)
                if (this.meals.length === 0 && this.isLoading === false) {
                    // fallback handled via empty state or we could inject mock data here
                }
            }
        });
    }

    getPageArray(): number[] {
        return Array(this.totalPages).fill(0).map((x, i) => i + 1);
    }

    changePage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadMeals();
        }
    }

    // Actions
    openMealDetails(meal: DietMeal) {
        this.selectedMeal = meal;
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.selectedMeal = null;
    }

    editMeal(meal: DietMeal) {
        console.log('Edit meal', meal);
        // Router navigate to edit page
    }

    deactivateMeal(meal: DietMeal) {
        if (confirm(`Are you sure you want to deactivate ${meal.name}?`)) {
            this.dietService.deactivateMeal(meal._id!).subscribe(() => {
                this.loadMeals();
            });
        }
    }
}
