
export interface AuditLog {
    _id?: string;
    userId: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN';
    entity: string;
    details?: string;
    gymId: string;
    createdAt?: string;
}

export interface Role {
    _id?: string;
    name: 'admin' | 'manager' | 'trainer' | 'staff' | 'member';
    userCount?: number;
    permissions?: string[];
}
