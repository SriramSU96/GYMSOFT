import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Gym, GymBranch } from '../../../core/models/gym.model';
// import * as GymActions from '../../../core/store/gyms/gym.actions';
// import { selectAllGyms, selectSelectedGym } from '../../../core/store/gyms/gym.selectors';
import { GymBranchAddComponent } from '../gym-branch-add/gym-branch-add.component';

@Component({
    selector: 'app-gym-selector',
    standalone: true,
    imports: [CommonModule, GymBranchAddComponent],
    templateUrl: './gym-selector.component.html',
    styleUrls: ['./gym-selector.component.css']
})
export class GymSelectorComponent implements OnInit {
    private store = inject(Store);

    // Placeholder for multi-gym selector
    gyms$: Observable<Gym[]> = of([]); // this.store.select(selectAllGyms);
    selectedGym$: Observable<Gym | GymBranch | null> = of(null); // this.store.select(selectSelectedGym);
    isDropdownOpen = false;
    isAddBranchOpen = false;

    ngOnInit() {
        // this.store.dispatch(GymActions.loadGyms());
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    selectGym(gym: Gym | GymBranch) {
        // this.store.dispatch(GymActions.selectGym({ gym }));
        this.isDropdownOpen = false;
    }

    createGym() {
        this.isAddBranchOpen = true;
        this.isDropdownOpen = false;
    }

    closeAddBranch() {
        this.isAddBranchOpen = false;
    }
}
