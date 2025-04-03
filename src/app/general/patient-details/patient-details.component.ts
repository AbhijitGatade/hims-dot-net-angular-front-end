import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  standalone: false,
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent implements OnInit {
  patients: any;
  patient: any = {};
  towns: any;
  titles: any;
  companies: any;
  genders = ["Male", "Female", "Other"];
  bloodgroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  maritalstatuses = ["Married", "Unmarried", "Other"];
  patientId: any;
  formSubmited: boolean = false;
  isReadonly = true;

  constructor(private api: ApiService, private datePipe: DatePipe, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('patientid');
    console.log(this.patientId)
    this.bind();
  }
  bind() {
    this.api.get("api/patients/patientid/" + this.patientId).subscribe((result: any) => {
     
      this.patient = {
        id: result.id,
        name: result.p.prefix+" "+ result.p.name,
        uidno: result.p.uidno,
        Birthdate: result.p.birthdate, 
        age: result.p.age,
        gender: result.p.gender,
        BloodGroup: result.p.bloodGroup,
        MobileNo: result.p.mobileNo,
        AltMobileNo: result.p.altMobileNo,
        MaritalStatus: result.p.maritalStatus,
        occupation: result.p.occupation,
        AadhaarNo: result.p.aadhaarNo,
        address: result.p.address,
        townid: result.townName,
        createdby: result.p.createdby,
        updatedby: result.p.updatedby,
        createdon: result.p.createdon,
        updatedon: result.p.updatedon
      };

    });
  }

}




