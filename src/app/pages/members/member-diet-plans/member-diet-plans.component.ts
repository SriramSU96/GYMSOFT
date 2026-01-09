import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MemberDietAssignment } from '../../../core/models/member-diet-assignment.model';
import { MemberDietAssignmentService } from '../../../core/services/member-diet-assignment.service';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

@Component({
    selector: 'app-member-diet-plans',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './member-diet-plans.component.html',
    styleUrls: ['./member-diet-plans.component.css']
})
export class MemberDietPlansComponent implements OnInit {
    private assignmentService = inject(MemberDietAssignmentService);
    private toastService = inject(ToastService);
    private confirmDialog = inject(ConfirmDialogService);
    private router = inject(Router);

    // All assignments from API
    allAssignments: MemberDietAssignment[] = [];
    filteredAssignments: MemberDietAssignment[] = [];

    // Loading state
    loading: boolean = false;

    // Filter options
    searchTerm: string = '';
    statusFilter: string = 'all';

    ngOnInit() {
        this.loadAssignments();
    }

    // Load assignments from API
    loadAssignments() {
        this.loading = true;
        console.log('Loading diet plan assignments...');

        this.assignmentService.getAllAssignments().subscribe({
            next: (assignments) => {
                console.log('Received assignments:', assignments);
                this.allAssignments = assignments;
                this.filteredAssignments = [...assignments];
                this.loading = false;

                if (assignments.length === 0) {
                    console.warn('No diet plan assignments found. Make sure diet plans have memberId field set.');
                }
            },
            error: (error) => {
                console.error('Error loading assignments:', error);
                this.toastService.error('Failed to load diet plan assignments');
                this.loading = false;
                this.allAssignments = [];
                this.filteredAssignments = [];
            }
        });
    }

    // Apply search and filter
    applyFilters() {
        this.filteredAssignments = this.allAssignments.filter(assignment => {
            const member = assignment.member;
            const matchesSearch =
                member?.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                member?.phone?.includes(this.searchTerm) ||
                assignment.dietPlan?.title?.toLowerCase().includes(this.searchTerm.toLowerCase());

            const matchesStatus =
                this.statusFilter === 'all' ||
                assignment.status.toLowerCase() === this.statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }

    // Action handlers
    viewPlan(assignmentId: string) {
        const assignment = this.allAssignments.find(a => a._id === assignmentId);
        if (assignment?.dietPlanId) {
            this.router.navigate(['/diets/builder', assignment.dietPlanId]);
        }
    }

    changePlan(assignmentId: string) {
        const assignment = this.allAssignments.find(a => a._id === assignmentId);
        if (assignment?.memberId) {
            this.router.navigate(['/plans/assign'], {
                queryParams: {
                    memberId: assignment.memberId,
                    type: 'diet'
                }
            });
        }
    }

    deleteAssignment(assignmentId: string) {
        const assignment = this.allAssignments.find(a => a._id === assignmentId);
        const memberName = assignment?.member?.name || 'this member';

        this.confirmDialog.confirm({
            title: 'Remove Diet Plan',
            message: `Are you sure you want to remove the diet plan assignment for ${memberName}?`,
            confirmText: 'Remove',
            cancelText: 'Cancel'
        }).subscribe(confirmed => {
            if (confirmed) {
                this.assignmentService.deleteAssignment(assignmentId).subscribe({
                    next: () => {
                        this.toastService.success('Diet plan assignment removed successfully');
                        this.loadAssignments();
                    },
                    error: (error) => {
                        console.error('Error deleting assignment:', error);
                        this.toastService.error('Failed to remove assignment');
                    }
                });
            }
        });
    }

    assignDietPlan() {
        this.router.navigate(['/plans/assign'], { queryParams: { type: 'diet' } });
    }

    // Get status badge class
    getStatusClass(status: string): string {
        switch (status) {
            case 'Active': return 'status-active';
            case 'Expired': return 'status-expired';
            case 'Upcoming': return 'status-upcoming';
            default: return 'status-default';
        }
    }

    // Calculate days remaining
    getDaysRemaining(endDate: Date | undefined): number {
        if (!endDate) return 0;
        const end = new Date(endDate);
        const today = new Date();
        const diff = end.getTime() - today.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
}
