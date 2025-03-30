import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-patient',
  standalone: false,
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.scss'
})
export class EditPatientComponent implements OnInit {
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

    this.patient = {

    }

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

  save() {
    let formValidated = true;

    if (this.patient.prefix == '' || this.patient.name == '' || this.patient.gender == ''
      || this.patient.age == '' || this.patient.address == '' || this.patient.townid == 0 || this.patient.MobileNo == '') {
      formValidated = false;
    }

    if (formValidated) {
      let data = {
        id: this.patientId,
        prefix: this.patient.prefix,
        name: this.patient.name,
        Birthdate:this.patient.Birthdate,
        uidno: this.patient.uidno,
        age: this.patient.age,
        gender: this.patient.gender,
        BloodGroup: this.patient.BloodGroup,
        MobileNo: this.patient.MobileNo,
        AltMobileNo: this.patient.AltMobileNo,
        MaritalStatus: this.patient.MaritalStatus,
        occupation: this.patient.occupation,
        AadhaarNo: this.patient.AadhaarNo,
        address: this.patient.address,
        townid: this.patient.townid,
        createdby: this.patient.createdby,
        updatedby: this.patient.updatedby,
        createdon: this.patient.createdon,
        updatedon: this.patient.updatedon
      };
    
      this.api.put("api/Patients/" + data.id, data).subscribe(
        (result: any) => {
          this.api.showSuccess("Record updated successfully.");
        });
      }
      else{
        this.api.showError("Please check the form and fill all the required fields.");
      }
    
  }

  onBirthdateChange() {
    const dob = this.patient.Birthdate;
    if (dob) {
      const birthdate = new Date(dob);
      const currentDate = new Date();
      const years = currentDate.getFullYear() - birthdate.getFullYear();
      this.patient.age = Math.abs(years) + " Yrs";
    }
  }

}



