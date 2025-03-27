import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-doctors',
  standalone: false,
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent implements OnInit {
  formdata: any;
  result: any;
  formSubmited: boolean = false;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("",Validators.compose([Validators.required, this.noWhitespaceValidator])),
      dtype: new FormControl("Referral",Validators.compose([Validators.required])),
      email: new FormControl(""),
      mobileno: new FormControl(""),
      address: new FormControl(""),
      qualification: new FormControl(""),
      medicalRegNo: new FormControl(""),
      bankname: new FormControl(""),
      accountno: new FormControl(""),
      ifsccode: new FormControl("")
    });
    this.formdata.get('name')?.reset();
    this.formdata.get('dtype')?.reset();
    this.formSubmited = false;
    this.api.get("api/Doctors").subscribe((result: any) => {
      // console.log(result);
      this.result = result;
    })
  }

  // Custom validator to ensure no leading/trailing spaces
  noWhitespaceValidator(control: any) {
    if (control.value && control.value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }

  save(data: any) {
    if (this.formdata.invalid) {
      this.formSubmited = true;
      // Handle invalid form submission
      return;
    }
    else{

    if (data.id == 0) {
      this.api.post("api/Doctors", data).subscribe((result: any) => {
        this.api.showSuccess("Record added successfully.");
        this.bind();
      });
    } else {
      this.api.put("api/Doctors/" + data.id, data).subscribe((result: any) => {
        this.api.showSuccess("Record updated successfully.");
        this.bind();
      });
    }
    }
  }

  delete(id: number) {
    Notiflix.Confirm.show(
      'Please Confirm',
      'Are you sure you want to delete?',
      'Yes',
      'No',
      () => {
        this.api.delete("api/Doctors/" + id).subscribe((result: any) => {
          this.api.showSuccess("Record deleted successfully");
          this.bind();
        });
      },
      () => {
        //Cancel Operation
      }
    );
  }

  edit(id: number) {
    this.api.get("api/Doctors/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        dtype: result.dtype,
        email: result.email,
        mobileno: result.mobileno,
        address: result.address,
        qualification: result.qualification,
        medicalRegNo: result.medicalRegNo,
        bankname: result.bankname,
        accountno: result.accountno,
        ifsccode: result.ifsccode
      });
    })
  }
}
