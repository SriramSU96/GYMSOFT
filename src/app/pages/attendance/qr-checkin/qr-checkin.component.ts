import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AttendanceActions from '../../../core/store/attendance/attendance.actions';
import * as AttendanceSelectors from '../../../core/store/attendance/attendance.selectors';

@Component({
    selector: 'app-qr-checkin',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './qr-checkin.component.html',
    styleUrls: ['./qr-checkin.component.css']
})
export class QrCheckinComponent implements OnDestroy {
    private store = inject(Store);

    isScanning$: Observable<boolean> = this.store.select(AttendanceSelectors.selectIsScanning);
    scanSuccess$: Observable<boolean> = this.store.select(AttendanceSelectors.selectScanSuccess);
    scannedData$: Observable<string | null> = this.store.select(AttendanceSelectors.selectScannedData);
    statusMessage$: Observable<string> = this.store.select(AttendanceSelectors.selectScannerStatus);

    isOffline = !navigator.onLine;

    private onlineListener = () => this.isOffline = false;
    private offlineListener = () => this.isOffline = true;

    constructor() {
        window.addEventListener('online', this.onlineListener);
        window.addEventListener('offline', this.offlineListener);
    }

    startScanning() {
        this.store.dispatch(AttendanceActions.startScan());

        // Mocking a scan after 1.5 seconds for better feel
        // In a real app, this would be an effect reacting to startScan
        setTimeout(() => {
            this.onScanSuccess('MBR-' + Math.floor(10000 + Math.random() * 90000));
        }, 1500);
    }

    onScanSuccess(data: string) {
        // Only dispatch scanSuccess to store the member ID in scannedData
        this.store.dispatch(AttendanceActions.scanSuccess({ data }));
        this.saveAttendance(data);
    }

    saveAttendance(memberId: string) {
        if (this.isOffline) {
            alert('Offline: Attendance saved locally. Will sync when online.');
            localStorage.setItem('offline_attendance', JSON.stringify({
                memberId,
                date: new Date().toISOString(),
                checkInTime: new Date().toLocaleTimeString()
            }));
        } else {
            this.store.dispatch(AttendanceActions.qrCheckIn({
                data: {
                    memberId,
                    gymId: 'gym-1',
                    date: new Date().toISOString().split('T')[0],
                    checkInTime: new Date().toTimeString().split(' ')[0] // Uses HH:mm:ss format
                }
            }));
        }
    }

    ngOnDestroy() {
        this.store.dispatch(AttendanceActions.stopScan());
        window.removeEventListener('online', this.onlineListener);
        window.removeEventListener('offline', this.offlineListener);
    }
}
