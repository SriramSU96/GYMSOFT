export interface Notification {
    id: string;
    recipientId: string;
    title: string;
    message: string;
    isRead: boolean;
    type: 'info' | 'warning' | 'success' | 'error';
    gymId: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
