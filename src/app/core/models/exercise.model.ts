export enum MuscleGroup {
    Chest = 'Chest',
    Back = 'Back',
    Legs = 'Legs',
    Arms = 'Arms',
    Shoulders = 'Shoulders',
    Core = 'Core',
    FullBody = 'Full Body'
}

export enum Equipment {
    Bodyweight = 'Bodyweight',
    Dumbbell = 'Dumbbell',
    Barbell = 'Barbell',
    Machine = 'Machine',
    ResistanceBand = 'Resistance Band'
}

export enum Difficulty {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced'
}

export interface Exercise {
    _id: string;
    name: string;
    muscleGroup: MuscleGroup | 'Chest' | 'Back' | 'Legs' | 'Arms' | 'Shoulders' | 'Core' | 'Full Body';
    equipment: Equipment | 'Bodyweight' | 'Dumbbell' | 'Barbell' | 'Machine' | 'Resistance Band';
    difficulty: Difficulty | 'Beginner' | 'Intermediate' | 'Advanced';
    description?: string;
    videoUrl?: string;
    imageUrl?: string;
    createdBy?: string;
    gymId: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ExerciseFilters {
    muscleGroup?: string;
    equipment?: string;
    difficulty?: string;
    search?: string;
    includeInactive?: boolean;
}

export interface ExerciseResponse {
    success: boolean;
    exercise: Exercise;
}

export interface ExercisesResponse {
    success: boolean;
    exercises: Exercise[];
}

export interface CreateExerciseDto {
    name: string;
    muscleGroup: MuscleGroup | string;
    equipment: Equipment | string;
    difficulty: Difficulty | string;
    description?: string;
    videoUrl?: string;
    imageUrl?: string;
}

export interface UpdateExerciseDto {
    name?: string;
    muscleGroup?: MuscleGroup | string;
    equipment?: Equipment | string;
    difficulty?: Difficulty | string;
    description?: string;
    videoUrl?: string;
    imageUrl?: string;
}
