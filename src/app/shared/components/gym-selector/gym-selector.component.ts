import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-gym-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './gym-selector.component.html',
    styleUrls: ['./gym-selector.component.css']
})
export class GymSelectorComponent {
    gyms = [
        { id: 1, name: 'Main Branch', location: 'Downtown' },
        { id: 2, name: 'North Wing', location: 'Uptown' }
    ];

    selectedGym = this.gyms[0];
    isDropdownOpen = false;

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    selectGym(gym: any) {
        this.selectedGym = gym;
        this.isDropdownOpen = false;
        // Here we would reload app state/data
        alert(`Switched to ${gym.name}`);
    }

    createGym() {
        const name = prompt('Enter new Gym Name:');
        if (name) {
            this.gyms.push({ id: this.gyms.length + 1, name, location: 'New Location' });
            alert('New Gym Created!');
        }
    }
}
