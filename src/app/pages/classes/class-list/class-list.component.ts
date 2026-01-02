
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { GymClass } from '../../../core/models/gym-extensions.model';

@Component({
    selector: 'app-class-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.css']
})
export class ClassList implements OnInit {
    classes: GymClass[] = [];
    isLoading = false;
    successMessage = '';
    errorMessage = '';

    constructor(
        private bookingService: BookingService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadClasses();
    }

    loadClasses(): void {
        const user = this.authService.getCurrentUser();
        if (!user?.gymId) return;

        this.isLoading = true;
        this.bookingService.getClasses(user.gymId).subscribe({
            next: (data) => {
                this.classes = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading classes', err);
                this.isLoading = false;
            }
        });
    }

    bookClass(gymClass: GymClass): void {
        const user = this.authService.getCurrentUser();
        if (!user?._id || !user?.gymId) {
            this.errorMessage = 'You must be logged in to book a class.';
            return;
        }

        if (gymClass.bookingsCount >= gymClass.capacity) {
            this.errorMessage = 'Class is full.';
            return;
        }

        this.bookingService.bookClass({
            classId: gymClass._id,
            memberId: user._id,
            gymId: user.gymId
        }).subscribe({
            next: () => {
                this.successMessage = `Successfully booked ${gymClass.title}!`;
                // Optimistic update
                gymClass.bookingsCount++;
                setTimeout(() => this.successMessage = '', 3000);
            },
            error: (err) => {
                console.error('Booking failed', err);
                this.errorMessage = err.error?.message || 'Booking failed. You might already be booked.';
                setTimeout(() => this.errorMessage = '', 3000);
            }
        });
    }
}
