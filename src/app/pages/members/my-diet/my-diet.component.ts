
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietService } from '../../../core/services/diet.service';
import { AuthService } from '../../../core/services/auth.service';
import { DietPlan, AssignedDietPlan } from '../../../core/models/diet.model';

@Component({
    selector: 'app-my-diet',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './my-diet.component.html',
    styleUrls: ['./my-diet.component.css']
})
export class MyDiet implements OnInit {
    dietPlan: DietPlan | null = null;
    isLoading = true;

    constructor(
        private dietService: DietService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        const user = this.authService.currentUserValue;
        if (user && user._id) {
            this.loadAssignedDiet(user._id);
        }
    }

    loadAssignedDiet(memberId: string): void {
        this.dietService.getMemberDiet(memberId).subscribe({
            next: (res: any) => {
                // Assuming res.diet.dietPlanId is populated with the Plan
                if (res.diet && typeof res.diet.dietPlanId === 'object') {
                    this.dietPlan = res.diet.dietPlanId;
                }
                this.isLoading = false;
            },
            error: (err: any) => {
                console.error('No diet plan found or error', err);
                this.isLoading = false;
            }
        });
    }
}
