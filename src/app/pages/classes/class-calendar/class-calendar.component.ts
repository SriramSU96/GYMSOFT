
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { GymClass } from '../../../core/models/gym-extensions.model';

@Component({
    selector: 'app-class-calendar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './class-calendar.component.html',
    styleUrls: ['./class-calendar.component.css']
})
export class ClassCalendar implements OnInit {
    weekDays: string[] = [];
    weekDates: Date[] = [];
    classes: GymClass[] = [];
    dateRangeLabel = '';

    // Mapping date string to classes for that day
    calendarData: { [key: string]: GymClass[] } = {};

    constructor(
        private bookingService: BookingService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.generateWeek(new Date());
        this.loadClasses();
    }

    generateWeek(startDate: Date): void {
        const startOfWeek = new Date(startDate);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        startOfWeek.setDate(diff);

        this.weekDates = [];
        this.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            this.weekDates.push(date);
        }

        const start = this.weekDates[0];
        const end = this.weekDates[6];
        this.dateRangeLabel = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }

    loadClasses(): void {
        const user = this.authService.getCurrentUser();
        if (!user?.gymId) return;

        this.bookingService.getClasses(user.gymId).subscribe({
            next: (data) => {
                this.classes = data;
                this.organizeClassesByDate();
            },
            error: (err) => console.error(err)
        });
    }

    organizeClassesByDate(): void {
        this.calendarData = {};

        this.weekDates.forEach(date => {
            const dateKey = date.toISOString().split('T')[0];
            this.calendarData[dateKey] = this.classes.filter(c => {
                // Assuming scheduleDate matches YYYY-MM-DD
                return c.scheduleDate.startsWith(dateKey);
            });
            // Sort by time
            this.calendarData[dateKey].sort((a, b) => a.startTime.localeCompare(b.startTime));
        });
    }
}
