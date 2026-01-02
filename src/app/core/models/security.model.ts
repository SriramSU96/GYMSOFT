
export interface AuditLog {
    id: string;
    userId: string;
    action: string;
    resource: string;
    entity: string;
    details: string;
    ipAddress: string;
    gymId: string;
    timestamp?: string;
}

export interface Role {
    id: string;
    name: string;
    permissions: string[];
    userCount?: number;
}
