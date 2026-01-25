import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../../../core/services/progress.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-add-progress-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-progress-dialog.component.html',
    styleUrls: ['./add-progress-dialog.component.css']
})
export class AddProgressDialogComponent implements OnInit {
    private progressService = inject(ProgressService);
    private toastService = inject(ToastService);

    isOpen: boolean = false;
    saving: boolean = false;

    // Form data
    memberId: string = '';
    memberName: string = '';
    weight: number = 0;
    bmi: number = 0;
    bodyFat: number | null = null;
    muscleMass: number | null = null;
    notes: string = '';
    gymId: string = '';

    // Measurements
    chest: number | null = null;
    waist: number | null = null;
    hips: number | null = null;
    arms: number | null = null;
    thighs: number | null = null;

    // Callback for when progress is added
    onProgressAdded?: () => void;

    ngOnInit() { }

    open(memberId: string, memberName: string, gymId: string, callback?: () => void) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.gymId = gymId;
        this.onProgressAdded = callback;
        this.isOpen = true;
        this.resetForm();
    }

    close() {
        this.isOpen = false;
        this.resetForm();
    }

    resetForm() {
        this.weight = 0;
        this.bmi = 0;
        this.bodyFat = null;
        this.muscleMass = null;
        this.notes = '';
        this.chest = null;
        this.waist = null;
        this.hips = null;
        this.arms = null;
        this.thighs = null;
    }

    // Auto-calculate BMI when weight changes
    calculateBMI(height: number = 170) {
        if (this.weight > 0 && height > 0) {
            const heightInMeters = height / 100;
            this.bmi = parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(1));
        }
    }

    save() {
        if (!this.weight || this.weight <= 0) {
            this.toastService.error('Please enter a valid weight');
            return;
        }

        if (!this.memberId || !this.gymId) {
            this.toastService.error('Member ID and Gym ID are required');
            return;
        }

        this.saving = true;

        const progressData: any = {
            memberId: this.memberId,
            weight: this.weight,
            gymId: this.gymId
        };

        // Add optional fields only if they have values
        if (this.bmi) {
            progressData.bmi = this.bmi;
        }

        if (this.bodyFat) {
            progressData.bodyFat = this.bodyFat;
        }

        if (this.muscleMass) {
            progressData.muscleMass = this.muscleMass;
        }

        if (this.notes) {
            progressData.notes = this.notes;
        }

        // Add measurements if any are provided
        const measurements: any = {};
        if (this.chest) measurements.chest = this.chest;
        if (this.waist) measurements.waist = this.waist;
        if (this.hips) measurements.hips = this.hips;
        if (this.arms) measurements.arms = this.arms;
        if (this.thighs) measurements.thighs = this.thighs;

        if (Object.keys(measurements).length > 0) {
            progressData.measurements = measurements;
        }

        console.log('Sending progress data:', progressData);

        this.progressService.addProgress(progressData).subscribe({
            next: () => {
                this.toastService.success('Progress entry added successfully');
                this.saving = false;
                this.close();

                // Call the callback to refresh the list
                if (this.onProgressAdded) {
                    this.onProgressAdded();
                }
            },
            error: (error) => {
                console.error('Error adding progress:', error);
                const errorMessage = error.error?.message || 'Failed to add progress entry';
                this.toastService.error(errorMessage);
                this.saving = false;
            }
        });
    }
}
