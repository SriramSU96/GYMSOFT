export enum MealCategory {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Snack = 'Snack'
}

export enum FoodType {
    Veg = 'Veg',
    NonVeg = 'Non-Veg',
    Vegan = 'Vegan'
}

export interface DietMeal {
    _id?: string;
    name: string;
    category: MealCategory;
    foodType: FoodType;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    description?: string;
    imageUrl?: string;
    gymId?: string;
    createdBy?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface DietMealFilters {
    category?: MealCategory;
    foodType?: FoodType;
    search?: string;
    page: number;
    pageSize: number;
}

export interface DietMealListResponse {
    data: DietMeal[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}
