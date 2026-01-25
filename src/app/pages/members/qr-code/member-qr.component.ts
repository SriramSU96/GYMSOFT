import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import QRCode from 'qrcode';

// ===================================
// INTERFACES
// ===================================

interface QRTokenResponse {
    token: string;
    expiresAt: string;
    validityMinutes: number;
}

// ===================================
// COMPONENT
// ===================================

@Component({
    selector: 'app-member-qr',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './member-qr.component.html'
})
export class MemberQrComponent implements OnInit, OnDestroy {
    @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;

    private router = inject(Router);

    // ===================================
    // STATE
    // ===================================

    // Member info
    memberName: string = 'John Doe';
    memberId: string = 'MBR-12345';
    gymName: string = 'GYM SOFT';

    // QR Code data
    qrCodeData: string = '';
    qrValidityMinutes: number = 5; // QR code valid for 5 minutes
    isRefreshing: boolean = false;

    // Countdown timer
    remainingMinutes: string = '05';
    remainingSeconds: string = '00';
    validityPercentage: number = 100;

    // Timers
    private countdownInterval: any;
    private autoRefreshInterval: any;
    private expiryTime: Date | null = null;

    // ===================================
    // LIFECYCLE HOOKS
    // ===================================

    ngOnInit() {
        // Load member info from storage/state
        this.loadMemberInfo();

        // Generate initial QR code
        this.generateQRCode();

        // Set up auto-refresh (every X minutes)
        this.setupAutoRefresh();
    }

    ngOnDestroy() {
        // Clean up timers
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
        }
    }

    // ===================================
    // DATA LOADING
    // ===================================

    /**
     * Load member information
     * In production, fetch from auth service or state management
     */
    loadMemberInfo() {
        // TODO: Replace with actual member data from auth service
        // Example: this.authService.getCurrentMember()

        // Mock data for demonstration
        this.memberName = 'Rahul Sharma';
        this.memberId = 'MBR-' + Math.floor(10000 + Math.random() * 90000);
    }

    // ===================================
    // QR CODE GENERATION
    // ===================================

    /**
     * Generate QR code with token from backend
     */
    async generateQRCode() {
        this.isRefreshing = true;

        try {
            // Fetch QR token from backend
            const tokenData = await this.fetchQRToken();

            // Store QR data
            this.qrCodeData = tokenData.token;
            this.qrValidityMinutes = tokenData.validityMinutes;
            this.expiryTime = new Date(tokenData.expiresAt);

            // Wait for view to render canvas
            setTimeout(() => {
                this.renderQRCode(this.qrCodeData);
                this.startCountdown();
                this.isRefreshing = false;
            }, 100);

        } catch (error) {
            console.error('Error generating QR code:', error);
            this.isRefreshing = false;
            alert('Failed to generate QR code. Please try again.');
        }
    }

    /**
     * Fetch QR token from backend
     * In production, this calls your API
     */
    async fetchQRToken(): Promise<QRTokenResponse> {
        // TODO: Replace with actual API call
        // Example: return this.http.get<QRTokenResponse>('/api/members/qr-token').toPromise()

        // Mock API response
        return new Promise((resolve) => {
            setTimeout(() => {
                const expiresAt = new Date();
                expiresAt.setMinutes(expiresAt.getMinutes() + this.qrValidityMinutes);

                resolve({
                    token: JSON.stringify({
                        memberId: this.memberId,
                        timestamp: Date.now(),
                        gymId: 'GYM-001',
                        // In production, this would be a secure JWT or encrypted token
                        signature: this.generateSecureToken()
                    }),
                    expiresAt: expiresAt.toISOString(),
                    validityMinutes: this.qrValidityMinutes
                });
            }, 500);
        });
    }

    /**
     * Generate secure token (mock)
     * In production, backend generates this
     */
    generateSecureToken(): string {
        return 'SEC-' + Math.random().toString(36).substring(2, 15);
    }

    /**
     * Render QR code on canvas
     */
    async renderQRCode(data: string) {
        if (!this.qrCanvas) return;

        try {
            await QRCode.toCanvas(this.qrCanvas.nativeElement, data, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                errorCorrectionLevel: 'H'
            });
        } catch (error) {
            console.error('Error rendering QR code:', error);
        }
    }

    /**
     * Manually refresh QR code
     */
    refreshQRCode() {
        if (this.isRefreshing) return;

        // Stop current countdown
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        // Generate new QR code
        this.generateQRCode();
    }

    // ===================================
    // COUNTDOWN TIMER
    // ===================================

    /**
     * Start countdown timer
     */
    startCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        this.countdownInterval = setInterval(() => {
            if (!this.expiryTime) return;

            const now = new Date();
            const diff = this.expiryTime.getTime() - now.getTime();

            if (diff <= 0) {
                // QR code expired, auto-refresh
                this.refreshQRCode();
                return;
            }

            // Calculate remaining time
            const totalSeconds = Math.floor(diff / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            this.remainingMinutes = String(minutes).padStart(2, '0');
            this.remainingSeconds = String(seconds).padStart(2, '0');

            // Calculate validity percentage
            const totalDuration = this.qrValidityMinutes * 60 * 1000;
            this.validityPercentage = Math.max(0, (diff / totalDuration) * 100);
        }, 1000);
    }

    /**
     * Set up auto-refresh timer
     */
    setupAutoRefresh() {
        // Auto-refresh 10 seconds before expiry
        const refreshInterval = (this.qrValidityMinutes * 60 - 10) * 1000;

        this.autoRefreshInterval = setInterval(() => {
            this.refreshQRCode();
        }, refreshInterval);
    }

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================

    /**
     * Get initials from name
     */
    getInitials(name: string): string {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    /**
     * Navigate back
     */
    goBack() {
        this.router.navigate(['/members/dashboard']);
    }
}
