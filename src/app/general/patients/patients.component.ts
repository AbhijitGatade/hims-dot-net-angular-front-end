<<<<<<< HEAD
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
=======
>>>>>>> ac10a791469e9c9a5bac23822ee3c4e12be8b1d0
