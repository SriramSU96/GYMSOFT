
export interface GymBranch {
    id: string;
    _id?: string;
    name: string;
    address: string;
    isMain: boolean;
    gymId: string;
}

export interface Gym {
    id: string;
    _id?: string;
    name: string;
    address?: string;
    ownerId: string;
    branches: GymBranch[];
    createdAt?: Date;
    updatedAt?: Date;
}
