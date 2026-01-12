// Workout Plan Models based on backend API specification

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

export enum AssignmentStatus {
    Active = 'Active',
    Completed = 'Completed',
    Paused = 'Paused',
    Cancelled = 'Cancelled'
}

// 1. Workout Plan (Metadata)
export interface WorkoutPlan {
    _id?: string;
    title: string;
    description?: string;
    level: WorkoutLevel;
    goal: WorkoutGoal;
    durationWeeks: number;
    createdBy: string; // User ID
    gymId: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// 2. Workout Day (Structure)
export interface WorkoutDay {
    _id?: string;
    workoutPlanId: string;
    dayNumber: number; // 1, 2, 3...
    focus: string; // e.g. "Chest Day"
    gymId: string;
    exercises?: WorkoutExercise[];
}

// 3. Workout Exercise (Details)
export interface WorkoutExercise {
    _id?: string;
    workoutDayId: string;
    exerciseId: string | any; // ID or populated Exercise object
    sets: number;
    reps: string; // "10-12"
    restSeconds: number;
    tempo?: string; // "3-0-1-0"
    notes?: string;
    order: number;
    gymId: string;
}

// 4. Assigned Plan (Member Link)
export interface AssignedWorkoutPlan {
    _id?: string;
    memberId: string;
    workoutPlanId: string | WorkoutPlan;
    startDate: string; // ISO Date
    endDate?: string;
    assignedBy: string;
    status: AssignmentStatus;
    gymId: string;
    createdAt?: string;
    updatedAt?: string;
}

// 5. Completion Tracking
export interface WorkoutCompletion {
    _id?: string;
    memberId: string;
    workoutPlanId: string;
    workoutDayId: string;
    exerciseId: string;
    completed: boolean;
    date: string;
    gymId: string;
}

// Full Plan Structure (for nested API response)
export interface WorkoutPlanStructure extends WorkoutPlan {
    days: (WorkoutDay & { exercises: WorkoutExercise[] })[];
}

// DTOs for API requests
export interface CreateWorkoutPlanDto {
    title: string;
    description?: string;
    level: WorkoutLevel;
    goal: WorkoutGoal;
    durationWeeks: number;
}

export interface AddDaysDto {
    days: { dayNumber: number; focus: string }[];
}

export interface AddExercisesDto {
    exercises: {
        exerciseId: string;
        sets: number;
        reps: string;
        restSeconds: number;
        order: number;
        tempo?: string;
        notes?: string;
    }[];
}

export interface AssignPlanDto {
    memberId: string;
    workoutPlanId: string;
    startDate: string;
    endDate?: string;
}

export interface TrackCompletionDto {
    memberId: string;
    workoutPlanId: string;
    workoutDayId: string;
    exerciseId: string;
    completed: boolean;
    date: string;
}

// Filters for list view
export interface WorkoutPlanFilters {
    level?: WorkoutLevel;
    goal?: WorkoutGoal;
    isActive?: boolean;
    search?: string;
}

// API Response types
export interface WorkoutPlanListResponse {
    plans: WorkoutPlan[];
    total: number;
    page: number;
    pages: number;
}

export interface MemberWorkoutResponse {
    assignment: AssignedWorkoutPlan;
    plan: WorkoutPlanStructure;
}
