
export interface User {
    id: string;
    _id?: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'trainer' | 'staff' | 'member';
    gymId: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}
