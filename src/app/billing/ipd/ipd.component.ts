import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ipd',
  standalone: false,
  templateUrl: './ipd.component.html'
})
export class IpdComponent implements OnInit {
  loading = true;
  result: any;
  isVisible = false;
  patient:any;

  constructor(private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.loading = true;
    this.api.get("api/patients/ipd").subscribe((result: any) => {
      this.result = result;
      this.loading = false;
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

