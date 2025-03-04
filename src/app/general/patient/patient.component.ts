import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-patient',
  standalone: false,
  templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit {

  isNewPatientVisible = true;  // Initially show New Patient form
  isExistingPatientVisible = false;  // Initially hide Existing Patient form
  newPatientButtonClass = 'btn btn-sm btn-primary'; // New Patient button starts with btn-primary
  existingPatientButtonClass = 'btn btn-sm text-primary btn-outline-primary'; // Existing Patient button starts with btn-outline-dark
  opdPatientVisible = true;  // Initially show New Patient form
  ipdPatientVisible = false;
  OPDPatientButtonClass = 'btn btn-sm btn-primary';
  IPDPatientButtonClass = 'btn btn-sm text-primary btn-outline-primary';

  birthdate: any;
  age: { years: number, months: number, days: number } | null = null;
  formdata: any;
  invalidDate: any = "";
  todayDate: any;
  patientsresult: any;
  doctorsresult:any;
  opdformdata:any;
  ipdformdata:any
  roomsresult:any;
  bedsresult:any;
  roomid:any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bindpatient();
  }

  selectRoom(){
      //  this.roomid;
      //  console.log("room"+this.roomid)
  }
  bindpatient() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(""),
      uidno: new FormControl(""),
      prefix: new FormControl(""),
      birthdate: new FormControl(""),
      gender: new FormControl(""),
      age: new FormControl(10),
      bloodGroup: new FormControl(""),
      maritalStatus: new FormControl(""), 
      mobileNo: new FormControl(""),
      altMobileNo: new FormControl(""),
      occupation: new FormControl(""),
      aadhaarNo: new FormControl(""),
      createdby: new FormControl(1)

    });
    this.api.get("api/Patients").subscribe((result: any) => {
      //  console.log(result);
      this.patientsresult = result;
    });
   
    this.api.get("api/Doctors").subscribe((result: any) => {
      //  console.log(result);
       this.doctorsresult=result;
    });

    this.api.get("api/Rooms").subscribe((result: any) => {
      console.log(result);
      this.roomsresult=result;
   });

   this.api.get("api/Rooms/beds/"+this.roomid).subscribe((result: any) => {
    // console.log(result);
    this.bedsresult=result;
 });

   
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];  // Extract the date portion
  }

  bindopd(){
    this.opdformdata=new FormGroup({
      id: new FormControl(0),
      patientid: new FormControl(""),
      opddate: new FormControl(""),
      opdtime: new FormControl(""),
      height: new FormControl(""),  
      weight: new FormControl(""),
      doctorid: new FormControl(""),
      remark: new FormControl(""),
      createdby: new FormControl(""),
      updatedby: new FormControl("xyz"),
      createdon: new FormControl(""),
      updatedon: new FormControl("2001-01-01T01:01")
    })
  }

  bindipd(){
    this.ipdformdata=new FormGroup({
      id: new FormControl(0),
      patientid: new FormControl(""),
      admissiondate: new FormControl(""),
      admissiontime: new FormControl(""),
      doctorid: new FormControl(""),
      status: new FormControl(""),
      roomid: new FormControl(""),
      bedid: new FormControl(""),

      // dischargedate: new FormControl(""),
      // dischargetime: new FormControl(""),
      // dischargedas: new FormControl(""),
      // totalamount: new FormControl(""),
      // discountamount: new FormControl(""),
      // billamount: new FormControl(""),
      // paidamount: new FormControl(""),
      // concessionbyid: new FormControl(""),
    })
  }

  savePatient(data: any) {
    // console.log(data);
    this.api.post("api/Patients", data).subscribe(
      response => console.log('Success', response),
      (error: HttpErrorResponse) => {
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        console.log('Error details:', error.error);  // Check for specific error details
      }
    );
    this.bindpatient();

  }
  saveOPD(data:any)
  {
     console.log(data);
    // this.api.post("api/Doctors", data).subscribe(
    //   response => console.log('Success', response),
    //   (error: HttpErrorResponse) => {
    //     console.log('Error status:', error.status);
    //     console.log('Error message:', error.message);
    //     console.log('Error details:', error.error);  // Check for specific error details
    //   }
    // );
  }

  saveIPD(data:any)
  {
    console.log(data);

  }

  showNewPatient() {
    this.isNewPatientVisible = true;

    this.isExistingPatientVisible = false;

    this.newPatientButtonClass = 'btn btn-sm btn-primary';
    this.existingPatientButtonClass = 'btn btn-sm text-primary btn-outline-primary';
  }

  showExistingPatient() {
    this.isNewPatientVisible = false;
    this.isExistingPatientVisible = true;
    this.newPatientButtonClass = 'btn btn-sm text-primary btn-outline-primary';
    this.existingPatientButtonClass = 'btn btn-sm btn-primary';
  }

  opdPatient() {
    this.opdPatientVisible = true;
    this.ipdPatientVisible = false;
    this.OPDPatientButtonClass = 'btn btn-sm btn-primary';
    this.IPDPatientButtonClass = 'btn btn-sm text-primary btn-outline-primary';

  }

  ipdPatient() {
    this.opdPatientVisible = false;
    this.ipdPatientVisible = true;
    this.OPDPatientButtonClass = 'btn btn-sm text-primary btn-outline-primary';
    this.IPDPatientButtonClass = 'btn btn-sm btn-primary';

  }


  calculateAge() {


    const birthDateObj = new Date(this.birthdate); // Convert the string to Date object
    const today = new Date();

    let ageYears = today.getFullYear() - birthDateObj.getFullYear();
    let ageMonths = today.getMonth() - birthDateObj.getMonth();
    let ageDays = today.getDate() - birthDateObj.getDate();

    // Adjust if the month or day is negative
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears--;
      ageMonths += 12;
    }

    if (ageDays < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
      ageDays += lastMonth.getDate();
    }

    this.age = { years: ageYears, months: ageMonths, days: ageDays };
    // console.log(this.age);
  }


}

