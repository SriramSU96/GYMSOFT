export interface GymBranch {
    id?: string; // Frontend ID often used
    _id?: string; // Backend ID
    name: string;
    address: string;
    phone?: string;
    email?: string;
    managerId?: string;
    isMain: boolean;
    gymId: string;
}

export interface GymConfig {
    currency: string;
    taxRate: number;
    timezone: string;
    dateFormat: string;
    logoUrl?: string;
    features: {
        pos: boolean;
        attendance: boolean;
        workouts: boolean;
        diet: boolean;
    };
}

export interface Gym {
    _id: string; // Mandatory for core entity
    name: string;
    address?: string;
    ownerId: string;
    logo?: string; // URL
    website?: string;
    isActive: boolean;
    branches: GymBranch[];
    config?: GymConfig;
    createdAt?: Date;
    updatedAt?: Date;
}
