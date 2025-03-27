import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: false,
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {
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
      this.loading = false;
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
    if(path == "discharge-summary"){
      this.router.navigate(['/dicharge/summary/' + this.patient.ipdid]);
    }
    else if(path == "print-discharge-summary"){
      this.router.navigate(['/dicharge/print-summary/' + this.patient.ipdid]);
    }
    else if(path == "discharge-patient"){
      this.router.navigate(['/ipd/edit/' + this.patient.ipdid]);
    }
  }
}

