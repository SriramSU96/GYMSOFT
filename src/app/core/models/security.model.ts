export interface AuditLog {
    _id: string;
    userId: string;
    userName?: string; // Snapshot
    userRole?: string; // Snapshot
    action: string;
    resource: string;
    resourceId?: string;
    changes?: {
        before: any;
        after: any;
    };
    ipAddress?: string;
    userAgent?: string;
    status: 'success' | 'failed';
    severity: 'low' | 'medium' | 'high' | 'critical';
    errorMessage?: string;
    gymId: string;
    createdAt: Date;
}

export interface SecurityStats {
    totalSessions: number;
    activeSessions: number;
    failedLogins24h: number;
    passwordResets24h: number;
    suspiciousActivities: number;
    lastSecurityAudit?: Date;
}

export interface SecurityLogFilter {
    userId?: string;
    action?: string;
    resource?: string;
    severity?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
}

export interface Role {
    _id: string;
    name: string;
    permissions: string[];
    description?: string;
    isSystem?: boolean; // Cannot be deleted
    userCount?: number;
}
