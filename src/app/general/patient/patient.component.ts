import { Component, DoCheck, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  standalone: false,
  templateUrl: './patient.component.html',
  // providers: [DatePipe]
})
export class PatientComponent implements OnInit {

  titles: any;
  towns: any;
  genders = ["Male", "Female", "Other"];
  bloodgroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  maritalstatuses = ["Married", "Unmarried", "Other"];
  consultingdoctors: any;
  doctors: any;
  companies:any;
  rooms: any;
  beds: any = [];
  patients: any;

  uidExists: boolean = false;
  formSubmited: boolean = false;
  isNewPatientVisible = true;
  isExistingPatientVisible = false;
  newPatientButtonClass = 'btn btn-sm btn-primary';
  existingPatientButtonClass = 'btn btn-sm btn-outline-primary';
  opdPatientVisible = true;
  ipdPatientVisible = false;
  opdPatientButtonClass = 'btn btn-sm btn-danger';
  ipdPatientButtonClass = 'btn btn-sm btn-outline-danger';

  patient: any;
  patientid = 0;
  ipd:any;
  opd:any;

  constructor(private api: ApiService, private datePipe: DatePipe, private router:Router) { }


  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.api.get("api/patients").subscribe((result: any) => {
      this.patients = result;
    });
    this.api.get("api/titles").subscribe((result: any) => {
      this.titles = result;
    });
    this.api.get("api/companies").subscribe((result: any) => {
      this.companies = result;
    });
    this.api.get("api/towns").subscribe((result: any) => {
      this.towns = result;
    });
    this.api.get("api/doctors").subscribe((result: any) => {
      this.doctors = result;
      this.consultingdoctors = result.filter((doctor: any) => {
        if (doctor.dtype == "Practice") {
          return doctor;
        }
      });
    });
    this.api.get("api/rooms").subscribe((result: any) => {
      this.rooms = result;
    });

    this.patient = {
      id: 0,
      rdate:new Date(),
      prefix: '',
      name: '',
      uidno: '123',
      birthdate: '',
      age: '',
      gender: '',
      blood_group: '',
      mobile_no: '',
      alt_mobile_no: '',
      marital_status: '',
      occupation: '',
      aadhaar_no: '',
      address: '',
      townid: '',
      createdby: 0,
      updatedby: 0,
      createdon: "",
      updatedon: ""
    }
    this.ipd = {
      id: 0,
      patientid: 0,
      admissiondate:new Date(),
      admissiontime:'',
      doctorid: 0,
      refdoctorid:0,
      roomid: 0,
      bedid: 0,
      companyid:0,
      remark:'',
      status: 'active'
    }
    this.opd = {
      id: 0,
      patientid: 0,
      opddate:new Date(),
      opdtime: '',
      height: '',
      weight: '',
      doctorid: 0,
      refdoctorid:0,
      companyid:0,
      createdby: 0
    }
  }

  onRoomChange(event: Event): void {
    const selectedRoomId = (event.target as HTMLSelectElement).value;
    this.api.get("api/Rooms/beds/" + selectedRoomId).subscribe((result: any) => {
      this.beds = result;
    });
  }

  onSelectPatient(event: Event): void {

  }


  noWhitespaceValidator(control: any) {
    if (control.value && control.value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }

  save() {
  
    let formValidated = true;
    if (this.isNewPatientVisible) {
      if(this.patient.prefix == '' || this.patient.name == '' || this.patient.gender == '' 
        || this.patient.age == '' || this.patient.address == '' || this.patient.townid == 0 || this.patient.mobile_no == '') {  
        formValidated = false;
      }
    }
    else {
      if(this.patientid == 0){
        formValidated = false;
      }
    }
    if(this.opdPatientVisible){
      if(this.opd.opddate == '' || this.opd.opdtime == '' || this.opd.doctorid == 0 || this.opd.refdoctorid == 0){  
        formValidated = false;
      }
    }else{
      if(this.ipd.admissiondate == '' || this.ipd.admissiontime == '' || this.ipd.doctorid == 0 || this.ipd.refdoctorid == 0 || this.ipd.roomid == 0 || this.ipd.bedid == 0){
        formValidated = false;
      }
    }
    if(formValidated){
      let data = {
        patientid: this.patientid,
        patient: {...this.patient, birthdate: (this.patient.birthdate == "" ? "" : this.datePipe.transform(this.patient.birthdate, 'dd MMM yyyy'))},  
        ptype:this.opdPatientVisible ? "opd": "ipd",
        opd: {...this.opd, opddate: this.datePipe.transform(this.opd.opddate, 'dd MMM yyyy')},
        ipd: {...this.ipd, admissiondate:this.datePipe.transform(this.ipd.admissiondate, 'dd MMM yyyy')}
      };
      this.api.post("api/patients", data).subscribe((result: any) => {
        if(data.ptype == "opd"){
          this.router.navigate(['/billing/opd/' + result.id]);
        }else{
          this.router.navigate(['/billing/ipd/' + result.id]);
        }
    });
    }else{
      this.api.showError("Please check the form and fill all the required fields.");
    }
  }

  patientTypeChanged(clicktype: string, type: string) {
    if (clicktype == 'patient') {
      this.isNewPatientVisible = type == "new";
      this.isExistingPatientVisible = !this.isNewPatientVisible;
      this.newPatientButtonClass = this.isNewPatientVisible ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary';
      this.existingPatientButtonClass = this.isExistingPatientVisible ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary';
    }
    else {
      this.opdPatientVisible = type == "opd";
      this.ipdPatientVisible = !this.opdPatientVisible;
      this.opdPatientButtonClass = this.opdPatientVisible ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-outline-danger';
      this.ipdPatientButtonClass = this.ipdPatientVisible ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-outline-danger';
    }
  }

  onBirthdateChange() {
    const dob = this.patient.birthdate;
    if (dob) {
      const birthdate = new Date(dob);
      const currentDate = new Date();
      const years = currentDate.getFullYear() - birthdate.getFullYear();
      this.patient.age = Math.abs(years) + " Yrs";
    }
  }
}