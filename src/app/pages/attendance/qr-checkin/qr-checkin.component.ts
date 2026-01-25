import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AttendanceActions from '../../../core/store/attendance/attendance.actions';
import * as AttendanceSelectors from '../../../core/store/attendance/attendance.selectors';
import jsQR from 'jsqr';

// ===================================
// INTERFACES
// ===================================

interface ScanResult {
    success: boolean;
    memberId?: string;
    memberName?: string;
    checkInTime?: string;
    date?: Date;
    errorTitle?: string;
    errorMessage?: string;
}

interface CheckInResponse {
    success: boolean;
    memberName: string;
    checkInTime: string;
    message?: string;
}

// ===================================
// COMPONENT
// ===================================

@Component({
    selector: 'app-qr-checkin',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './qr-checkin.component.html',
    styleUrls: ['./qr-checkin.component.css']
})
export class QrCheckinComponent implements OnInit, OnDestroy {
    @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

    private store = inject(Store);
    private router = inject(Router);

    // ===================================
    // STATE
    // ===================================

    // Scanner state
    isScannerActive: boolean = false;
    isProcessing: boolean = false;
    scanResult: ScanResult | null = null;

    // Status
    statusMessage: string = '';
    hasError: boolean = false;

    // Toast notification
    showToast: boolean = false;
    toastMessage: string = '';
    toastType: 'success' | 'error' = 'success';

    // Camera stream
    private stream: MediaStream | null = null;
    private scanInterval: any;

    // Offline detection
    isOffline = !navigator.onLine;
    private onlineListener = () => this.isOffline = false;
    private offlineListener = () => this.isOffline = true;

    // ===================================
    // LIFECYCLE HOOKS
    // ===================================

    constructor() {
        window.addEventListener('online', this.onlineListener);
        window.addEventListener('offline', this.offlineListener);
    }

    ngOnInit(): void {
        // Auto-start scanner on mobile devices
        if (this.isMobileDevice()) {
            setTimeout(() => this.startScanner(), 500);
        }
    }

    ngOnDestroy() {
        this.stopScanner();
        window.removeEventListener('online', this.onlineListener);
        window.removeEventListener('offline', this.offlineListener);
    }

    // ===================================
    // SCANNER CONTROL
    // ===================================

    /**
     * Start the QR scanner
     */
    async startScanner() {
        try {
            this.statusMessage = 'Requesting camera access...';
            this.hasError = false;

            // Request camera access
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera on mobile
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            // Wait for video element to be available
            setTimeout(() => {
                if (this.videoElement && this.videoElement.nativeElement) {
                    this.videoElement.nativeElement.srcObject = this.stream;
                    this.isScannerActive = true;
                    this.statusMessage = 'Scanner active. Point at QR code...';

                    // Start scanning loop
                    this.startScanLoop();
                }
            }, 100);

        } catch (error) {
            console.error('Error accessing camera:', error);
            this.statusMessage = 'Camera access denied. Please enable camera permissions.';
            this.hasError = true;
            this.showToastNotification('Camera access denied', 'error');
        }
    }

    /**
     * Stop the QR scanner
     */
    stopScanner() {
        // Stop scan loop
        if (this.scanInterval) {
            clearInterval(this.scanInterval);
        }

        // Stop camera stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }

        this.isScannerActive = false;
        this.isProcessing = false;
        this.statusMessage = '';
    }

    /**
     * Reset scanner for next scan
     */
    resetScanner() {
        this.scanResult = null;
        this.statusMessage = '';
        this.hasError = false;
        this.startScanner();
    }

    // ===================================
    // QR CODE SCANNING
    // ===================================

    /**
     * Start continuous scan loop
     */
    startScanLoop() {
        this.scanInterval = setInterval(() => {
            if (!this.isProcessing && this.isScannerActive) {
                this.scanFrame();
            }
        }, 300); // Scan every 300ms
    }

    /**
     * Scan a single frame from video
     */
    scanFrame() {
        if (!this.videoElement || !this.videoElement.nativeElement) return;

        const video = this.videoElement.nativeElement;

        // Check if video is ready
        if (video.readyState !== video.HAVE_ENOUGH_DATA) return;

        // Create canvas to capture frame
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Scan for QR code
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert'
        });

        if (code && code.data) {
            this.onQRCodeDetected(code.data);
        }
    }

    /**
     * Handle QR code detection
     */
    async onQRCodeDetected(qrData: string) {
        this.isProcessing = true;
        this.statusMessage = 'Processing QR code...';

        // Stop scanner
        this.stopScanner();

        try {
            // Parse QR data
            let token = qrData;
            try {
                const parsed = JSON.parse(qrData);
                if (parsed.token) token = parsed.token;
                else if (parsed.memberId) token = JSON.stringify(parsed);
            } catch (e) {
                // Not JSON, use raw
            }

            // Process check-in
            await this.processCheckIn({ memberId: token });

        } catch (error) {
            console.error('Error processing QR code:', error);
            this.handleScanError('Invalid QR Code', 'This QR code is not valid or has expired.');
        }
    }

    /**
     * Process check-in with backend
     */
    async processCheckIn(tokenData: any) {
        try {
            // Check if offline
            if (this.isOffline) {
                this.saveOfflineCheckIn(tokenData.memberId);
                return;
            }

            // Call backend API
            const response = await this.submitCheckIn(tokenData);

            if (response.success) {
                // Success
                this.scanResult = {
                    success: true,
                    memberId: tokenData.memberId,
                    memberName: response.memberName,
                    checkInTime: response.checkInTime,
                    date: new Date()
                };

                this.showToastNotification(`Welcome, ${response.memberName}!`, 'success');

                // Auto-reset after 3 seconds
                setTimeout(() => {
                    this.resetScanner();
                }, 3000);

            } else {
                this.handleScanError('Check-In Failed', response.message || 'Unable to process check-in');
            }

        } catch (error) {
            console.error('Error submitting check-in:', error);
            this.handleScanError('Connection Error', 'Unable to connect to server. Please try again.');
        }
    }

    /**
     * Submit check-in to backend
     */
    async submitCheckIn(tokenData: any): Promise<CheckInResponse> {
        // Mock API response
        return new Promise((resolve) => {
            setTimeout(() => {
                const scenarios = [
                    { success: true, memberName: 'Rahul Sharma', checkInTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
                    { success: false, memberName: '', checkInTime: '', message: 'Already checked in today' },
                    { success: false, memberName: '', checkInTime: '', message: 'Membership expired' }
                ];

                const scenario = Math.random() > 0.2 ? scenarios[0] : scenarios[Math.floor(Math.random() * 2) + 1];
                resolve(scenario);
            }, 800);
        });
    }

    /**
     * Save check-in offline
     */
    saveOfflineCheckIn(memberId: string) {
        const offlineData = {
            memberId,
            date: new Date().toISOString(),
            checkInTime: new Date().toLocaleTimeString()
        };

        localStorage.setItem('offline_attendance', JSON.stringify(offlineData));

        this.scanResult = {
            success: true,
            memberId,
            memberName: 'Member',
            checkInTime: offlineData.checkInTime,
            date: new Date()
        };

        this.showToastNotification('Saved offline. Will sync when online.', 'success');

        setTimeout(() => {
            this.resetScanner();
        }, 3000);
    }

    /**
     * Handle scan error
     */
    handleScanError(title: string, message: string) {
        this.scanResult = {
            success: false,
            errorTitle: title,
            errorMessage: message
        };

        this.showToastNotification(title, 'error');
        this.isProcessing = false;

        setTimeout(() => {
            this.resetScanner();
        }, 3000);
    }

    /**
     * Show toast notification
     */
    showToastNotification(message: string, type: 'success' | 'error') {
        this.toastMessage = message;
        this.toastType = type;
        this.showToast = true;

        setTimeout(() => {
            this.showToast = false;
        }, 3000);
    }

    /**
     * Check if device is mobile
     */
    isMobileDevice(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Navigate back
     */
    goBack() {
        this.router.navigate(['/attendance/members']);
    }
}
