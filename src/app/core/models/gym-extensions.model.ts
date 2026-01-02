
// --- WORKOUT & DIET MODELS ---
export interface Exercise {
    name: string;
    sets: number;
    reps: string;
    restTime: string;
}

export interface Workout {
    _id: string;
    title: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    goal: 'Weight Loss' | 'Muscle Gain' | 'Fitness';
    exercises: Exercise[];
    createdBy: string; // User ID
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

export interface DietPlan {
    _id: string;
    title: string;
    calories: number;
    meals: DietMeal[];
    gymId: string;
}

export interface AssignedPlan {
    memberId: string;
    workoutId: Workout; // Populated
    dietPlanId: DietPlan; // Populated
    startDate: string;
    endDate?: string;
    gymId: string;
}

// --- INVENTORY & POS MODELS ---
export interface Product {
    _id: string;
    name: string;
    category: 'Supplement' | 'Drink' | 'Gear' | 'Other';
    price: number;
    stock: number;
    gymId: string;
}

export interface SaleItem {
    productId: string;
    productName?: string; // For UI display
    quantity: number;
    price: number;
}

export interface Sale {
    _id: string;
    products: SaleItem[];
    totalAmount: number;
    paymentMethod: 'Cash' | 'Card' | 'UPI';
    soldBy: string; // User ID
    date: string;
    gymId: string;
}

// --- CLASS & BOOKING MODELS ---
export interface GymClass {
    _id: string;
    title: string;
    trainerId: string; // User ID
    scheduleDate: string; // ISO Date
    startTime: string; // "10:00 AM"
    duration: number; // minutes
    capacity: number;
    bookingsCount: number;
    gymId: string;
}

export interface Booking {
    _id: string;
    classId: GymClass; // Populated
    memberId: string;
    status: 'Booked' | 'Cancelled' | 'Attended';
    gymId: string;
}
