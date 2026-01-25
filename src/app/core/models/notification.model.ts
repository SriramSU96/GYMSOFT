export interface Notification {
    _id: string; // Changed from id to _id to match MongoDB
    recipientId: string;
    title: string;
    message: string;
    isRead: boolean;
    type: 'info' | 'warning' | 'success' | 'error' | 'system' | 'alert' | 'message';
    link?: string; // Optional link to navigate to
    metadata?: any; // e.g., related entity ID
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NotificationPreferences {
    userId: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    types: {
        system: boolean;
        marketing: boolean;
        reminders: boolean;
        security: boolean;
    };
}

export interface NotificationFilter {
    isRead?: boolean;
    type?: string;
    startDate?: string;
    endDate?: string;
}
