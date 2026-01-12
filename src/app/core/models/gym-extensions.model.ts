
// --- WORKOUT & DIET MODELS ---
export interface Exercise {
    name: string;
    sets: number;
    reps: number; // Spec says Number
    restTime: string; // Spec says String
}

export interface Workout {
    _id?: string;
    title: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    goal: 'Weight Loss' | 'Muscle Gain' | 'Fitness';
    exercises: Exercise[];
    createdBy: string; // User ID
    memberId?: string; // NEW: Optional field for member-specific workouts
    gymId: string;
}

export interface DietMeal {
    time: string;
    foodItems: string;
    macros: {
        protein: number;
        carbs: number;
        fats: number;
    };
}

export interface DietMealItem {
    _id?: string;
    dietMealId: any; // Populated DietMeal
    quantity: string;
    notes?: string;
    order: number;
}

export interface DietMealSlot {
    _id?: string;
    mealTime: string;
    items: DietMealItem[];
}

export interface DietDay {
    _id?: string;
    dayNumber: number;
    mealSlots: DietMealSlot[];
}

export interface DietPlan {
    _id?: string;
    title: string;
    description?: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    goal: 'Weight Loss' | 'Muscle Gain' | 'Fitness' | 'Endurance';
    durationWeeks: number;
    days?: DietDay[]; // Nested structure
    calories?: number;
    meals?: any[]; // Legacy or flattened support if needed
    createdBy: string;
    memberId?: string;
    gymId: string;
    isActive: boolean;
}

export interface AssignedPlan {
    _id?: string;
    memberId: string;
    workoutId?: string; // Ref or Populated
    dietPlanId?: string; // Ref or Populated
    startDate: string;
    endDate?: string;
    gymId: string;
}

// --- INVENTORY & POS MODELS ---
export interface Product {
    _id?: string;
    name: string;
    category: 'Supplement' | 'Drink' | 'Gear' | 'Other';
    price: number;
    stock: number;
    gymId: string;
}

export interface SaleItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Sale {
    _id?: string;
    products: SaleItem[];
    totalAmount: number;
    paymentMethod: 'Cash' | 'Card' | 'UPI' | 'Other';
    soldBy: string; // User ID
    date?: string;
    gymId: string;
}

// --- CLASS & BOOKING MODELS ---
export interface GymClass {
    _id?: string;
    title: string;
    trainerId: string; // User ID
    scheduleDate: string; // ISO Date
    startTime: string; // "10:00 AM"
    duration: number; // minutes
    capacity: number;
    bookingsCount?: number;
    gymId: string;
}

export interface Booking {
    _id?: string;
    classId: string; // Spec says Ref
    memberId: string;
    status: 'Booked' | 'Cancelled' | 'Attended';
    gymId: string;
}
