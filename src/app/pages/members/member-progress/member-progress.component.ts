import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgressRecord, MemberProgressSummary } from '../../../core/models/progress.model';
import { ProgressService } from '../../../core/services/progress.service';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { AddProgressDialogComponent } from '../../../shared/dialogs/add-progress-dialog/add-progress-dialog.component';
import { AuthService } from '../../../core/services/auth.service';
import { MemberService } from '../../../core/services/member.service';
import { Member } from '../../../core/models/member.model';

@Component({
    selector: 'app-member-progress',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, AddProgressDialogComponent],
    templateUrl: './member-progress.component.html',
    styleUrls: ['./member-progress.component.css']
})
export class MemberProgressComponent implements OnInit {
    @ViewChild(AddProgressDialogComponent) addProgressDialog!: AddProgressDialogComponent;

    private progressService = inject(ProgressService);
    private toastService = inject(ToastService);
    private confirmDialog = inject(ConfirmDialogService);
    private router = inject(Router);
    private authService = inject(AuthService);
    private memberService = inject(MemberService);

    // Data from API
    selectedMember: MemberProgressSummary | null = null;
    progressRecords: ProgressRecord[] = [];
    filteredRecords: ProgressRecord[] = [];

    // Members list for dropdown
    members: Member[] = [];
    selectedMemberId: string = '';
    currentGymId: string = '';

    // Loading states
    loading: boolean = false;
    loadingSummary: boolean = false;
    loadingMembers: boolean = false;

    // Filters
    searchTerm: string = '';
    timeFilter: string = 'last30';

    ngOnInit() {
        // Get current gym ID from auth service
        const currentUser = this.authService.getCurrentUser();
        if (currentUser?.gymId) {
            this.currentGymId = currentUser.gymId;
        }

        // Load members list for dropdown
        this.loadMembers();

        // Load progress if member is selected
        if (this.selectedMemberId) {
            this.loadProgress();
        }
    }

    // Load members list
    loadMembers() {
        this.loadingMembers = true;
        this.memberService.getMembers().subscribe({
            next: (members) => {
                this.members = members;
                this.loadingMembers = false;

                // Auto-select first member if available
                if (members.length > 0 && !this.selectedMemberId) {
                    this.selectedMemberId = members[0]._id || '';
                    this.onMemberChange();
                }
            },
            error: (error) => {
                console.error('Error loading members:', error);
                this.loadingMembers = false;
            }
        });
    }

    // Handle member selection change
    onMemberChange() {
        if (this.selectedMemberId) {
            this.loadProgress();
        }
    }

    // Load progress data from API
    loadProgress() {
        if (!this.selectedMemberId) {
            console.warn('No member selected');
            return;
        }

        this.loading = true;
        console.log('Loading progress for member:', this.selectedMemberId);

        this.progressService.getMemberProgress(this.selectedMemberId).subscribe({
            next: (records) => {
                console.log('Received progress records:', records);
                this.progressRecords = records;
                this.applyFilters();
                this.loading = false;

                // Load member summary
                this.loadMemberSummary(this.selectedMemberId);
            },
            error: (error) => {
                console.error('Error loading progress:', error);
                this.toastService.error('Failed to load progress records');
                this.loading = false;
                this.progressRecords = [];
                this.filteredRecords = [];
            }
        });
    }

    // Load member progress summary
    loadMemberSummary(memberId: string) {
        this.loadingSummary = true;

        this.progressService.getMemberProgressSummary(memberId).subscribe({
            next: (summary) => {
                console.log('Received member summary:', summary);
                this.selectedMember = summary;
                this.loadingSummary = false;
            },
            error: (error) => {
                console.error('Error loading member summary:', error);
                this.loadingSummary = false;

                // Create a basic summary from available data
                this.createBasicSummary(memberId);
            }
        });
    }

    // Create basic summary from progress records
    createBasicSummary(memberId: string) {
        const memberRecords = this.progressRecords.filter(r => r.memberId === memberId);

        if (memberRecords.length > 0) {
            // Sort records by date to get latest and oldest
            memberRecords.sort((a, b) => new Date(b.recordedDate).getTime() - new Date(a.recordedDate).getTime());
            const latest = memberRecords[0];
            const oldest = memberRecords[memberRecords.length - 1];

            this.selectedMember = {
                memberId: memberId,
                memberName: 'Member', // Will be populated from backend
                phone: '',
                age: 0,
                fitnessGoal: 'Fitness',
                currentWeight: latest.weight,
                currentBMI: latest.bmi,
                progressStatus: this.calculateProgressStatus(latest.weight, oldest.weight),
                totalRecords: memberRecords.length,
                weightChange: latest.weight - oldest.weight,
                bmiChange: latest.bmi - oldest.bmi
            };
        }
    }

    // Calculate progress status based on weight change
    calculateProgressStatus(currentWeight: number, startWeight: number): 'Improving' | 'Stable' | 'Needs Attention' {
        const change = currentWeight - startWeight;

        if (change < -2) return 'Improving'; // Lost more than 2kg
        if (change > 2) return 'Needs Attention'; // Gained more than 2kg
        return 'Stable';
    }

    // Load mock data as fallback
    loadMockData() {
        console.warn('Loading mock data as fallback');

        this.selectedMember = {
            memberId: '1',
            memberName: 'John Doe',
            phone: '+91 9876543210',
            age: 28,
            fitnessGoal: 'Weight Loss',
            currentWeight: 75.5,
            currentBMI: 24.2,
            progressStatus: 'Improving',
            totalRecords: 3,
            weightChange: -5.5,
            bmiChange: -1.8
        };

        this.progressRecords = [
            {
                _id: '1',
                memberId: '1',
                weight: 75.5,
                bmi: 24.2,
                bodyFat: 18.5,
                notes: 'Great progress this month!',
                recordedBy: 'Trainer Mike',
                recordedDate: new Date('2024-01-15'),
                gymId: 'gym1'
            },
            {
                _id: '2',
                memberId: '1',
                weight: 77.0,
                bmi: 24.8,
                bodyFat: 19.2,
                notes: 'Steady improvement',
                recordedBy: 'Trainer Sarah',
                recordedDate: new Date('2024-01-01'),
                gymId: 'gym1'
            },
            {
                _id: '3',
                memberId: '1',
                weight: 78.5,
                bmi: 25.3,
                bodyFat: 20.1,
                notes: 'Starting point',
                recordedBy: 'Admin',
                recordedDate: new Date('2023-12-15'),
                gymId: 'gym1'
            }
        ];

        this.applyFilters();
    }

    // Apply filters
    applyFilters() {
        let filtered = [...this.progressRecords];

        // Apply time filter
        const now = new Date();
        switch (this.timeFilter) {
            case 'last30':
                const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
                filtered = filtered.filter(r => new Date(r.recordedDate) >= thirtyDaysAgo);
                break;
            case 'last90':
                const ninetyDaysAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
                filtered = filtered.filter(r => new Date(r.recordedDate) >= ninetyDaysAgo);
                break;
            case 'last180':
                const oneEightyDaysAgo = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000));
                filtered = filtered.filter(r => new Date(r.recordedDate) >= oneEightyDaysAgo);
                break;
            // 'all' - no filter
        }

        this.filteredRecords = filtered;
    }

    // Action handlers
    addProgress() {
        if (!this.selectedMemberId) {
            this.toastService.error('Please select a member first');
            return;
        }

        if (!this.currentGymId) {
            this.toastService.error('Gym ID not found. Please log in again.');
            return;
        }

        // Get selected member name
        const selectedMember = this.members.find(m => m._id === this.selectedMemberId);
        const memberName = selectedMember?.name || 'Unknown Member';

        console.log('Opening add progress dialog for member:', this.selectedMemberId);

        this.addProgressDialog.open(this.selectedMemberId, memberName, this.currentGymId, () => {
            // Callback to refresh data after adding progress
            this.loadProgress();
        });
    }

    editProgress(recordId: string) {
        console.log('Edit progress:', recordId);
        // TODO: Open edit modal or navigate to edit form
        this.router.navigate(['/progress/edit', recordId]);
    }

    deleteProgress(recordId: string) {
        const record = this.progressRecords.find(r => r._id === recordId);

        this.confirmDialog.confirm({
            title: 'Delete Progress Record',
            message: `Are you sure you want to delete this progress record from ${new Date(record?.recordedDate || '').toLocaleDateString()}?`,
            confirmText: 'Delete',
            cancelText: 'Cancel'
        }).subscribe(confirmed => {
            if (confirmed) {
                this.progressService.deleteProgress(recordId).subscribe({
                    next: () => {
                        this.toastService.success('Progress record deleted successfully');
                        this.loadProgress();
                    },
                    error: (error) => {
                        console.error('Error deleting progress:', error);
                        this.toastService.error('Failed to delete progress record');
                    }
                });
            }
        });
    }

    // Get status badge class
    getStatusClass(status: string): string {
        switch (status) {
            case 'Improving': return 'status-improving';
            case 'Stable': return 'status-stable';
            case 'Needs Attention': return 'status-warning';
            default: return 'status-default';
        }
    }
}
