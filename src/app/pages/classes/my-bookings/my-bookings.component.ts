
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking } from '../../../core/models/gym-extensions.model';

@Component({
    selector: 'app-my-bookings',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './my-bookings.component.html',
    styleUrls: ['./my-bookings.component.css']
})
export class MyBookings implements OnInit {
    bookings: Booking[] = [];
    isLoading = false;
    successMessage = '';

    constructor(
        private bookingService: BookingService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadBookings();
    }

    loadBookings(): void {
        const user = this.authService.getCurrentUser();
        if (!user?._id) return;

        this.isLoading = true;
        this.bookingService.getMemberBookings(user._id).subscribe({
            next: (data) => {
                this.bookings = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading bookings', err);
                this.isLoading = false;
            }
        });
    }

    cancelBooking(bookingId: string): void {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        this.bookingService.cancelBooking(bookingId).subscribe({
            next: () => {
                this.successMessage = 'Booking cancelled successfully.';
                this.loadBookings(); // Refresh list
                setTimeout(() => this.successMessage = '', 3000);
            },
            error: (err) => console.error('Cancellation failed', err)
        });
    }
}
