import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: false,
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {

  doctorid = 0;
  opddate = new Date();
  consultingdoctors: any;
  result: any;
  isVisible = false;
  patient:any;

  constructor(private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.api.get("api/doctors").subscribe((result: any) => {
      this.consultingdoctors = result.filter((doctor: any) => {
        if (doctor.dtype == "Practice") {
          return doctor;
        }
      });
    });
    this.api.get("api/patients/opd").subscribe((result: any) => {
      this.result = result;
    });
  }

  openOverlay(patient:any) {
    this.patient = patient;
    this.isVisible = true;
  }

  closeOverlay() {
    this.isVisible = false;
  }

  gotoPage(path:string){
    if(path == "patient-details"){
      this.router.navigate(['/general/patient-details/' + this.patient.patientid]);
    }
    else if(path == "edit-patient"){
      this.router.navigate(['/general/edit-patient/' + this.patient.patientid]);
    }
    else if(path == "edit-ipd"){
      this.router.navigate(['/ipd/edit/' + this.patient.ipdid]);
    }
  }
}