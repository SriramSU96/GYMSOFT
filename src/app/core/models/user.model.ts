
export interface User {
    id: string; // Assuming 'id' comes from MongoDB _id or similar
    _id?: string; // MongoDB alias
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'trainer' | 'staff'; // Updated roles
    gymId?: string; // Added gymId
    // 'password', 'resetPassword*' are usually not in the frontend User interface for security/relevance
}

export interface LoginResponse {
    token: string;
    user: User;
}
