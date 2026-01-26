export enum WorkoutLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced'
}

export enum WorkoutGoal {
    WeightLoss = 'Weight Loss',
    MuscleGain = 'Muscle Gain',
    Fitness = 'Fitness',
    Endurance = 'Endurance',
    Flexibility = 'Flexibility'
}

export interface Pagination {
    total: number;
    page: number;
    pages: number;
    limit: number;
}

export interface WorkoutPlan {
    _id: string;
    title: string;
    description?: string;
    level: WorkoutLevel | 'Beginner' | 'Intermediate' | 'Advanced';
    goal: WorkoutGoal | 'Weight Loss' | 'Muscle Gain' | 'Fitness' | 'Endurance' | 'Flexibility';
    durationWeeks: number;
    createdBy?: string;
    gymId: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WorkoutPlanFilters {
    level?: WorkoutLevel;
    goal?: WorkoutGoal;
    search?: string;
}

export interface WorkoutDay {
    _id?: string;
    workoutPlanId: string;
    dayNumber: number;
    focus: string;
    description?: string;
    exercises?: WorkoutExercise[]; // Populated in frontend usage often
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WorkoutExercise {
    _id?: string;
    workoutDayId: string;
    exerciseId: string;
    exercise?: Exercise; // Populated
    sets: number;
    reps: string;
    restSeconds?: number;
    tempo?: string;
    notes?: string;
    order: number;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Circular dependency avoidance: verify if Exercise needs to be imported or defined here. 
// Ideally defined in exercise.model.ts, but valid as type if imported.
import { Exercise } from './exercise.model';

export interface AssignedWorkoutPlan {
    _id: string;
    memberId: string;
    workoutPlanId: string;
    startDate: Date;
    endDate?: Date;
    status: 'Active' | 'Completed' | 'Paused' | 'Cancelled';
    assignedBy: string;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WorkoutCompletion {
    _id?: string;
    memberId: string;
    workoutDayId: string;
    exerciseId: string;
    completedSets?: number;
    completedReps?: string;
    weight?: number;
    completed?: boolean;
    notes?: string;
    completedAt: Date;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WorkoutPlanResponse {
    success: boolean;
    workoutPlan: WorkoutPlan;
}

export interface WorkoutPlansResponse {
    success: boolean;
    workoutPlans: WorkoutPlan[];
    pagination: Pagination;
}
