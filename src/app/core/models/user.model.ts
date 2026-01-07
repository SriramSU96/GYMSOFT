
export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'trainer' | 'staff' | 'member';
    gymId: string;
}

export interface LoginResponse extends User {
    token: string;
}
