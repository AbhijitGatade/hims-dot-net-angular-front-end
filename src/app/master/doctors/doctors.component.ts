import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-doctors',
  standalone: false,
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent implements OnInit {
  formdata: any;
  result: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(""),
      dtype: new FormControl(""),
      email: new FormControl(""),
      mobileno: new FormControl(""),
      address: new FormControl(""),
      qualification: new FormControl(""),
      medicalRegNo: new FormControl(""),
      bankname: new FormControl(""),
      accountno: new FormControl(""),
      ifsccode: new FormControl("")
    });
    this.api.get("api/Doctors").subscribe((result: any) => {
      // console.log(result);
      this.result = result;
    })
  }

  save(data: any) {
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
