
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
    muscleGroup: MuscleGroup;
    equipment: Equipment;
    difficulty: Difficulty;
    description?: string;
    videoUrl?: string;
    imageUrl?: string;
    createdBy: {
        _id: string;
        name: string;
        email?: string;
    };
    gymId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ExerciseFilters {
    muscleGroup?: MuscleGroup;
    difficulty?: Difficulty;
    equipment?: Equipment;
    search?: string;
    includeInactive?: boolean;
}

export interface ExerciseListResponse {
    exercises: Exercise[];
    page: number;
    pages: number;
    total: number;
}

export interface CreateExerciseDto {
    name: string;
    muscleGroup: MuscleGroup;
    equipment: Equipment;
    difficulty: Difficulty;
    description?: string;
    videoUrl?: string;
    imageUrl?: string;
}

export interface UpdateExerciseDto {
    name?: string;
    muscleGroup?: MuscleGroup;
    equipment?: Equipment;
    difficulty?: Difficulty;
    description?: string;
    videoUrl?: string;
    imageUrl?: string;
}
