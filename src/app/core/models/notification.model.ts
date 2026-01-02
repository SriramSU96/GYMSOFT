
export interface Notification {
    id: string;
    recipientId: string;
    title: string;
    message: string;
    isRead: boolean; // Backend field
    type: 'info' | 'warning' | 'success' | 'error';
    gymId: string;
}
