import { Component } from '@angular/core';

@Component({
  selector: 'app-patients',
  standalone: false,
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {
   
  dayCareBeds = [{ DRYCARE : '1', UIDNO:'UID01654',IPDNO:'51438',NAME:'Mrs. Malubai Ananda Koli xyz abc',CONDR:'Dr.Shivani Kulkarni',DOA: '22/02/2025'}, { name: 'DC2' },{ name: 'DC1' }, { name: 'DC2' }];
  femaleWardBeds = [{ name: 'GWF1' }, { name: 'GWF2' },{ name: 'GWF1' }, { name: 'GWF2' }];
  maleWardBeds = [{ name: 'GWM1' }, { name: 'GWM2' },{ name: 'GWM1' }, { name: 'GWM2' }];
  icuBeds = [{ name: 'ICU1', occupied: true }, { name: 'ICU2', occupied: false }];
  specialRoomBeds = [{ name: 'SR1', occupied: true }, { name: 'SR2', occupied: false }];
  

  selectedBed: any = null;

  showBedDetails(bed: any) {
    if (bed.occupied) {
      this.selectedBed = bed;
    }
  }

  closeBedDetails() {
    this.selectedBed = null;
  }
}



