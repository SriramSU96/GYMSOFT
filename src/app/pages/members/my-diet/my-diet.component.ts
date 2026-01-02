
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietService } from '../../../core/services/diet.service';
import { AuthService } from '../../../core/services/auth.service';
import { DietPlan } from '../../../core/models/gym-extensions.model';

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
        const user = this.authService.getCurrentUser();
        if (user && user._id) {
            this.loadAssignedDiet(user._id);
        }
    }

    loadAssignedDiet(memberId: string): void {
        this.dietService.getMemberDiet(memberId).subscribe({
            next: (data) => {
                this.dietPlan = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('No diet plan found or error', err);
                this.isLoading = false;
            }
        });
    }
}
