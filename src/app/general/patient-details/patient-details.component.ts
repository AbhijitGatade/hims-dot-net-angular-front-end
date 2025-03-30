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
    this.api.get("api/titles").subscribe((result: any) => {
      this.titles = result;
    });
    this.api.get("api/companies").subscribe((result: any) => {
      this.companies = result;
    });
    this.api.get("api/towns").subscribe((result: any) => {
      this.towns = result;
    });
    this.api.get("api/patients/patientid/" + this.patientId).subscribe((result: any) => {
      this.patient = {
        id: result.id,
        prefix: result.prefix,
        name: result.name,
        uidno: result.uidno,
        Birthdate: result.birthdate,
        age: result.age,
        gender: result.gender,
        BloodGroup: result.bloodGroup,
        MobileNo: result.mobileNo,
        AltMobileNo: result.altMobileNo,
        MaritalStatus: result.maritalStatus,
        occupation: result.occupation,
        AadhaarNo: result.aadhaarNo,
        address: result.address,
        townid: result.townid,
        createdby: result.createdby,
        updatedby: result.updatedby,
        createdon: result.createdon,
        updatedon: result.updatedon
      };
    });
  }

}




