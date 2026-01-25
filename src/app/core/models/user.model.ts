export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'trainer' | 'staff' | 'member';
    gymId: string;
    isActive?: boolean;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserSession {
    _id: string;
    userId: string;
    token: string;
    ipAddress?: string;
    userAgent?: string;
    isActive: boolean;
    lastActivity: Date;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SecurityLog {
    _id: string;
    userId: string;
    action: string; // 'login' | 'logout' | 'failed_login' | ...
    ipAddress?: string;
    userAgent?: string;
    status: 'success' | 'failed';
    reason?: string;
    gymId: string;
    createdAt: Date;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    user: User;
}

export interface AuthResponse {
    success: boolean;
    user?: User;
    message?: string;
}
