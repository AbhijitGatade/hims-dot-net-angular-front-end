import { Component } from '@angular/core';

@Component({
  selector: 'app-patients',
  standalone: false,
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {
  isPopupVisible: boolean = false;

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
}
