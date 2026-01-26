export interface DietPlan {
    _id: string;
    title: string;
    description?: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    goal: 'Weight Loss' | 'Muscle Gain' | 'Fitness';
    durationDays: number;
    durationWeeks?: number;
    createdBy?: string;
    gymId: string;
    isActive: boolean;
    calories?: number;
    meals?: any[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DietDay {
    _id?: string;
    dietPlanId: string;
    dayNumber: number;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
    mealSlots?: DietMealSlot[]; // Populated often
}

export interface DietMealSlot {
    _id?: string;
    dietDayId: string;
    mealTime: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'; // Matches backend enum
    time?: string; // Component usage alias
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
    items?: DietMealItem[]; // Populated
}

export interface DietMealItem {
    _id?: string;
    dietMealSlotId: string;
    dietMealId?: string | DietMeal; // Reference to DietMeal
    foodName?: string; // Fallback or override
    quantity: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    order?: number;
    notes?: string;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AssignedDietPlan {
    _id: string;
    memberId: string;
    dietPlanId: string;
    startDate: Date;
    endDate?: Date;
    status: 'Active' | 'Completed' | 'Paused';
    assignedBy: string;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DietPlanResponse {
    success: boolean;
    dietPlan: DietPlan;
}

export interface DietPlansResponse {
    success: boolean;
    dietPlans: DietPlan[];
}

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
    _id: string;
    name: string;
    category: MealCategory | string;
    foodType: FoodType | string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber?: number;
    description?: string;
    imageUrl?: string;
    gymId: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DietMealFilters {
    search?: string;
    category?: string;
    foodType?: string;
    includeInactive?: boolean;
    page?: number;
    pageSize?: number;
}
